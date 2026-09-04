import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Search,
  Menu,
  X,
  User,
  ShieldAlert,
  Moon,
  Sun,
  Award,
  Radio,
  ChevronRight
} from 'lucide-react';
import { SportType } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string, arg?: string) => void;
  activeSport: SportType | 'all';
  onSelectSport: (sport: SportType | 'all') => void;
  userPoints: number;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  activeSport,
  onSelectSport,
  userPoints,
  onOpenSearch,
  onOpenAdmin,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'live-scores', label: 'Live Scores', badge: 'LIVE', isLive: true },
    { id: 'cricket', label: 'Cricket', sport: 'cricket' as SportType },
    { id: 'football', label: 'Football', sport: 'football' as SportType },
    { id: 'basketball', label: 'Basketball', sport: 'basketball' as SportType },
    { id: 'tennis', label: 'Tennis', sport: 'tennis' as SportType },
    { id: 'formula1', label: 'Formula 1', sport: 'formula1' as SportType },
    { id: 'news', label: 'News' },
    { id: 'predictions', label: 'Predictions', isHot: true },
    { id: 'teams', label: 'Teams' },
    { id: 'players', label: 'Players' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'rankings', label: 'Rankings' }
  ];

  const handleNavClick = (id: string, sport?: SportType) => {
    if (sport) {
      onSelectSport(sport);
      onSelectTab(sport);
    } else {
      if (id === 'home') onSelectSport('all');
      onSelectTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar">
            <span className="inline-flex items-center text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5" />
              Live Sports Hub
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 hidden sm:inline">Cricket • Football • Basketball • Tennis • F1</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Virtual Points Counter */}
            <div
              onClick={() => onSelectTab('predictions')}
              className="flex items-center space-x-1.5 bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full font-medium cursor-pointer hover:bg-amber-500/30 transition-all border border-amber-500/30"
              title="Virtual Points (No monetary value)"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{userPoints} Virtual Pts</span>
            </div>

            {/* Admin Portal Shortcut */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
              title="Admin Panel"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-mono uppercase">
                Sport<span className="text-emerald-500">Pulse</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                Live Scores & News
              </span>
            </div>
          </div>

          {/* Desktop Search Button */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search news, teams, matches...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Quick Right Tools */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenSearch}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/80 py-1">
          {navItems.map(item => {
            const isActive = currentTab === item.id || (item.sport && activeSport === item.sport);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.sport)}
                className={`relative px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{item.label}</span>
                {item.isLive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                )}
                {item.isHot && <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.sport)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="flex items-center space-x-2">
                <span>{item.label}</span>
                {item.isLive && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-red-500 text-white rounded-full uppercase">
                    Live
                  </span>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
