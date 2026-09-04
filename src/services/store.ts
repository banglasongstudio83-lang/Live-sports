import {
  Match,
  NewsArticle,
  BreakingNews,
  Team,
  Player,
  Tournament,
  LeaderboardUser,
  UserPrediction,
  AdPlacement,
  SEOConfig
} from '../types';
import {
  INITIAL_MATCHES,
  INITIAL_NEWS,
  INITIAL_BREAKING_NEWS,
  INITIAL_TEAMS,
  INITIAL_PLAYERS,
  INITIAL_TOURNAMENTS,
  INITIAL_LEADERBOARD,
  INITIAL_ADS,
  INITIAL_SEO_CONFIG
} from '../data/mockData';

class DataStore {
  private matches: Match[] = [...INITIAL_MATCHES];
  private news: NewsArticle[] = [...INITIAL_NEWS];
  private breakingNews: BreakingNews[] = [...INITIAL_BREAKING_NEWS];
  private teams: Team[] = [...INITIAL_TEAMS];
  private players: Player[] = [...INITIAL_PLAYERS];
  private tournaments: Tournament[] = [...INITIAL_TOURNAMENTS];
  private leaderboard: LeaderboardUser[] = [...INITIAL_LEADERBOARD];
  private userPredictions: UserPrediction[] = [];
  private ads: AdPlacement[] = [...INITIAL_ADS];
  private seoConfig: SEOConfig = { ...INITIAL_SEO_CONFIG };
  private userPoints = 120; // Default virtual points for session user

  // Matches
  getMatches(): Match[] {
    return this.matches;
  }

  getMatchById(id: string): Match | undefined {
    return this.matches.find(m => m.id === id || m.slug === id || m.providerEventId === id);
  }

  updateMatch(updatedMatch: Match): Match {
    const idx = this.matches.findIndex(m => m.id === updatedMatch.id || (m.provider && m.providerEventId && m.provider === updatedMatch.provider && m.providerEventId === updatedMatch.providerEventId));
    updatedMatch.lastUpdated = new Date().toISOString();
    if (idx !== -1) {
      this.matches[idx] = { ...this.matches[idx], ...updatedMatch };
    } else {
      this.matches.unshift(updatedMatch);
    }
    return updatedMatch;
  }

  overrideMatch(matchId: string, overrideData: Partial<Match>): Match {
    const match = this.getMatchById(matchId);
    if (!match) throw new Error(`Match with ID '${matchId}' not found`);

    match.manualOverride = true;
    match.lastUpdated = new Date().toISOString();

    if (overrideData.status) match.status = overrideData.status;
    if (overrideData.statusText !== undefined) match.statusText = overrideData.statusText;
    if (overrideData.startTime) match.startTime = overrideData.startTime;
    if (overrideData.venue) match.venue = overrideData.venue;

    if (overrideData.homeTeam) {
      match.homeTeam = {
        ...match.homeTeam,
        ...overrideData.homeTeam
      };
    }

    if (overrideData.awayTeam) {
      match.awayTeam = {
        ...match.awayTeam,
        ...overrideData.awayTeam
      };
    }

    if (overrideData.minute !== undefined) match.minute = overrideData.minute;

    return match;
  }

  removeMatchOverride(matchId: string): Match {
    const match = this.getMatchById(matchId);
    if (!match) throw new Error(`Match with ID '${matchId}' not found`);

    match.manualOverride = false;
    match.lastUpdated = new Date().toISOString();
    return match;
  }

  syncExternalMatches(incoming: Match[], demoMode: boolean): void {
    if (incoming.length === 0) return;

    if (!demoMode) {
      // Retain only non-demo or active overridden matches
      this.matches = this.matches.filter(m => !m.isDemo || m.manualOverride);
    }

    incoming.forEach(ext => {
      const idx = this.matches.findIndex(
        m => (m.provider && m.providerEventId && m.provider === ext.provider && m.providerEventId === ext.providerEventId) || m.id === ext.id
      );

      if (idx !== -1) {
        // If manually overridden, preserve scores and status
        if (this.matches[idx].manualOverride) {
          this.matches[idx].tournament = ext.tournament;
          this.matches[idx].venue = ext.venue;
          this.matches[idx].startTime = ext.startTime;
        } else {
          this.matches[idx] = {
            ...ext,
            id: this.matches[idx].id // maintain internal id
          };
        }
      } else {
        this.matches.unshift(ext);
      }
    });
  }

