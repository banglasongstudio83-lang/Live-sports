/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  SportType,
  SearchResult
} from './types';
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { LiveScoreBar } from './components/LiveScoreBar';
import { LiveScoreCard } from './components/LiveScoreCard';
import { CricketScorecardView } from './components/CricketScorecardView';
import { FootballMatchView } from './components/FootballMatchView';
import { NewsCard } from './components/NewsCard';
import { NewsDetailView } from './components/NewsDetailView';
import { LeaderboardTable } from './components/LeaderboardTable';
import { TeamDetailView } from './components/TeamDetailView';
import { PlayerDetailView } from './components/PlayerDetailView';
import { TournamentHubView } from './components/TournamentHubView';
import { RankingsView } from './components/RankingsView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdBanner } from './components/AdBanner';
import { Footer } from './components/Footer';
import { Trophy, Award, Flame, ChevronRight, Activity, Radio, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [activeSport, setActiveSport] = useState<SportType | 'all'>('all');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Active item detail selections
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  // Data states
  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);
  const [userPoints, setUserPoints] = useState(120);
  const [ads, setAds] = useState<AdPlacement[]>([]);

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Fetch data
  const fetchData = async () => {
    try {
      const [matchesRes, newsRes, breakingRes, teamsRes, playersRes, tourRes, leadRes, predRes, adsRes] = await Promise.all([
        fetch('/api/matches').then(r => r.json()),
        fetch('/api/news').then(r => r.json()),
        fetch('/api/news/breaking').then(r => r.json()),
        fetch('/api/teams').then(r => r.json()),
        fetch('/api/players').then(r => r.json()),
        fetch('/api/tournaments').then(r => r.json()),
        fetch('/api/predictions/leaderboard').then(r => r.json()),
        fetch('/api/predictions/history').then(r => r.json()),
        fetch('/api/ads').then(r => r.json())
      ]);

      setMatches(matchesRes);
      setNews(newsRes);
      setBreakingNews(breakingRes);
      setTeams(teamsRes);
      setPlayers(playersRes);
      setTournaments(tourRes);
      setLeaderboard(leadRes.leaderboard || []);
      setUserPredictions(predRes.history || []);
      setUserPoints(leadRes.userPoints || 120);
      setAds(adsRes || []);
    } catch (err) {
      console.error('Failed to load sports data', err);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll live data every 8s
    const timer = setInterval(fetchData, 8000);
    return () => clearInterval(timer);
  }, []);

  // Sync dark class on html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle predictions voting
  const handleVotePrediction = async (matchId: string, choice: 'home' | 'away' | 'draw') => {
    try {
      const res = await fetch('/api/predictions/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, choice })
      });
      const data = await res.json();
      if (res.ok) {
        setUserPoints(data.userPoints);
        fetchData();
        alert('Prediction saved! You will receive +10 virtual points if correct.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    setSelectedMatch(null);
    setSelectedNews(null);
    setSelectedTeam(null);
    setSelectedPlayer(null);
    setSelectedTournament(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSearchResult = (res: SearchResult) => {
    if (res.type === 'match') {
      const m = matches.find(item => item.id === res.id);
      if (m) setSelectedMatch(m);
    } else if (res.type === 'news') {
      const n = news.find(item => item.id === res.id);
      if (n) setSelectedNews(n);
    } else if (res.type === 'team') {
      const t = teams.find(item => item.id === res.id);
      if (t) setSelectedTeam(t);
    } else if (res.type === 'player') {
      const p = players.find(item => item.id === res.id);
      if (p) setSelectedPlayer(p);
    } else if (res.type === 'tournament') {
      const tr = tournaments.find(item => item.id === res.id);
      if (tr) setSelectedTournament(tr);
    }
  };

  const todayCricketMatches = matches.filter(m => m.sport === 'cricket');
  const todayFootballMatches = matches.filter(m => m.sport === 'football');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const cricketNews = news.filter(n => n.sport === 'cricket');
  const footballNews = news.filter(n => n.sport === 'football');
  const featuredNews = news[0];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans`}>
      {/* 1. Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        activeSport={activeSport}
        onSelectSport={setActiveSport}
        userPoints={userPoints}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* 2. Breaking News Ticker */}
      <BreakingNewsTicker items={breakingNews} />

      {/* Top Banner Ad Placement */}
      {ads[0] && <AdBanner placement={ads[0]} />}

      {/* RENDER ACTIVE DETAILED VIEWS FIRST IF SELECTED */}
      {selectedMatch ? (
        selectedMatch.sport === 'cricket' ? (
          <CricketScorecardView
            match={selectedMatch}
            onBack={() => setSelectedMatch(null)}
            userPoints={userPoints}
            onVotePrediction={handleVotePrediction}
            userPredictions={userPredictions}
          />
        ) : (
          <FootballMatchView
            match={selectedMatch}
            onBack={() => setSelectedMatch(null)}
            userPoints={userPoints}
            onVotePrediction={handleVotePrediction}
            userPredictions={userPredictions}
          />
        )
      ) : selectedNews ? (
        <NewsDetailView
          article={selectedNews}
          relatedArticles={news.filter(n => n.id !== selectedNews.id)}
          onBack={() => setSelectedNews(null)}
          onSelectArticle={setSelectedNews}
        />
      ) : selectedTeam ? (
        <TeamDetailView
          team={selectedTeam}
          squad={players.filter(p => p.teamId === selectedTeam.id)}
          recentMatches={matches.filter(m => m.homeTeam.id === selectedTeam.id || m.awayTeam.id === selectedTeam.id)}
          relatedNews={news.filter(n => n.relatedTeamId === selectedTeam.id)}
          onBack={() => setSelectedTeam(null)}
          onSelectPlayer={setSelectedPlayer}
          onSelectMatch={setSelectedMatch}
          onSelectNews={setSelectedNews}
        />
      ) : selectedPlayer ? (
        <PlayerDetailView
          player={selectedPlayer}
          relatedNews={news.filter(n => n.tags.some(t => t.toLowerCase().includes(selectedPlayer.name.toLowerCase())))}
          onBack={() => setSelectedPlayer(null)}
          onSelectNews={setSelectedNews}
        />
      ) : selectedTournament ? (
        <TournamentHubView
          tournament={selectedTournament}
          matches={matches.filter(m => m.tournamentId === selectedTournament.id)}
          news={news}
          onBack={() => setSelectedTournament(null)}
          onSelectMatch={setSelectedMatch}
          onSelectNews={setSelectedNews}
        />
      ) : (
        /* RENDER HOMEPAGE OR SPECIFIC NAVIGATION TABS */
        <main className="pb-12">
          {/* 3. Live Matches Bar */}
          <LiveScoreBar
            matches={matches}
            onSelectMatch={setSelectedMatch}
            activeSportFilter={activeSport}
          />

          {currentTab === 'home' && (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
              {/* Featured Main Story Hero */}
              {featuredNews && (
                <NewsCard article={featuredNews} onSelectArticle={setSelectedNews} variant="featured" />
              )}

              {/* 4. Today's Cricket Matches */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-mono">
                      Today's Cricket Matches
                    </h2>
                  </div>
                  <button onClick={() => handleSelectTab('cricket')} className="text-xs font-bold text-emerald-500 hover:underline">
                    View All Cricket →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todayCricketMatches.map(m => (
                    <LiveScoreCard key={m.id} match={m} onSelectMatch={setSelectedMatch} />
                  ))}
                </div>
              </section>

              {/* 5. Today's Football Matches */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-mono">
                      Today's Football Matches
                    </h2>
                  </div>
                  <button onClick={() => handleSelectTab('football')} className="text-xs font-bold text-emerald-500 hover:underline">
                    View All Football →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todayFootballMatches.map(m => (
                    <LiveScoreCard key={m.id} match={m} onSelectMatch={setSelectedMatch} />
                  ))}
                </div>
              </section>

              {/* 7 & 8 & 9. Latest Sports, Cricket & Football News Grid */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-mono">
                    Latest Sports Headlines
                  </h2>
                  <button onClick={() => handleSelectTab('news')} className="text-xs font-bold text-emerald-500 hover:underline">
                    View All News →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {news.slice(1, 4).map(art => (
                    <NewsCard key={art.id} article={art} onSelectArticle={setSelectedNews} />
                  ))}
                </div>
              </section>

              {/* 10 & 11. Match Predictions & Leaderboard Preview */}
              <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>Free Virtual Predictions</span>
                    </span>
                    <h2 className="text-2xl font-black mt-1">Predict & Rank Up</h2>
                  </div>
                  <button
                    onClick={() => handleSelectTab('predictions')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all w-fit"
                  >
                    View Full Leaderboard
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.slice(0, 2).map(m => (
                    <div key={m.id} className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{m.tournament}</span>
                        <span className="text-amber-400 font-bold">+10 Free Pts</span>
                      </div>
                      <h4 className="font-bold text-sm">{m.homeTeam.name} vs {m.awayTeam.name}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVotePrediction(m.id, 'home')}
                          className="flex-1 py-2 bg-slate-900 hover:bg-emerald-600 rounded-xl text-xs font-bold border border-slate-700 transition-all"
                        >
                          {m.homeTeam.shortName}
                        </button>
                        <button
                          onClick={() => handleVotePrediction(m.id, 'away')}
                          className="flex-1 py-2 bg-slate-900 hover:bg-emerald-600 rounded-xl text-xs font-bold border border-slate-700 transition-all"
                        >
                          {m.awayTeam.shortName}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 12 & 13. Popular Teams & Players */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Popular Teams</h3>
                  <div className="space-y-2">
                    {teams.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTeam(t)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={t.logo} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</span>
                        </div>
                        <span className="text-xs font-mono uppercase text-emerald-500 font-bold">{t.sport}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Popular Players</h3>
                  <div className="space-y-2">
                    {players.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlayer(p)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={p.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-sm text-slate-900 dark:text-white block">{p.name}</span>
                            <span className="text-xs text-slate-400">{p.teamName}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono uppercase text-slate-400">{p.position}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* SPECIFIC NAVIGATION PAGES */}
          {currentTab === 'live-scores' && (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase font-mono">All Live & Today's Matches</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map(m => (
                  <LiveScoreCard key={m.id} match={m} onSelectMatch={setSelectedMatch} />
                ))}
              </div>
            </div>
          )}

          {currentTab === 'predictions' && (
            <LeaderboardTable
              leaderboard={leaderboard}
              userPredictions={userPredictions}
              userPoints={userPoints}
            />
          )}

          {currentTab === 'news' && (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase font-mono">Sports News & Analysis</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(art => (
                  <NewsCard key={art.id} article={art} onSelectArticle={setSelectedNews} />
                ))}
              </div>
            </div>
          )}

          {currentTab === 'teams' && (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase font-mono">Featured Teams</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTeam(t)}
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 cursor-pointer transition-all flex items-center space-x-4 shadow-sm"
                  >
                    <img src={t.logo} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">{t.sport}</span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{t.name}</h3>
                      <p className="text-xs text-slate-400">{t.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'players' && (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase font-mono">Featured Athletes</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {players.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlayer(p)}
                    className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 cursor-pointer transition-all text-center space-y-3 shadow-sm"
                  >
                    <img src={p.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-emerald-500" />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{p.name}</h3>
                      <p className="text-xs text-slate-400">{p.teamName} • {p.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'tournaments' && (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase font-mono">Competitions & Tournaments</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tournaments.map(tr => (
                  <div
                    key={tr.id}
                    onClick={() => setSelectedTournament(tr)}
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 cursor-pointer transition-all flex items-center space-x-4 shadow-sm"
                  >
                    <img src={tr.logo} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">{tr.season}</span>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{tr.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{tr.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'rankings' && <RankingsView />}
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateResult={handleNavigateSearchResult}
      />

      {/* Admin Panel Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        matches={matches}
        news={news}
        breakingNews={breakingNews}
        teams={teams}
        players={players}
        ads={ads}
        seoConfig={{ siteName: 'SportPulse', defaultTitle: 'SportPulse', defaultDescription: '', keywords: [], twitterHandle: '', canonicalBase: '' }}
        onRefreshData={fetchData}
      />
    </div>
  );
}
