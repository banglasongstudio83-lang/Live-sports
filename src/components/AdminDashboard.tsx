import React, { useState, useEffect } from 'react';
import {
  Match,
  NewsArticle,
  BreakingNews,
  Team,
  Player,
  AdPlacement,
  SEOConfig,
  SportType,
  MatchStatus
} from '../types';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Newspaper,
  Activity,
  Users,
  Award,
  Globe,
  Radio,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  news: NewsArticle[];
  breakingNews: BreakingNews[];
  teams: Team[];
  players: Player[];
  ads: AdPlacement[];
  seoConfig: SEOConfig;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  matches,
  news,
  breakingNews,
  teams,
  players,
  ads,
  seoConfig,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'matches' | 'breaking' | 'teams' | 'ads' | 'seo'>('matches');

  // Match Controller State
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState<SportType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');

  // Score Override Form State
  const [overrideStatus, setOverrideStatus] = useState<MatchStatus>('live');
  const [overrideStatusText, setOverrideStatusText] = useState('');
  const [overrideHomeScore, setOverrideHomeScore] = useState('');
  const [overrideAwayScore, setOverrideAwayScore] = useState('');
  const [overrideVenue, setOverrideVenue] = useState('');
  const [overrideStartTime, setOverrideStartTime] = useState('');
  const [overrideMinute, setOverrideMinute] = useState<number>(0);

  // API Status State
  const [apiStatus, setApiStatus] = useState<{
    isConnected: boolean;
    provider: string;
    demoMode: boolean;
    lastSyncTime: string | null;
    message: string;
    totalMatchesFetched: number;
  } | null>(null);
  const [isRefreshingApi, setIsRefreshingApi] = useState(false);

  // News Form State
  const [newsForm, setNewsForm] = useState<Partial<NewsArticle>>({
    title: '',
    seoTitle: '',
    metaDescription: '',
    excerpt: '',
    content: '',
    category: 'Cricket',
    sport: 'cricket',
    featuredImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cricket', 'World Cup']
  });

  const fetchApiStatus = async () => {
    try {
      const res = await fetch('/api/admin/api-status');
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
      }
    } catch (err) {
      console.error('Failed to fetch API status', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchApiStatus();
    }
  }, [isOpen]);

  const selectedMatch = matches.find(m => m.id === selectedMatchId || m.providerEventId === selectedMatchId);

  // Populate form fields when a match is selected
  useEffect(() => {
    if (selectedMatch) {
      setOverrideStatus(selectedMatch.status);
      setOverrideStatusText(selectedMatch.statusText || '');
      setOverrideHomeScore(selectedMatch.homeTeam.score || '');
      setOverrideAwayScore(selectedMatch.awayTeam.score || '');
      setOverrideVenue(selectedMatch.venue || '');
      setOverrideStartTime(selectedMatch.startTime || '');
      setOverrideMinute(selectedMatch.minute || 0);
    }
  }, [selectedMatchId, selectedMatch]);

  if (!isOpen) return null;

  const handleTriggerApiRefresh = async () => {
    setIsRefreshingApi(true);
    try {
      const res = await fetch('/api/admin/matches/refresh', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data.status);
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to trigger API refresh', err);
    } finally {
      setIsRefreshingApi(false);
    }
  };

  const handleApplyOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    try {
      const res = await fetch('/api/admin/matches/override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: selectedMatch.id,
          status: overrideStatus,
          statusText: overrideStatusText,
          startTime: overrideStartTime,
          venue: overrideVenue,
          minute: overrideMinute,
          homeTeam: { score: overrideHomeScore },
          awayTeam: { score: overrideAwayScore }
        })
      });

      if (res.ok) {
        onRefreshData();
        alert(`Match '${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}' manually overridden!`);
      } else {
        const err = await res.json();
        alert(`Failed to override match: ${err.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`Error applying override: ${err.message}`);
    }
  };

  const handleRemoveOverride = async () => {
    if (!selectedMatch) return;
    try {
      const res = await fetch('/api/admin/matches/remove-override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId: selectedMatch.id })
      });

      if (res.ok) {
        onRefreshData();
        alert(`Override removed for '${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}'. Match is now synced with API/Live feed.`);
      } else {
        const err = await res.json();
        alert(`Failed to remove override: ${err.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`Error removing override: ${err.message}`);
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const article: NewsArticle = {
      id: newsForm.id || `news-${Date.now()}`,
      slug: newsForm.slug || (newsForm.title || 'news-article').toLowerCase().replace(/\s+/g, '-'),
      title: newsForm.title || 'Untitled',
      seoTitle: newsForm.seoTitle || newsForm.title || '',
      metaDescription: newsForm.metaDescription || newsForm.excerpt || '',
      keywords: ['sports', 'news'],
      excerpt: newsForm.excerpt || '',
      content: newsForm.content || '',
      featuredImage: newsForm.featuredImage || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Sports news image',
      author: {
        name: 'SportPulse Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        role: 'Chief Editor'
      },
      publishedAt: new Date().toISOString(),
      category: newsForm.category as any || 'Cricket',
      tags: typeof newsForm.tags === 'string' ? (newsForm.tags as string).split(',') : newsForm.tags || [],
      sport: newsForm.sport as any || 'cricket',
      viewsCount: 100
    };

    await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });

    onRefreshData();
    alert('News article created/updated!');
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    onRefreshData();
  };

  // Filter matches for selection list
  const filteredMatches = matches.filter(m => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      m.id.toLowerCase().includes(query) ||
      (m.providerEventId && m.providerEventId.toLowerCase().includes(query)) ||
      m.homeTeam.name.toLowerCase().includes(query) ||
      m.awayTeam.name.toLowerCase().includes(query) ||
      m.tournament.toLowerCase().includes(query);

    const matchesSport = filterSport === 'all' || m.sport === filterSport;
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;

    return matchesQuery && matchesSport && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-black font-mono tracking-tight">SportPulse Admin Panel</h2>
              <p className="text-xs text-slate-400">Content Management & Live Score Match Controller</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'matches', label: 'Match Controller', icon: Activity },
            { id: 'news', label: 'Manage News', icon: Newspaper },
            { id: 'breaking', label: 'Breaking Ticker', icon: Radio },
            { id: 'teams', label: 'Teams & Players', icon: Users },
            { id: 'ads', label: 'Advertisements', icon: Award },
            { id: 'seo', label: 'SEO Settings', icon: Globe }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3.5 font-bold text-xs border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50 dark:bg-slate-950">
          {/* TAB: Match Controller */}
          {activeTab === 'matches' && (
            <div className="space-y-6">
              {/* API Connection Widget */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${apiStatus?.isConnected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">API Feed Status:</span>
                      <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700">
                        {apiStatus?.provider || 'thesportsdb'}
                      </span>
                      {apiStatus?.demoMode && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Demo Mode Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {apiStatus?.message || 'Syncing live scores securely via backend proxy'} • Last Refreshed:{' '}
                      {apiStatus?.lastSyncTime ? new Date(apiStatus.lastSyncTime).toLocaleTimeString() : 'Just now'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleTriggerApiRefresh}
                  disabled={isRefreshingApi}
                  className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingApi ? 'animate-spin text-emerald-400' : ''}`} />
                  <span>{isRefreshingApi ? 'Syncing...' : 'Sync Live API Now'}</span>
                </button>
              </div>

              {/* Main Match Controller Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Match Selector with Search & Filters (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                        <Sliders className="w-4 h-4 text-emerald-500" />
                        <span>Current Matches ({filteredMatches.length})</span>
                      </h3>
                      <span className="text-xs text-slate-400">Select a match to override</span>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        placeholder="Search by team, tournament, or ID (e.g. eve-foot-884012)..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={filterSport}
                        onChange={e => setFilterSport(e.target.value as any)}
                        className="p-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200"
                      >
                        <option value="all">All Sports</option>
                        <option value="cricket">Cricket</option>
                        <option value="football">Football</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="formula1">Formula 1</option>
                      </select>

                      <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value as any)}
                        className="p-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200"
                      >
                        <option value="all">All Statuses</option>
                        <option value="live">Live Matches</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed / Finished</option>
                      </select>
                    </div>
                  </div>

                  {/* Match List Scrollable Cards */}
                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                    {filteredMatches.length === 0 ? (
                      <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
                        No matches match the selected query or filter.
                      </div>
                    ) : (
                      filteredMatches.map(m => {
                        const isSelected = selectedMatchId === m.id || selectedMatchId === m.providerEventId;
                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMatchId(m.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-emerald-500/10 border-emerald-500 shadow-md'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            {/* Top Info */}
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                  {m.sport}
                                </span>
                                <span className="font-medium text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                  {m.tournament}
                                </span>
                              </div>

                              <div className="flex items-center space-x-1.5">
                                {m.manualOverride && (
                                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                                    Override Active
                                  </span>
                                )}
                                {m.status === 'live' ? (
                                  <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md animate-pulse">
                                    Live
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
                                    {m.status}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Teams and Scores */}
                            <div className="flex items-center justify-between text-xs font-bold px-1">
                              <div className="flex items-center space-x-2">
                                <img src={m.homeTeam.logo} alt="" className="w-5 h-5 rounded-full object-cover bg-slate-100" />
                                <span className="text-slate-900 dark:text-white">{m.homeTeam.shortName || m.homeTeam.name}</span>
                              </div>

                              <div className="font-mono text-sm font-black text-slate-900 dark:text-white px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                {m.homeTeam.score || '-'} vs {m.awayTeam.score || '-'}
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="text-slate-900 dark:text-white">{m.awayTeam.shortName || m.awayTeam.name}</span>
                                <img src={m.awayTeam.logo} alt="" className="w-5 h-5 rounded-full object-cover bg-slate-100" />
                              </div>
                            </div>

                            {/* ID Details Footer */}
                            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                              <span className="font-mono text-[10px] truncate max-w-[220px]">
                                ID: <span className="text-slate-300 font-bold">{m.id}</span>
                                {m.providerEventId ? ` • Evt: ${m.providerEventId}` : ''}
                              </span>
                              <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                                {m.statusText}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Column: Selected Match Score Override Panel (5 cols) */}
                <div className="lg:col-span-5">
                  {selectedMatch ? (
                    <form onSubmit={handleApplyOverride} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-lg sticky top-2">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-emerald-500" />
                          <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">
                            Match Controller Editor
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedMatchId(null)}
                          className="text-xs text-slate-400 hover:text-slate-200"
                        >
                          Deselect
                        </button>
                      </div>

                      {/* Match Information Card */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-slate-400 text-[10px]">
                          <span className="font-mono font-bold uppercase text-emerald-500">{selectedMatch.sport}</span>
                          <span>{selectedMatch.tournament}</span>
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {selectedMatch.homeTeam.name} vs {selectedMatch.awayTeam.name}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-mono">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase">Match ID</span>
                            <span className="font-bold text-slate-300">{selectedMatch.id}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase">Provider Event ID</span>
                            <span className="font-bold text-slate-300">{selectedMatch.providerEventId || 'N/A'}</span>
                          </div>
                        </div>
                        {selectedMatch.manualOverride && (
                          <div className="text-[10px] text-amber-500 font-bold flex items-center space-x-1 pt-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Currently using Admin Manual Score Override</span>
                          </div>
                        )}
                      </div>

                      {/* Form Override Controls */}
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">Match Status</label>
                          <select
                            value={overrideStatus}
                            onChange={e => setOverrideStatus(e.target.value as MatchStatus)}
                            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
                          >
                            <option value="live">LIVE</option>
                            <option value="upcoming">UPCOMING</option>
                            <option value="completed">COMPLETED / FINISHED</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">Status Text Banner</label>
                          <input
                            type="text"
                            placeholder="e.g. IND need 18 runs off 12 balls"
                            value={overrideStatusText}
                            onChange={e => setOverrideStatusText(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        {/* Scores Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">
                              {selectedMatch.homeTeam.shortName} Score
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 180/4 (19.0 ov) or 2"
                              value={overrideHomeScore}
                              onChange={e => setOverrideHomeScore(e.target.value)}
                              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">
                              {selectedMatch.awayTeam.shortName} Score
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 175/6 (20.0 ov) or 1"
                              value={overrideAwayScore}
                              onChange={e => setOverrideAwayScore(e.target.value)}
                              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        {selectedMatch.sport === 'football' && (
                          <div>
                            <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">Match Minute</label>
                            <input
                              type="number"
                              value={overrideMinute}
                              onChange={e => setOverrideMinute(parseInt(e.target.value) || 0)}
                              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">Venue</label>
                            <input
                              type="text"
                              value={overrideVenue}
                              onChange={e => setOverrideVenue(e.target.value)}
                              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 font-bold text-[10px] uppercase mb-1">Start Time</label>
                            <input
                              type="text"
                              value={overrideStartTime}
                              onChange={e => setOverrideStartTime(e.target.value)}
                              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 space-y-2">
                        <button
                          type="submit"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save & Apply Score Override</span>
                        </button>

                        {selectedMatch.manualOverride && (
                          <button
                            type="button"
                            onClick={handleRemoveOverride}
                            className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold rounded-xl text-xs border border-amber-500/30 transition-all"
                          >
                            Remove Override (Re-sync Live API)
                          </button>
                        )}
                      </div>
                    </form>
                  ) : (
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                      <Sliders className="w-8 h-8 text-slate-400 mx-auto" />
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">No Match Selected</h4>
                      <p className="text-xs text-slate-400">
                        Select any match from the list on the left to view its provider details and perform manual score updates or API re-syncs.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Manage News */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              <form onSubmit={handleSaveNews} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Create / Edit News Article</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Article Title *"
                    value={newsForm.title || ''}
                    onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                    required
                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                  <input
                    type="text"
                    placeholder="SEO Title"
                    value={newsForm.seoTitle || ''}
                    onChange={e => setNewsForm({ ...newsForm, seoTitle: e.target.value })}
                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                  <select
                    value={newsForm.sport || 'cricket'}
                    onChange={e => setNewsForm({ ...newsForm, sport: e.target.value as any })}
                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  >
                    <option value="cricket">Cricket</option>
                    <option value="football">Football</option>
                    <option value="basketball">Basketball</option>
                    <option value="tennis">Tennis</option>
                    <option value="formula1">Formula 1</option>
                  </select>
                  <select
                    value={newsForm.category || 'Cricket'}
                    onChange={e => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  >
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Transfers">Transfers</option>
                    <option value="Analysis">Analysis</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Featured Image URL"
                  value={newsForm.featuredImage || ''}
                  onChange={e => setNewsForm({ ...newsForm, featuredImage: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />

                <textarea
                  placeholder="Excerpt..."
                  value={newsForm.excerpt || ''}
                  onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  rows={2}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />

                <textarea
                  placeholder="Full Article Content (Markdown format supported)..."
                  value={newsForm.content || ''}
                  onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                  rows={5}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </form>

              {/* Published News List */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Existing News Articles</h3>
                {news.map(art => (
                  <div key={art.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">{art.category}</span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{art.title}</h4>
                    </div>
                    <button
                      onClick={() => handleDeleteNews(art.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SEO */}
          {activeTab === 'seo' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Global Technical SEO Settings</h3>
              <p className="text-xs text-slate-400">Configure global site name, meta tags, and structured schema presets.</p>
              <input
                type="text"
                defaultValue={seoConfig.defaultTitle}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
              <textarea
                defaultValue={seoConfig.defaultDescription}
                rows={3}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
              <button className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm">Save SEO Configuration</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

