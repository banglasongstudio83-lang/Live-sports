import React from 'react';
import { Radio, ArrowRight, Zap } from 'lucide-react';
import { BreakingNews } from '../types';

interface BreakingNewsTickerProps {
  items: BreakingNews[];
  onSelectArticle?: (linkUrl: string) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ items, onSelectArticle }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900 text-white border-y border-slate-800 py-2.5 px-4 overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center space-x-3">
        {/* Label badge */}
        <div className="flex items-center space-x-1.5 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider shrink-0 shadow-sm animate-pulse">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Breaking News</span>
        </div>

        {/* Ticker scrolling items */}
        <div className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap flex items-center space-x-8">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => item.linkUrl && onSelectArticle && onSelectArticle(item.linkUrl)}
              className="inline-flex items-center space-x-2 text-sm text-slate-200 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-semibold text-slate-100">{item.text}</span>
              {item.linkText && (
                <span className="inline-flex items-center text-xs font-bold text-emerald-400 underline underline-offset-2 ml-1">
                  {item.linkText} <ArrowRight className="w-3 h-3 ml-0.5" />
                </span>
              )}
              <span className="text-xs text-slate-500 ml-2">({item.timestamp})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
