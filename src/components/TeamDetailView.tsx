import React from 'react';
import { Team, Player, Match, NewsArticle } from '../types';
import { ArrowLeft, Trophy, Users, Shield, Calendar, MapPin } from 'lucide-react';

interface TeamDetailViewProps {
  team: Team;
  squad: Player[];
  recentMatches: Match[];
  relatedNews: NewsArticle[];
  onBack: () => void;
  onSelectPlayer: (player: Player) => void;
  onSelectMatch: (match: Match) => void;
  onSelectNews: (article: NewsArticle) => void;
}

export const TeamDetailView: React.FC<TeamDetailViewProps> = ({
  team,
  squad,
  recentMatches,
  relatedNews,
  onBack,
  onSelectPlayer,
  onSelectMatch,
  onSelectNews
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Teams</span>
      </button>

      {/* Team Banner Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-xl">
        <div className="h-56 sm:h-72 w-full relative">
          <img src={team.bannerImage} alt={team.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-20 relative z-10 flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <img
            src={team.logo}
            alt={team.name}
            className="w-28 h-28 rounded-2xl object-cover border-4 border-emerald-500 bg-slate-800 shadow-2xl shrink-0"
          />
          <div className="space-y-2 flex-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white uppercase tracking-wider">
              {team.sport.toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">{team.name}</h1>
            <p className="text-xs text-slate-300 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span>Country: <strong>{team.country}</strong></span>
              <span>•</span>
              <span>Head Coach: <strong>{team.coach}</strong></span>
              <span>•</span>
              <span>Founded: <strong>{team.founded}</strong></span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">{team.stats.matchesPlayed}</span>
          <p className="text-xs text-slate-400 font-semibold">Matches Played</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-2xl font-black font-mono text-emerald-500">{team.stats.wins}</span>
          <p className="text-xs text-slate-400 font-semibold">Victories</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-2xl font-black font-mono text-red-500">{team.stats.losses}</span>
          <p className="text-xs text-slate-400 font-semibold">Losses</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-2xl font-black font-mono text-amber-500">{team.stats.winRate}%</span>
          <p className="text-xs text-slate-400 font-semibold">Win Rate</p>
        </div>
      </div>

      {/* Main Squad Roster */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <Users className="w-5 h-5 text-emerald-500" />
          <span>Current Active Squad</span>
        </h2>
        {squad.length === 0 ? (
          <p className="text-sm text-slate-400">Roster updating...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {squad.map(player => (
              <div
                key={player.id}
                onClick={() => onSelectPlayer(player)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-500 cursor-pointer transition-all flex items-center space-x-4"
              >
                <img src={player.photo} alt={player.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{player.name}</h4>
                  <p className="text-xs text-slate-500">{player.position}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trophy Cabinet */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Trophy Cabinet & Honors</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {team.trophies.map((tr, i) => (
            <div key={i} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
              <span className="text-xs font-mono font-bold block text-amber-500">{tr.year}</span>
              <p className="font-bold text-sm mt-1">{tr.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
