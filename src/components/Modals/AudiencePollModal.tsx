/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, BarChart3, Hand, Check, X } from 'lucide-react';
import { OptionKey } from '../../types/game';

interface AudiencePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: Record<OptionKey, string>;
  simulatedWeights: Record<OptionKey, number>;
  eliminatedOptions: OptionKey[];
}

export const AudiencePollModal: React.FC<AudiencePollModalProps> = ({
  isOpen,
  onClose,
  options,
  simulatedWeights,
  eliminatedOptions
}) => {
  const [isManualClassPoll, setIsManualClassPoll] = useState(false);
  const [classVotes, setClassVotes] = useState<Record<OptionKey, number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0
  });

  if (!isOpen) return null;

  const handleVoteIncrement = (key: OptionKey) => {
    setClassVotes(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const handleVoteDecrement = (key: OptionKey) => {
    setClassVotes(prev => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
  };

  const totalClassVotes = Object.values(classVotes).reduce((a, b) => a + b, 0);

  const getPercentage = (key: OptionKey): number => {
    if (eliminatedOptions.includes(key)) return 0;
    if (isManualClassPoll) {
      if (totalClassVotes === 0) return 0;
      return Math.round((classVotes[key] / totalClassVotes) * 100);
    }
    // Simulated weights: adjust if some are eliminated
    let weight = simulatedWeights[key] || 0;
    return weight;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0e1b38] to-[#040817] border-2 border-cyan-400 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.6)] p-6 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950 rounded-lg border border-cyan-400/50">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-kbc-display text-lg sm:text-xl font-bold text-cyan-200">
                Audience Poll Lifeline
              </h3>
              <p className="text-xs text-slate-400">
                {isManualClassPoll
                  ? 'Count student hand-raises in class'
                  : 'Studio Audience Survey Results'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle Mode: Simulated vs Live Class Hand-Raise */}
        <div className="my-4 flex items-center justify-center gap-2 p-1 bg-slate-900/80 rounded-lg border border-blue-900/60">
          <button
            type="button"
            onClick={() => setIsManualClassPoll(false)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              !isManualClassPoll
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 inline mr-1" />
            Simulated Audience
          </button>
          <button
            type="button"
            onClick={() => setIsManualClassPoll(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              isManualClassPoll
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hand className="w-3.5 h-3.5 inline mr-1" />
            Live Class Hand-Raise
          </button>
        </div>

        {/* Bar Chart Visualization */}
        <div className="grid grid-cols-4 gap-3 my-6 h-48 items-end px-2 sm:px-6">
          {(['A', 'B', 'C', 'D'] as OptionKey[]).map((key) => {
            const isEliminated = eliminatedOptions.includes(key);
            const pct = getPercentage(key);

            return (
              <div key={key} className="flex flex-col items-center h-full justify-end group">
                {/* Percentage label */}
                <span className="font-mono text-xs sm:text-sm font-bold text-cyan-300 mb-1">
                  {isEliminated ? '0%' : `${pct}%`}
                </span>

                {/* Vertical Bar */}
                <div className="w-full bg-slate-900/80 rounded-t-md h-36 flex items-end p-1 border border-cyan-500/20">
                  <div
                    style={{ height: `${isEliminated ? 0 : Math.max(4, pct)}%` }}
                    className={`w-full rounded-t-sm transition-all duration-700 ${
                      isEliminated
                        ? 'bg-slate-800'
                        : pct >= 50
                        ? 'bg-gradient-to-t from-cyan-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                        : 'bg-gradient-to-t from-blue-700 to-cyan-400'
                    }`}
                  />
                </div>

                {/* Option Letter */}
                <span className="font-kbc-display font-extrabold text-sm sm:text-base text-amber-400 mt-2">
                  ({key})
                </span>

                {/* In class manual vote counter buttons */}
                {isManualClassPoll && !isEliminated && (
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => handleVoteDecrement(key)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs"
                    >
                      -
                    </button>
                    <span className="text-[11px] font-mono text-cyan-200">
                      {classVotes[key]}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleVoteIncrement(key)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-cyan-800 text-white hover:bg-cyan-700 text-xs"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Options Overview */}
        <div className="space-y-1.5 text-xs text-slate-300 border-t border-cyan-500/30 pt-3">
          {(['A', 'B', 'C', 'D'] as OptionKey[]).map((key) => (
            <div
              key={key}
              className={`flex items-start gap-2 ${
                eliminatedOptions.includes(key) ? 'opacity-30 line-through' : ''
              }`}
            >
              <span className="font-bold text-amber-400 shrink-0">({key})</span>
              <span className="truncate">{options[key]}</span>
            </div>
          ))}
        </div>

        {/* Dismiss Button */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Lock In Information & Return
          </button>
        </div>
      </div>
    </div>
  );
};
