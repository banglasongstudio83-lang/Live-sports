import React from 'react';
import { AdPlacement } from '../types';

interface AdBannerProps {
  placement: AdPlacement;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement }) => {
  if (!placement || !placement.isActive) return null;

  return (
    <div className="my-6 max-w-7xl mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 p-2 text-center shadow-sm">
        <span className="absolute top-2 right-3 text-[9px] font-bold uppercase text-slate-400 tracking-wider">
          Sponsored / Advertisement
        </span>

        <a href={placement.targetUrl} target="_blank" rel="noopener noreferrer" className="block group">
          <img
            src={placement.imageUrl}
            alt={placement.title}
            className="w-full h-24 sm:h-32 object-cover rounded-xl group-hover:opacity-95 transition-opacity"
          />
          <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 pt-2">
            {placement.title} — <span className="text-emerald-500">{placement.sponsorName}</span>
          </span>
        </a>
      </div>
    </div>
  );
};
