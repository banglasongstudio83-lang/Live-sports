import React from 'react';
import { NewsArticle } from '../types';
import { Clock, Eye, Share2, Tag } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  onSelectArticle: (article: NewsArticle) => void;
  variant?: 'featured' | 'standard' | 'compact';
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onSelectArticle, variant = 'standard' }) => {
  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelectArticle(article)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
      >
        <img
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
            {article.category}
          </span>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 line-clamp-2 leading-snug">
            {article.title}
          </h4>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        onClick={() => onSelectArticle(article)}
        className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        <div className="relative h-80 sm:h-96 w-full">
          <img
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white uppercase tracking-wider shadow-md">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white uppercase tracking-wider animate-pulse shadow-md">
                Breaking
              </span>
            )}
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-3">
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Eye className="w-3.5 h-3.5 mr-1" />
                {article.viewsCount} views
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
              {article.title}
            </h2>

            <p className="text-sm text-slate-300 line-clamp-2 font-normal hidden sm:block">
              {article.excerpt}
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
              <span className="text-xs font-bold text-slate-200">{article.author.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelectArticle(article)}
      className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-900/80 text-emerald-400 backdrop-blur-md uppercase tracking-wider">
            {article.category}
          </span>
        </div>

        <div className="p-5 space-y-2">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>By {article.author.name}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1">
          <Tag className="w-3 h-3 text-slate-400" />
          <span className="truncate max-w-[150px]">{article.tags[0] || article.sport}</span>
        </div>
        <span className="font-bold text-emerald-500 group-hover:translate-x-0.5 transition-transform">Read Story →</span>
      </div>
    </div>
  );
};
