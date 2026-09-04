import React from 'react';
import { Player, NewsArticle } from '../types';
import { ArrowLeft, User, Award, Activity, Calendar } from 'lucide-react';

interface PlayerDetailViewProps {
  player: Player;
  relatedNews: NewsArticle[];
  onBack: () => void;
  onSelectNews: (article: NewsArticle) => void;
}

export const PlayerDetailView: React.FC<PlayerDetailViewProps> = ({
  player,
  relatedNews,
  onBack,
  onSelectNews
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Players</span>
      </button>

      {/* Player Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={player.photo}
          alt={player.name}
          className="w-36 h-36 rounded-2xl object-cover border-4 border-emerald-500 shadow-2xl shrink-0"
        />

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white uppercase tracking-wider">
              {player.sport.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              #{player.jerseyNumber || '00'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black">{player.name}</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-700/60 font-mono">
            <div>Team: <strong className="text-white block font-sans">{player.teamName}</strong></div>
            <div>Role: <strong className="text-white block font-sans">{player.position}</strong></div>
            <div>Nationality: <strong className="text-white block font-sans">{player.nationality}</strong></div>
          </div>
        </div>
      </div>

      {/* Career Stats Breakdown */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-emerald-500" />
          <span>Career Statistics</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(player.careerStats).map(([key, val], idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-2xl font-black font-mono text-emerald-500">{val}</span>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase">{key}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Biography & Recent Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Player Biography</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">{player.bio}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Match Performance</h3>
          <div className="flex flex-wrap gap-2 pt-2">
            {player.recentForm.map((rf, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl font-mono text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              >
                {rf}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