  deleteMatch(id: string): boolean {
    const initLen = this.matches.length;
    this.matches = this.matches.filter(m => m.id !== id && m.providerEventId !== id);
    return this.matches.length < initLen;
  }

  // News
  getNews(): NewsArticle[] {
    return this.news;
  }

  getNewsBySlug(slug: string): NewsArticle | undefined {
    return this.news.find(n => n.slug === slug || n.id === slug);
  }

  addOrUpdateNews(article: NewsArticle): NewsArticle {
    const idx = this.news.findIndex(n => n.id === article.id);
    if (idx !== -1) {
      this.news[idx] = article;
    } else {
      this.news.unshift(article);
    }
    return article;
  }

  deleteNews(id: string): boolean {
    const initLen = this.news.length;
    this.news = this.news.filter(n => n.id !== id);
    return this.news.length < initLen;
  }

  // Breaking News
  getBreakingNews(): BreakingNews[] {
    return this.breakingNews;
  }

  updateBreakingNews(items: BreakingNews[]): BreakingNews[] {
    this.breakingNews = items;
    return this.breakingNews;
  }

  // Teams
  getTeams(): Team[] {
    return this.teams;
  }

  getTeamByIdOrSlug(idOrSlug: string): Team | undefined {
    return this.teams.find(t => t.id === idOrSlug || t.slug === idOrSlug);
  }

  addOrUpdateTeam(team: Team): Team {
    const idx = this.teams.findIndex(t => t.id === team.id);
    if (idx !== -1) {
      this.teams[idx] = team;
    } else {
      this.teams.push(team);
    }
    return team;
  }

  // Players
  getPlayers(): Player[] {
    return this.players;
  }

  getPlayerByIdOrSlug(idOrSlug: string): Player | undefined {
    return this.players.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  }

  addOrUpdatePlayer(player: Player): Player {
    const idx = this.players.findIndex(p => p.id === player.id);
    if (idx !== -1) {
      this.players[idx] = player;
    } else {
      this.players.push(player);
    }
    return player;
  }

  // Tournaments
  getTournaments(): Tournament[] {
    return this.tournaments;
  }

  getTournamentByIdOrSlug(idOrSlug: string): Tournament | undefined {
    return this.tournaments.find(t => t.id === idOrSlug || t.slug === idOrSlug);
  }

  // Predictions
  getUserPredictions(): UserPrediction[] {
    return this.userPredictions;
  }

  getUserPoints(): number {
    return this.userPoints;
  }

  addPrediction(matchId: string, choice: 'home' | 'away' | 'draw'): { prediction: UserPrediction; userPoints: number } {
    const match = this.getMatchById(matchId);
    if (!match) throw new Error('Match not found');

    const winnerName =
      choice === 'home'
        ? match.homeTeam.name
        : choice === 'away'
        ? match.awayTeam.name
        : 'Draw';

    // Check if already predicted
    const existingIdx = this.userPredictions.findIndex(p => p.matchId === matchId);
    const newPred: UserPrediction = {
      id: `pred-${Date.now()}`,
      matchId,
      matchTitle: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      predictedChoice: choice,
      predictedWinnerName: winnerName,
      predictedAt: new Date().toISOString(),
      status: 'pending',
      pointsAwarded: 0
    };

    if (existingIdx !== -1) {
      this.userPredictions[existingIdx] = newPred;
    } else {
      this.userPredictions.unshift(newPred);
    }

    return { prediction: newPred, userPoints: this.userPoints };
  }

  getLeaderboard(): LeaderboardUser[] {
    return this.leaderboard;
  }

  // Ads
  getAds(): AdPlacement[] {
    return this.ads;
  }

  updateAds(ads: AdPlacement[]): AdPlacement[] {
    this.ads = ads;
    return this.ads;
  }

  // SEO
  getSEOConfig(): SEOConfig {
    return this.seoConfig;
  }

  updateSEOConfig(cfg: SEOConfig): SEOConfig {
    this.seoConfig = cfg;
    return this.seoConfig;
  }

