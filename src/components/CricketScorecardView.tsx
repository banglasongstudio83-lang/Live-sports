import React, { useState } from 'react';
import { Match, UserPrediction } from '../types';
import { Activity, Clock, Shield, MapPin, Award, ArrowLeft, RefreshCw } from 'lucide-react';

interface CricketScorecardViewProps {
  match: Match;
  onBack: () => void;
  userPoints: number;
  onVotePrediction: (matchId: string, choice: 'home' | 'away' | 'draw') => void;
  userPredictions: UserPrediction[];
}

export const CricketScorecardView: React.FC<CricketScorecardViewProps> = ({
  match,
  onBack,
  userPoints,
  onVotePrediction,
  userPredictions
}) => {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'commentary' | 'info' | 'h2h' | 'prediction'>('scorecard');
  const [selectedInningsIndex, setSelectedInningsIndex] = useState(0);

  const existingPred = userPredictions.find(p => p.matchId === match.id);
  const cricketData = match.cricketData;

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

      {/* Match Header Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/80 relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Tournament & Venue Info */}
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

          <div className="flex items-center space-x-2">
            {match.status === 'live' ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-red-500 text-white animate-pulse uppercase tracking-wider shadow-lg shadow-red-500/30">
                <span className="w-2 h-2 rounded-full bg-white mr-1.5 animate-ping" />
                Live Match
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-700 text-slate-200">
                {match.status.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Scores Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center my-4">
          {/* Home Team */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 p-1 bg-slate-800 shadow-xl"
            />
            <h2 className="text-xl font-black">{match.homeTeam.name}</h2>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {match.homeTeam.score || 'Yet to Bat'}
            </div>
          </div>

          {/* VS & Status Text */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-mono font-bold text-slate-400 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700">
              VS
            </div>
            <p className="text-sm font-bold text-amber-300 max-w-xs">{match.statusText}</p>
            {match.tossInfo && <p className="text-xs text-slate-400">{match.tossInfo}</p>}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 p-1 bg-slate-800 shadow-xl"
            />
            <h2 className="text-xl font-black">{match.awayTeam.name}</h2>
            <div className="text-2xl font-black font-mono text-slate-100">
              {match.awayTeam.score || 'Yet to Bat'}
            </div>
          </div>
        </div>

        {/* Quick Rate Info Bar */}
        {(match.runRate || match.requiredRunRate) && (
          <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            {match.runRate && (
              <span className="text-slate-300">
                Current RR: <strong className="text-white">{match.runRate}</strong>
              </span>
            )}
            {match.requiredRunRate && (
              <span className="text-amber-300">
                Required RR: <strong className="text-amber-200">{match.requiredRunRate}</strong>
              </span>
            )}
            {match.targetRuns && (
              <span className="text-emerald-300">
                Target: <strong className="text-emerald-200">{match.targetRuns}</strong>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {[
          { id: 'scorecard', label: 'Detailed Scorecard' },
          { id: 'commentary', label: 'Live Commentary' },
          { id: 'prediction', label: 'Prediction' },
          { id: 'h2h', label: 'Head to Head' },
          { id: 'info', label: 'Match Info' }
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

      {/* TAB CONTENT: Scorecard */}
      {activeTab === 'scorecard' && (
        <div className="space-y-6">
          {cricketData?.innings && cricketData.innings.length > 0 ? (
            <>
              {/* Innings Selector Buttons */}
              <div className="flex space-x-3">
                {cricketData.innings.map((inn, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedInningsIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedInningsIndex === idx
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {inn.teamName} Innings ({inn.runs}/{inn.wickets} - {inn.overs} ov)
                  </button>
                ))}
              </div>

              {/* Batting Table */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="bg-slate-50 dark:bg-slate-900 px-6 py-3 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Batting - {cricketData.innings[selectedInningsIndex]?.teamName}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs uppercase font-mono">
                      <tr>
                        <th className="py-3 px-6">Batter</th>
                        <th className="py-3 px-4">Dismissal</th>
                        <th className="py-3 px-3 text-right">R</th>
                        <th className="py-3 px-3 text-right">B</th>
                        <th className="py-3 px-3 text-right">4s</th>
                        <th className="py-3 px-3 text-right">6s</th>
                        <th className="py-3 px-4 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                      {cricketData.innings[selectedInningsIndex]?.batting.map((bat, i) => (
                        <tr
                          key={i}
                          className={bat.isBattingNow ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-bold' : ''}
                        >
                          <td className="py-3 px-6 text-slate-900 dark:text-white flex items-center space-x-2">
                            <span>{bat.name}</span>
                            {bat.isBattingNow && (
                              <span className="text-[10px] bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded">
                                *
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">
                            {bat.dismissal || (bat.isBattingNow ? 'not out' : 'not out')}
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white font-mono">
                            {bat.runs}
                          </td>
                          <td className="py-3 px-3 text-right text-slate-500 font-mono">{bat.balls}</td>
                          <td className="py-3 px-3 text-right text-slate-500 font-mono">{bat.fours}</td>
                          <td className="py-3 px-3 text-right text-slate-500 font-mono">{bat.sixes}</td>
                          <td className="py-3 px-4 text-right text-slate-500 font-mono">{bat.sr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bowling Table */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="bg-slate-50 dark:bg-slate-900 px-6 py-3 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Bowling
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs uppercase font-mono">
                      <tr>
                        <th className="py-3 px-6">Bowler</th>
                        <th className="py-3 px-3 text-right">O</th>
                        <th className="py-3 px-3 text-right">M</th>
                        <th className="py-3 px-3 text-right">R</th>
                        <th className="py-3 px-3 text-right">W</th>
                        <th className="py-3 px-4 text-right">Econ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                      {cricketData.innings[selectedInningsIndex]?.bowling.map((bwl, i) => (
                        <tr
                          key={i}
                          className={bwl.isBowlingNow ? 'bg-amber-50/50 dark:bg-amber-950/20 font-bold' : ''}
                        >
                          <td className="py-3 px-6 text-slate-900 dark:text-white">
                            {bwl.name} {bwl.isBowlingNow && '*'}
                          </td>
                          <td className="py-3 px-3 text-right font-mono">{bwl.overs}</td>
                          <td className="py-3 px-3 text-right font-mono">{bwl.maidens}</td>
                          <td className="py-3 px-3 text-right font-mono text-slate-500">{bwl.runs}</td>
                          <td className="py-3 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                            {bwl.wickets}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-slate-500">{bwl.economy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fall of Wickets */}
              {cricketData.innings[selectedInningsIndex]?.fallOfWickets && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Fall of Wickets</h3>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {cricketData.innings[selectedInningsIndex].fallOfWickets!.map((fow, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300"
                      >
                        <strong>{fow.score}/{fow.wicket}</strong> ({fow.player}, {fow.over} ov)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">Scorecard data updating...</div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Commentary */}
      {activeTab === 'commentary' && (
        <div className="space-y-4">
          {cricketData?.commentary && cricketData.commentary.length > 0 ? (
            cricketData.commentary.map(comm => (
              <div
                key={comm.id}
                className={`p-4 rounded-xl border flex items-start space-x-4 ${
                  comm.isWicket
                    ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
                    : comm.isSix
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : comm.isFour
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-md shrink-0">
                  {comm.over}
                </div>
                <div className="flex-1 text-sm space-y-1">
                  <p className="font-medium">{comm.text}</p>
                  <span className="text-[11px] text-slate-400">{comm.timestamp}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400">No commentary available yet.</div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Free Prediction */}
      {activeTab === 'prediction' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-xl mx-auto space-y-4">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Free Match Prediction</h3>
              <p className="text-xs text-slate-500">Predict the winner & earn +10 Free Virtual Points!</p>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs rounded-xl">
            Notice: SportPulse predictions use free virtual points only. No real money betting or odds.
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => onVotePrediction(match.id, 'home')}
              className={`p-4 rounded-xl border font-bold text-sm transition-all flex flex-col items-center justify-center space-y-2 ${
                existingPred?.predictedChoice === 'home'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <img src={match.homeTeam.logo} alt="" className="w-8 h-8 rounded-full" />
              <span>{match.homeTeam.name} Win</span>
            </button>

            <button
              onClick={() => onVotePrediction(match.id, 'away')}
              className={`p-4 rounded-xl border font-bold text-sm transition-all flex flex-col items-center justify-center space-y-2 ${
                existingPred?.predictedChoice === 'away'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <img src={match.awayTeam.logo} alt="" className="w-8 h-8 rounded-full" />
              <span>{match.awayTeam.name} Win</span>
            </button>
          </div>

          {existingPred && (
            <p className="text-center text-xs font-bold text-emerald-500 pt-2">
              ✓ You predicted: {existingPred.predictedWinnerName}
            </p>
          )}
        </div>
      )}

      {/* TAB CONTENT: Head to Head */}
      {activeTab === 'h2h' && match.headToHead && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Head to Head Statistics</h3>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-2xl font-black text-emerald-500">{match.headToHead.homeWins}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">{match.homeTeam.name} Wins</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-2xl font-black text-slate-400">{match.headToHead.draws}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Draws/No Result</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-2xl font-black text-blue-500">{match.headToHead.awayWins}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">{match.awayTeam.name} Wins</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Info */}
      {activeTab === 'info' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-sm">
          <p><strong>Match:</strong> {match.homeTeam.name} vs {match.awayTeam.name}</p>
          <p><strong>Tournament:</strong> {match.tournament}</p>
          <p><strong>Venue:</strong> {match.venue}</p>
          <p><strong>Toss:</strong> {match.tossInfo || 'Not available'}</p>
          <p><strong>Start Time:</strong> {match.startTime}</p>
        </div>
      )}
    </div>
  );
};
