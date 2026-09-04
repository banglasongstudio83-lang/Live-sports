import React, { useState } from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

export const RankingsView: React.FC = () => {
  const [sport, setSport] = useState<'cricket' | 'football' | 'tennis' | 'f1'>('cricket');

  const cricketRankings = [
    { rank: 1, team: 'India', points: 121, rating: '121.4' },
    { rank: 2, team: 'Australia', points: 118, rating: '118.0' },
    { rank: 3, team: 'England', points: 108, rating: '108.2' },
    { rank: 4, team: 'South Africa', points: 102, rating: '102.1' },
    { rank: 5, team: 'New Zealand', points: 96, rating: '96.5' },
    { rank: 6, team: 'Pakistan', points: 92, rating: '92.3' },
    { rank: 7, team: 'Sri Lanka', points: 84, rating: '84.0' },
    { rank: 8, team: 'Bangladesh', points: 78, rating: '78.2' }
  ];

  const footballRankings = [
    { rank: 1, team: 'Argentina', points: 1889, rating: 'FIFA World Champions' },
    { rank: 2, team: 'France', points: 1851, rating: 'UEFA Finalist' },
    { rank: 3, team: 'Spain', points: 1815, rating: 'Euro Champions' },
    { rank: 4, team: 'England', points: 1798, rating: 'UEFA Competitor' },
    { rank: 5, team: 'Brazil', points: 1785, rating: 'Copa America' },
    { rank: 6, team: 'Belgium', points: 1768, rating: 'Top Tier' },
    { rank: 7, team: 'Netherlands', points: 1754, rating: 'Top Tier' },
    { rank: 8, team: 'Portugal', points: 1741, rating: 'Top Tier' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>World Sports Rankings</span>
          </h1>
          <p className="text-xs text-slate-500">Official ICC, FIFA, ATP and Formula 1 global team standings.</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {[
            { id: 'cricket', label: 'ICC Cricket' },
            { id: 'football', label: 'FIFA Football' },
            { id: 'tennis', label: 'ATP Tennis' },
            { id: 'f1', label: 'F1 Drivers' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setSport(s.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sport === s.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 text-xs font-mono uppercase">
            <tr>
              <th className="py-3 px-6">Rank</th>
              <th className="py-3 px-6">Nation / Entity</th>
              <th className="py-3 px-6 text-right">Points / Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
            {(sport === 'cricket' ? cricketRankings : footballRankings).map(row => (
              <tr key={row.rank} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                <td className="py-4 px-6 font-mono font-bold">
                  {row.rank === 1 ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-black">1</span>
                  ) : (
                    `#${row.rank}`
                  )}
                </td>
                <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{row.team}</td>
                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-500">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
