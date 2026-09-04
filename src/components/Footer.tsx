import React, { useState } from 'react';
import { Trophy, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubStatus('error');
      return;
    }
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(() => {
        setSubStatus('success');
        setEmail('');
      })
      .catch(() => setSubStatus('error'));
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 px-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Newsletter & Branding Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-800">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xl font-black font-mono text-white uppercase tracking-tight">
                Sport<span className="text-emerald-500">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Your premier multi-sport destination for real-time Cricket & Football match scores, comprehensive scorecards, sports news analysis, and free virtual predictions.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Subscribe to SportPulse Daily Digest</span>
            </h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center space-x-1"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subStatus === 'success' && <p className="text-xs text-emerald-400 font-bold">✓ Subscribed successfully!</p>}
            {subStatus === 'error' && <p className="text-xs text-red-400">Please provide a valid email.</p>}
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex items-start space-x-4">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-200">Legal Compliance & Responsible Gaming Notice</p>
            <p>
              SportPulse is strictly an informational sports journalism and free prediction entertainment platform.
              <strong> Absolutely NO real-money betting, gambling, gambling odds, monetary deposits, withdrawals, wagering, or cash prizes are hosted or provided.</strong>
              All predictions utilize free virtual points with zero cash value.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4">
          <p>© {new Date().getFullYear()} SportPulse International Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>SEO Sitemap</span>
            <span>Editorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
