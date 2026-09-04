import React from 'react';
import { Tournament, Match, NewsArticle } from '../types';
import { ArrowLeft, Trophy, Calendar, Award } from 'lucide-react';

interface TournamentHubViewProps {
  tournament: Tournament;
  matches: Match[];
  news: NewsArticle[];
  onBack: () => void;
  onSelectMatch: (match: Match) => void;
  onSelectNews: (article: NewsArticle) => void;
}

export const TournamentHubView: React.FC<TournamentHubViewProps> = ({
  tournament,
  matches,
  news,
  onBack,
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
        <span>Back to Tournaments</span>
      </button>

      {/* Tournament Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-xl">
        <div className="h-48 sm:h-64 w-full relative">
          <img src={tournament.banner} alt={tournament.name} className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-16 relative z-10 flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          <img src={tournament.logo} alt={tournament.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 bg-slate-800 p-1 shadow-2xl" />
          <div className="space-y-1 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white uppercase tracking-wider">
              {tournament.season}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">{tournament.name}</h1>
            <p className="text-xs text-slate-300 max-w-2xl">{tournament.description}</p>
          </div>
        </div>
      </div>

      {/* Points Table / Standings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm space-y-4 p-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Tournament Points Table / Standings</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 text-xs font-mono uppercase">
              <tr>
                <th className="py-3 px-4">Pos</th>
                <th className="py-3 px-6">Team</th>
                <th className="py-3 px-3 text-right">P</th>
                <th className="py-3 px-3 text-right">W</th>
                <th className="py-3 px-3 text-right">L</th>
                {tournament.sport === 'cricket' ? (
                  <th className="py-3 px-4 text-right">NRR</th>
                ) : (
                  <th className="py-3 px-4 text-right">GD</th>
                )}
                <th className="py-3 px-4 text-right">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              {tournament.standings.map(row => (
                <tr key={row.position} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="py-3.5 px-4 font-mono font-bold">{row.position}</td>
                  <td className="py-3.5 px-6 flex items-center space-x-3">
                    <img src={row.teamLogo} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-bold text-slate-900 dark:text-white">{row.teamName}</span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono">{row.played}</td>
                  <td className="py-3.5 px-3 text-right font-mono text-emerald-500">{row.won}</td>
                  <td className="py-3.5 px-3 text-right font-mono text-red-500">{row.lost}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                    {tournament.sport === 'cricket' ? row.netRunRate : row.goalDifference}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black font-mono text-amber-500">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      {tournament.topPerformers && tournament.topPerformers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tournament.topPerformers.map((tp, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4 shadow-sm">
              <img src={tp.photo} alt={tp.playerName} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">{tp.title}</span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{tp.playerName}</h4>
                <p className="text-xs text-slate-400">{tp.teamName} • <strong className="text-amber-500">{tp.metric}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