  // Live Score Tick Incrementer (Service loop for realistic live scores)
  tickLiveMatches() {
    this.matches.forEach(match => {
      if (match.status !== 'live' || match.manualOverride) return;

      if (match.sport === 'cricket' && match.cricketData) {
        // Increment cricket score periodically
        const inn = match.cricketData.innings[match.cricketData.innings.length - 1];
        if (inn && inn.overs < inn.maxOvers) {
          const runOutcomes = [0, 1, 1, 2, 4, 6, 1];
          const addedRuns = runOutcomes[Math.floor(Math.random() * runOutcomes.length)];
          const isWicket = Math.random() < 0.05 && inn.wickets < 9;

          inn.runs += addedRuns;
          if (isWicket) inn.wickets += 1;
          
          // Add 0.1 over
          let oversFloat = Math.round((inn.overs + 0.1) * 10) / 10;
          if (oversFloat % 1 >= 0.6) {
            oversFloat = Math.floor(oversFloat) + 1.0;
          }
          inn.overs = oversFloat;

          match.homeTeam.score = `${inn.runs}/${inn.wickets} (${inn.overs} ov)`;
          match.homeTeam.runs = inn.runs;
          match.homeTeam.wickets = inn.wickets;
          match.homeTeam.overs = inn.overs;

          if (match.targetRuns) {
            const needed = match.targetRuns - inn.runs;
            if (needed <= 0) {
              match.statusText = `${match.homeTeam.name} won by ${10 - inn.wickets} wickets!`;
              match.status = 'completed';
            } else {
              const oversLeft = Math.max(0.1, Math.round((inn.maxOvers - inn.overs) * 10) / 10);
              const ballsLeft = Math.floor(oversLeft) * 6 + Math.round((oversLeft % 1) * 10);
              match.statusText = `${match.homeTeam.name} need ${needed} runs in ${ballsLeft} balls`;
            }
          }

          // Append commentary
          const lastBallText = isWicket
            ? `WICKET! Dismissal on over ${inn.overs}. Great delivery!`
            : addedRuns === 6
            ? `SIX! Smashed out of the park!`
            : addedRuns === 4
            ? `FOUR! Driven magnificently past the fielder.`
            : `${addedRuns} run(s) taken cleanly.`;

          match.cricketData.commentary.unshift({
            id: `comm-${Date.now()}`,
            over: `${inn.overs}`,
            ball: Math.round((inn.overs % 1) * 10) || 6,
            runs: addedRuns,
            isWicket,
            isFour: addedRuns === 4,
            isSix: addedRuns === 6,
            text: lastBallText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });

          if (match.cricketData.commentary.length > 30) {
            match.cricketData.commentary.pop();
          }
        }
      } else if (match.sport === 'football' && match.footballData) {
        // Increment football match minute
        if (match.minute !== undefined && match.minute < 90) {
          match.minute += 1;
          if (Math.random() < 0.04) {
            // Goal event
            const side = Math.random() > 0.5 ? 'home' : 'away';
            const currentScore = parseInt(side === 'home' ? match.homeTeam.score || '0' : match.awayTeam.score || '0');
            const newScore = currentScore + 1;
            if (side === 'home') match.homeTeam.score = `${newScore}`;
            else match.awayTeam.score = `${newScore}`;

            match.footballData.events.unshift({
              id: `fe-${Date.now()}`,
              minute: match.minute,
              team: side,
              type: 'goal',
              player: side === 'home' ? 'Bukayo Saka' : 'Erling Haaland',
              detail: 'Clinical finish into the top right corner!'
            });

            match.statusText = `${match.minute}' - GOAL! (${match.homeTeam.shortName} ${match.homeTeam.score} - ${match.awayTeam.score} ${match.awayTeam.shortName})`;
          } else {
            match.statusText = `${match.minute}' - Live (${match.homeTeam.shortName} ${match.homeTeam.score || 0} - ${match.awayTeam.score || 0} ${match.awayTeam.shortName})`;
          }
        } else if (match.minute && match.minute >= 90) {
          match.status = 'completed';
          match.statusText = `Full Time (${match.homeTeam.shortName} ${match.homeTeam.score} - ${match.awayTeam.score} ${match.awayTeam.shortName})`;
        }
      }
    });
  }
}

export const dataStore = new DataStore();
