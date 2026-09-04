import React from 'react';
import { NewsArticle } from '../types';
import { ArrowLeft, Clock, Eye, Share2, Tag, Calendar, User, Bookmark } from 'lucide-react';

interface NewsDetailViewProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
  onBack: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({
  article,
  relatedArticles,
  onBack,
  onSelectArticle
}) => {
  // Generate JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.seoTitle || article.title,
    'description': article.metaDescription || article.excerpt,
    'image': [article.featuredImage],
    'datePublished': article.publishedAt,
    'author': {
      '@type': 'Person',
      'name': article.author.name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SportPulse',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sportpulse-app.ai/assets/logo.png'
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to News</span>
      </button>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold">
            {article.sport}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center space-x-3">
            <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{article.author.name}</p>
              <p className="text-slate-400">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center">
              <Eye className="w-3.5 h-3.5 mr-1" />
              {article.viewsCount} reads
            </span>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold hover:bg-emerald-500/20 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
        <img
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          className="w-full h-[380px] sm:h-[450px] object-cover"
        />
        {article.imageAlt && (
          <p className="p-3 text-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-900 italic">
            Photo: {article.imageAlt}
          </p>
        )}
      </div>

      {/* Article Body */}
      <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-base space-y-4 font-normal">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={idx} className="text-xl font-bold text-slate-900 dark:text-white pt-4">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold text-slate-900 dark:text-white pt-2">
                {paragraph.replace('#### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('> ')) {
            return (
              <blockquote key={idx} className="p-4 border-l-4 border-emerald-500 bg-emerald-500/5 rounded-r-xl italic font-medium my-4">
                {paragraph.replace('> ', '')}
              </blockquote>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
          <Tag className="w-3.5 h-3.5" />
          <span>Article Tags</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Related Sports Stories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.slice(0, 2).map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-emerald-500 transition-all cursor-pointer flex space-x-4"
              >
                <img src={rel.featuredImage} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">{rel.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{rel.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
