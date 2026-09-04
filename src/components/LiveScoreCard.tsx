import React from 'react';
import { Match } from '../types';
import { Activity, Clock, ChevronRight } from 'lucide-react';

interface LiveScoreCardProps {
  match: Match;
  onSelectMatch: (match: Match) => void;
}

export const LiveScoreCard: React.FC<LiveScoreCardProps> = ({ match, onSelectMatch }) => {
  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';

  return (
    <div
      onClick={() => onSelectMatch(match)}
      className={`group relative bg-white dark:bg-slate-800/90 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-4 flex flex-col justify-between hover:shadow-xl ${
        isLive
          ? 'border-emerald-500/50 shadow-md shadow-emerald-500/5 dark:shadow-emerald-900/20'
          : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {/* Top Tournament & Status Header */}
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
          {match.tournament}
        </span>

        {isLive ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-black bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-ping" />
            Live
          </span>
        ) : isUpcoming ? (
          <span className="inline-flex items-center text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </span>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
            Full Time
          </span>
        )}
      </div>

      {/* Teams and Scores */}
      <div className="space-y-3 my-1">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-emerald-500 transition-colors">
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {match.homeTeam.score || '-'}
            </span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-emerald-500 transition-colors">
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {match.awayTeam.score || '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Status Text Footer */}
      <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[210px]" title={match.statusText}>
          {match.statusText}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
};
