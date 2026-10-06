/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, AlertCircle, CheckCircle, Target, X } from 'lucide-react';
import { META_STRATEGIES_REFERENCE } from '../../data/metaReference';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>(META_STRATEGIES_REFERENCE[0].id);

  if (!isOpen) return null;

  const currentStrategy =
    META_STRATEGIES_REFERENCE.find((s) => s.id === activeTab) || META_STRATEGIES_REFERENCE[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#0e1c3b] via-[#091228] to-[#040817] border-2 border-cyan-400 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.6)] p-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-400/40 text-cyan-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-kbc-display font-bold text-lg sm:text-xl text-white">
                Meta Bidding Strategies · Master Reference
              </h3>
              <p className="text-xs text-slate-400">
                Official guide for classroom review & media buying strategy
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Strategy Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 shrink-0">
          {META_STRATEGIES_REFERENCE.map((strategy) => {
            const isActive = strategy.id === activeTab;
            return (
              <button
                key={strategy.id}
                type="button"
                onClick={() => setActiveTab(strategy.id)}
                className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer text-left truncate ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-300 shadow-md'
                    : 'bg-slate-900/70 text-slate-400 border-blue-900/40 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {strategy.name}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-slate-200">
          {/* Strategy Name & Meta Description Quote */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-cyan-500/30">
            <h4 className="text-lg font-bold text-cyan-200 mb-1">{currentStrategy.name}</h4>
            <p className="text-sm font-serif italic text-cyan-300">
              Meta's Description: {currentStrategy.officialDescription}
            </p>
          </div>

          {/* How it works */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4" />
              How It Works
            </h5>
            <p className="text-sm leading-relaxed text-slate-300">{currentStrategy.howItWorks}</p>
          </div>

          {/* Best used for */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-4 h-4" />
              Best Used For
            </h5>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {currentStrategy.bestUsedFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Trade-Off */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-4 h-4" />
              Inherent Trade-Off & Risk
            </h5>
            <p className="text-sm text-amber-100/90 leading-relaxed">{currentStrategy.tradeOff}</p>
          </div>

          {/* Key Rule Summary */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-400">
            <span className="font-bold text-cyan-300">Key Principle: </span>
            {currentStrategy.keyRule}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-cyan-500/30 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Back to Quiz Game
          </button>
        </div>
      </div>
    </div>
  );
};
