import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { dataStore } from './src/services/store';
import { syncLiveScoresFromProvider, getApiConnectionStatus } from './src/services/sportsApi';
import { NewsArticle, Team, Player, Match } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Start background live score updater service & API synchronization
  setInterval(async () => {
    dataStore.tickLiveMatches();
    try {
      const apiResult = await syncLiveScoresFromProvider();
      if (apiResult.success && apiResult.matches.length > 0) {
        dataStore.syncExternalMatches(apiResult.matches, getApiConnectionStatus().demoMode);
      }
    } catch (err) {
      // Graceful error isolation
    }
  }, 10000);

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // SEO Config & Sitemap info
  app.get('/api/seo', (_req, res) => {
    res.json(dataStore.getSEOConfig());
  });

  // Matches API
  app.get('/api/matches', (req, res) => {
    let matches = dataStore.getMatches();
    const { sport, status, tournament } = req.query;

    if (sport && typeof sport === 'string') {
      matches = matches.filter(m => m.sport === sport.toLowerCase());
    }
    if (status && typeof status === 'string') {
      matches = matches.filter(m => m.status === status.toLowerCase());
    }
    if (tournament && typeof tournament === 'string') {
      matches = matches.filter(m => m.tournamentId === tournament);
    }

    res.json(matches);
  });

  app.get('/api/matches/:id', (req, res) => {
    const match = dataStore.getMatchById(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  });

  // News API
  app.get('/api/news', (req, res) => {
    let news = dataStore.getNews();
    const { sport, category, tag, isBreaking, q } = req.query;

    if (sport && typeof sport === 'string') {
      news = news.filter(n => n.sport === sport.toLowerCase());
    }
    if (category && typeof category === 'string') {
      news = news.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }
    if (tag && typeof tag === 'string') {
      news = news.filter(n => n.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    if (isBreaking === 'true') {
      news = news.filter(n => n.isBreaking);
    }
    if (q && typeof q === 'string') {
      const query = q.toLowerCase();
      news = news.filter(n => n.title.toLowerCase().includes(query) || n.excerpt.toLowerCase().includes(query));
    }

    res.json(news);
  });

  app.get('/api/news/breaking', (_req, res) => {
    res.json(dataStore.getBreakingNews());
  });

  app.get('/api/news/:slug', (req, res) => {
    const article = dataStore.getNewsBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    // Increment view count
    article.viewsCount += 1;
    res.json(article);
  });

  // Teams API
  app.get('/api/teams', (req, res) => {
    let teams = dataStore.getTeams();
    const { sport } = req.query;
    if (sport && typeof sport === 'string') {
      teams = teams.filter(t => t.sport === sport.toLowerCase());
    }
    res.json(teams);
  });

  app.get('/api/teams/:id', (req, res) => {
    const team = dataStore.getTeamByIdOrSlug(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  });

  // Players API
  app.get('/api/players', (req, res) => {
    let players = dataStore.getPlayers();
    const { sport, teamId } = req.query;
    if (sport && typeof sport === 'string') {
      players = players.filter(p => p.sport === sport.toLowerCase());
    }
    if (teamId && typeof teamId === 'string') {
      players = players.filter(p => p.teamId === teamId);
    }
    res.json(players);
  });

  app.get('/api/players/:id', (req, res) => {
    const player = dataStore.getPlayerByIdOrSlug(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  });

  // Tournaments API
  app.get('/api/tournaments', (req, res) => {
    let tournaments = dataStore.getTournaments();
    const { sport } = req.query;
    if (sport && typeof sport === 'string') {
      tournaments = tournaments.filter(t => t.sport === sport.toLowerCase());
    }
    res.json(tournaments);
  });

  app.get('/api/tournaments/:id', (req, res) => {
    const tournament = dataStore.getTournamentByIdOrSlug(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    res.json(tournament);
  });

  // Prediction System API (Strictly free virtual points)
  app.get('/api/predictions/leaderboard', (_req, res) => {
    res.json({
      leaderboard: dataStore.getLeaderboard(),
      userPoints: dataStore.getUserPoints()
    });
  });

  app.get('/api/predictions/history', (_req, res) => {
    res.json({
      history: dataStore.getUserPredictions(),
      userPoints: dataStore.getUserPoints()
    });
  });

  app.post('/api/predictions/vote', (req, res) => {
    const { matchId, choice } = req.body;
    if (!matchId || !choice || !['home', 'away', 'draw'].includes(choice)) {
      return res.status(400).json({ error: 'Invalid prediction arguments' });
    }
    try {
      const result = dataStore.addPrediction(matchId, choice);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to submit prediction' });
    }
  });

  // Global Search API
  app.get('/api/search', (req, res) => {
    const query = (req.query.q as string || '').trim().toLowerCase();
    if (!query) {
      return res.json([]);
    }

    const results: any[] = [];

    // Search News
    dataStore.getNews().forEach(n => {
      if (n.title.toLowerCase().includes(query) || n.excerpt.toLowerCase().includes(query)) {
        results.push({
          type: 'news',
          id: n.id,
          title: n.title,
          subtitle: `${n.category} • ${n.publishedAt.slice(0, 10)}`,
          url: `/news/${n.slug}`,
          image: n.featuredImage,
          badge: n.sport.toUpperCase()
        });
      }
    });

    // Search Matches
    dataStore.getMatches().forEach(m => {
      const matchTitle = `${m.homeTeam.name} vs ${m.awayTeam.name}`;
      if (
        matchTitle.toLowerCase().includes(query) ||
        m.tournament.toLowerCase().includes(query) ||
        m.venue.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'match',
          id: m.id,
          title: matchTitle,
          subtitle: `${m.tournament} • ${m.statusText}`,
          url: `/${m.sport}/match/${m.slug}`,
          image: m.homeTeam.logo,
          badge: m.status.toUpperCase()
        });
      }
    });

    // Search Teams
    dataStore.getTeams().forEach(t => {
      if (t.name.toLowerCase().includes(query) || t.shortName.toLowerCase().includes(query) || t.country.toLowerCase().includes(query)) {
        results.push({
          type: 'team',
          id: t.id,
          title: t.name,
          subtitle: `${t.country} • ${t.sport.toUpperCase()}`,
          url: `/teams/${t.slug}`,
          image: t.logo,
          badge: 'TEAM'
        });
      }
    });

    // Search Players
    dataStore.getPlayers().forEach(p => {
      if (p.name.toLowerCase().includes(query) || p.position.toLowerCase().includes(query) || p.teamName.toLowerCase().includes(query)) {
        results.push({
          type: 'player',
          id: p.id,
          title: p.name,
          subtitle: `${p.position} - ${p.teamName}`,
          url: `/players/${p.slug}`,
          image: p.photo,
          badge: 'PLAYER'
        });
      }
    });

    // Search Tournaments
    dataStore.getTournaments().forEach(t => {
      if (t.name.toLowerCase().includes(query) || t.season.toLowerCase().includes(query)) {
        results.push({
          type: 'tournament',
          id: t.id,
          title: t.name,
          subtitle: `${t.season} • ${t.sport.toUpperCase()}`,
          url: `/tournaments/${t.slug}`,
          image: t.logo,
          badge: 'TOURNAMENT'
        });
      }
    });

    res.json(results.slice(0, 20));
  });

  // Ads API
  app.get('/api/ads', (_req, res) => {
    res.json(dataStore.getAds());
  });

  // Newsletter API
  app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address required' });
    }
    res.json({ message: 'Successfully subscribed to SportPulse daily digest!' });
  });

  // Admin Endpoints
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      res.json({
        token: 'sportpulse-admin-jwt-token-2026',
        user: { name: 'Super Admin', role: 'administrator' }
      });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials. Use admin / admin123' });
    }
  });

  app.post('/api/admin/news', (req, res) => {
    const article: NewsArticle = {
      ...req.body,
      id: req.body.id || `news-${Date.now()}`,
      publishedAt: req.body.publishedAt || new Date().toISOString(),
      viewsCount: req.body.viewsCount || 0
    };
    dataStore.addOrUpdateNews(article);
    res.json(article);
  });

  app.delete('/api/admin/news/:id', (req, res) => {
    const success = dataStore.deleteNews(req.params.id);
    res.json({ success });
  });

  app.get('/api/admin/api-status', (_req, res) => {
    res.json(getApiConnectionStatus());
  });

  app.post('/api/admin/matches/override', (req, res) => {
    const { matchId, status, statusText, startTime, venue, homeTeam, awayTeam, minute } = req.body;
    if (!matchId) {
      return res.status(400).json({ error: 'matchId is required for score override' });
    }
    try {
      const updated = dataStore.overrideMatch(matchId, {
        status,
        statusText,
        startTime,
        venue,
        homeTeam,
        awayTeam,
        minute
      });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to override match score' });
    }
  });

  app.post('/api/admin/matches/remove-override', (req, res) => {
    const { matchId } = req.body;
    if (!matchId) {
      return res.status(400).json({ error: 'matchId is required to remove override' });
    }
    try {
      const updated = dataStore.removeMatchOverride(matchId);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to remove override' });
    }
  });

  app.post('/api/admin/matches/refresh', async (_req, res) => {
    try {
      const result = await syncLiveScoresFromProvider();
      if (result.success && result.matches.length > 0) {
        dataStore.syncExternalMatches(result.matches, getApiConnectionStatus().demoMode);
      }
      res.json({
        status: getApiConnectionStatus(),
        syncResult: result
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'API sync failed' });
    }
  });

  app.post('/api/admin/matches', (req, res) => {
    const match: Match = {
      ...req.body,
      id: req.body.id || `match-${Date.now()}`
    };
    dataStore.updateMatch(match);
    res.json(match);
  });

  app.post('/api/admin/breaking-news', (req, res) => {
    const { items } = req.body;
    if (Array.isArray(items)) {
      dataStore.updateBreakingNews(items);
    }
    res.json(dataStore.getBreakingNews());
  });

  app.post('/api/admin/teams', (req, res) => {
    const team: Team = {
      ...req.body,
      id: req.body.id || `team-${Date.now()}`
    };
    dataStore.addOrUpdateTeam(team);
    res.json(team);
  });

  app.post('/api/admin/players', (req, res) => {
    const player: Player = {
      ...req.body,
      id: req.body.id || `player-${Date.now()}`
    };
    dataStore.addOrUpdatePlayer(player);
    res.json(player);
  });

  app.post('/api/admin/seo', (req, res) => {
    const updated = dataStore.updateSEOConfig(req.body);
    res.json(updated);
  });

  // Vite development middleware or static production setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SportPulse Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
