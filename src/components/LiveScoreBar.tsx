import React, { useState } from 'react';
import { Match, SportType } from '../types';
import { LiveScoreCard } from './LiveScoreCard';
import { Radio, ChevronLeft, ChevronRight, Activity } from 'lucide-react';

interface LiveScoreBarProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  activeSportFilter?: SportType | 'all';
}

export const LiveScoreBar: React.FC<LiveScoreBarProps> = ({
  matches,
  onSelectMatch,
  activeSportFilter = 'all'
}) => {
  const [sportFilter, setSportFilter] = useState<SportType | 'all'>('all');

  const filteredMatches = matches.filter(m => {
    if (sportFilter === 'all') return true;
    return m.sport === sportFilter;
  });

  const sportsList: { id: SportType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Sports' },
    { id: 'cricket', label: 'Cricket' },
    { id: 'football', label: 'Football' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'formula1', label: 'F1' }
  ];

  return (
    <section className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-4 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Live & Match Scores
            </h2>
            <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
              {matches.filter(m => m.status === 'live').length} LIVE
            </span>
          </div>

          {/* Sport filter buttons */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {sportsList.map(s => (
              <button
                key={s.id}
                onClick={() => setSportFilter(s.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  sportFilter === s.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Card Grid */}
        {filteredMatches.length === 0 ? (
          <div className="py-6 text-center text-slate-400 text-sm bg-white dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            No active matches found for selected sport filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMatches.slice(0, 8).map(match => (
              <LiveScoreCard key={match.id} match={match} onSelectMatch={onSelectMatch} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
