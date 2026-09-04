import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Newspaper, Trophy, Users, User, Activity } from 'lucide-react';
import { SearchResult } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateResult: (res: SearchResult) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateResult
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-16 px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-emerald-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Cricket, Football, Teams, Players, News..."
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none text-base"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {loading && <div className="text-center py-8 text-slate-400 text-sm">Searching live database...</div>}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">No sports records found for "{query}".</div>
          )}

          {!query && (
            <div className="text-center py-8 text-slate-400 text-xs space-y-2">
              <p>Type to search across All Sports, Teams, Players, News, and Tournaments.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['India', 'Arsenal', 'Virat Kohli', 'T20 World Cup', 'Mbappe'].map(term => (
                  <span
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}

          {results.map(res => (
            <div
              key={`${res.type}-${res.id}`}
              onClick={() => {
                onNavigateResult(res);
                onClose();
              }}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {res.image && <img src={res.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 uppercase">
                      {res.badge || res.type}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{res.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">{res.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
