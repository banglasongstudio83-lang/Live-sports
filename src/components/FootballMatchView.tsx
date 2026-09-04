import React, { useState } from 'react';
import { Match, UserPrediction } from '../types';
import { ArrowLeft, MapPin, Award, Shield, Clock, ShieldAlert } from 'lucide-react';

interface FootballMatchViewProps {
  match: Match;
  onBack: () => void;
  userPoints: number;
  onVotePrediction: (matchId: string, choice: 'home' | 'away' | 'draw') => void;
  userPredictions: UserPrediction[];
}

export const FootballMatchView: React.FC<FootballMatchViewProps> = ({
  match,
  onBack,
  userPoints,
  onVotePrediction,
  userPredictions
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'stats' | 'lineups' | 'h2h' | 'prediction'>('events');

  const footballData = match.footballData;
  const existingPred = userPredictions.find(p => p.matchId === match.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Matches</span>
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/80 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 border-b border-slate-700/60 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider font-mono">
              {match.tournament}
            </span>
            <span>•</span>
            <span className="flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {match.venue}
            </span>
          </div>

          <div>
            {match.status === 'live' ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-red-500 text-white animate-pulse uppercase tracking-wider shadow-lg shadow-red-500/30">
                <span className="w-2 h-2 rounded-full bg-white mr-1.5 animate-ping" />
                {match.minute ? `${match.minute}' LIVE` : 'LIVE'}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-700 text-slate-200">
                {match.status.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center my-4">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 p-1 bg-slate-800 shadow-xl"
            />
            <h2 className="text-xl font-black">{match.homeTeam.name}</h2>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl font-black font-mono tracking-widest bg-slate-800 px-6 py-2 rounded-2xl border border-slate-700 text-emerald-400 shadow-inner">
              {match.homeTeam.score || '0'} - {match.awayTeam.score || '0'}
            </div>
            <p className="text-sm font-bold text-amber-300">{match.statusText}</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 p-1 bg-slate-800 shadow-xl"
            />
            <h2 className="text-xl font-black">{match.awayTeam.name}</h2>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {[
          { id: 'events', label: 'Match Timeline' },
          { id: 'stats', label: 'Match Statistics' },
          { id: 'lineups', label: 'Lineups' },
          { id: 'prediction', label: 'Prediction' },
          { id: 'h2h', label: 'Head to Head' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: Events */}
      {activeTab === 'events' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Key Events & Goals</h3>
          {footballData?.events && footballData.events.length > 0 ? (
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-6 pl-6 py-2">
              {footballData.events.map(ev => (
                <div key={ev.id} className="relative flex items-center space-x-4">
                  <span className="absolute -left-[31px] w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-[9px] font-black font-mono text-white">
                    {ev.minute}'
                  </span>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex-1 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{ev.player}</span>
                      {ev.detail && <p className="text-xs text-slate-500">{ev.detail}</p>}
                    </div>
                    <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                      {ev.type.replace('_', ' ')} ({ev.team})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">No match events reported yet.</div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Stats */}
      {activeTab === 'stats' && footballData?.stats && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Match Statistics</h3>
          {[
            { label: 'Ball Possession (%)', home: footballData.stats.possession[0], away: footballData.stats.possession[1] },
            { label: 'Shots on Target', home: footballData.stats.shotsOnTarget[0], away: footballData.stats.shotsOnTarget[1] },
            { label: 'Total Shots', home: footballData.stats.totalShots[0], away: footballData.stats.totalShots[1] },
            { label: 'Corners', home: footballData.stats.corners[0], away: footballData.stats.corners[1] },
            { label: 'Pass Accuracy (%)', home: footballData.stats.passAccuracy[0], away: footballData.stats.passAccuracy[1] },
            { label: 'Yellow Cards', home: footballData.stats.yellowCards[0], away: footballData.stats.yellowCards[1] }
          ].map((st, i) => {
            const total = (st.home || 1) + (st.away || 1);
            const homePct = Math.round(((st.home || 0) / total) * 100);
            return (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
                  <span>{st.home}</span>
                  <span className="text-slate-400 font-sans">{st.label}</span>
                  <span>{st.away}</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${homePct}%` }} />
                  <div className="bg-blue-500 h-full flex-1" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB CONTENT: Lineups */}
      {activeTab === 'lineups' && footballData?.lineups && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Home Lineup */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{match.homeTeam.name}</h3>
              <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                Formation {footballData.lineups.homeFormation}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              {footballData.lineups.homeStarting.map(p => (
                <div key={p.number} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60">
                  <span className="font-mono font-bold text-xs w-6 text-slate-400">#{p.number}</span>
                  <span className="font-medium flex-1 text-slate-800 dark:text-slate-200">{p.name}</span>
                  <span className="text-xs font-mono text-slate-400">{p.position}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Away Lineup */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{match.awayTeam.name}</h3>
              <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                Formation {footballData.lineups.awayFormation}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              {footballData.lineups.awayStarting.map(p => (
                <div key={p.number} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60">
                  <span className="font-mono font-bold text-xs w-6 text-slate-400">#{p.number}</span>
                  <span className="font-medium flex-1 text-slate-800 dark:text-slate-200">{p.name}</span>
                  <span className="text-xs font-mono text-slate-400">{p.position}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Prediction */}
      {activeTab === 'prediction' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-xl mx-auto space-y-4">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Free Match Prediction</h3>
              <p className="text-xs text-slate-500">Predict the winner or draw to win +10 Virtual Points!</p>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs rounded-xl">
            Notice: SportPulse predictions use free virtual points only. No real money betting or odds.
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => onVotePrediction(match.id, 'home')}
              className={`p-3 rounded-xl border font-bold text-xs transition-all flex flex-col items-center justify-center space-y-1.5 ${
                existingPred?.predictedChoice === 'home'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <span>{match.homeTeam.shortName} Win</span>
            </button>

            <button
              onClick={() => onVotePrediction(match.id, 'draw')}
              className={`p-3 rounded-xl border font-bold text-xs transition-all flex flex-col items-center justify-center space-y-1.5 ${
                existingPred?.predictedChoice === 'draw'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <span>Draw</span>
            </button>

            <button
              onClick={() => onVotePrediction(match.id, 'away')}
              className={`p-3 rounded-xl border font-bold text-xs transition-all flex flex-col items-center justify-center space-y-1.5 ${
                existingPred?.predictedChoice === 'away'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <span>{match.awayTeam.shortName} Win</span>
            </button>
          </div>

          {existingPred && (
            <p className="text-center text-xs font-bold text-emerald-500 pt-2">
              ✓ You predicted: {existingPred.predictedWinnerName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
