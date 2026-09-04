import React, { useState } from 'react';
import { LeaderboardUser, UserPrediction } from '../types';
import { Trophy, Award, Target, Flame, ShieldCheck, Zap } from 'lucide-react';

interface LeaderboardTableProps {
  leaderboard: LeaderboardUser[];
  userPredictions: UserPrediction[];
  userPoints: number;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboard,
  userPredictions,
  userPoints
}) => {
  const [timeframe, setTimeframe] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');

  const totalPreds = userPredictions.length;
  const correctPreds = userPredictions.filter(p => p.status === 'correct').length;
  const accuracyPct = totalPreds > 0 ? Math.round((correctPreds / totalPreds) * 100) : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Notice Disclaimer Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-4 rounded-2xl flex items-start space-x-3 text-amber-600 dark:text-amber-400">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold">100% Free Virtual Points Prediction Platform</p>
          <p className="text-amber-700/80 dark:text-amber-300/80">
            SportPulse is a purely educational and fan engagement game. Predictions are executed using virtual points only. No real money, deposits, cash prizes, gambling, or betting odds are allowed.
          </p>
        </div>
      </div>

      {/* User Performance Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Virtual Balance</span>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">{userPoints} Pts</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4 shadow-sm">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prediction Accuracy</span>
            <div className="text-2xl font-black font-mono text-emerald-500">{accuracyPct}%</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4 shadow-sm">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Predictions</span>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">{totalPreds}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center space-x-4 shadow-sm">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Community Rank</span>
            <div className="text-2xl font-black font-mono text-purple-500">#42</div>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Prediction Leaderboard</span>
            </h2>
            <p className="text-xs text-slate-500">Top predictor standings ranked by earned virtual points.</p>
          </div>

          {/* Timeframe Filters */}
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
            {[
              { id: 'all', label: 'All-Time' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'weekly', label: 'Weekly' },
              { id: 'daily', label: 'Daily' }
            ].map(tf => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeframe === tf.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 text-xs font-mono uppercase">
              <tr>
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Predictor</th>
                <th className="py-3 px-4 text-right">Points</th>
                <th className="py-3 px-4 text-right">Accuracy</th>
                <th className="py-3 px-6 text-right">Correct / Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              {leaderboard.map(user => {
                const pts =
                  timeframe === 'daily'
                    ? user.dailyPoints
                    : timeframe === 'weekly'
                    ? user.weeklyPoints
                    : timeframe === 'monthly'
                    ? user.monthlyPoints
                    : user.totalPoints;

                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900 dark:text-white">
                      {user.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-black">1</span>
                      ) : user.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black">2</span>
                      ) : user.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-black">3</span>
                      ) : (
                        `#${user.rank}`
                      )}
                    </td>
                    <td className="py-4 px-6 flex items-center space-x-3">
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-slate-900 dark:text-white">{user.username}</span>
                    </td>
                      <td className="py-4 px-4 text-right font-black font-mono text-amber-500">{pts} pts</td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-emerald-500">{user.accuracy}%</td>
                    <td className="py-4 px-6 text-right font-mono text-slate-500">
                      {user.correctPredictions} / {user.totalPredictions}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Prediction History Section */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
        <h3 className="text-base font-black text-slate-900 dark:text-white">Your Prediction History</h3>
        {userPredictions.length === 0 ? (
          <p className="text-sm text-slate-400 py-4">No predictions placed yet. Select any live or upcoming match to predict!</p>
        ) : (
          <div className="space-y-3">
            {userPredictions.map(pred => (
              <div
                key={pred.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-900/50"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{pred.matchTitle}</h4>
                  <p className="text-xs text-slate-500">
                    Predicted: <strong className="text-emerald-500">{pred.predictedWinnerName}</strong> • {new Date(pred.predictedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {pred.status.toUpperCase()} (+10 Pts on match conclusion)
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
