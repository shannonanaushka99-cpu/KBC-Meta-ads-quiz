/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, Clock, Users, Volume2, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerDuration: number; // 0 = unlimited
  onSetTimerDuration: (sec: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  contestantName: string;
  onSetContestantName: (name: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  timerDuration,
  onSetTimerDuration,
  soundEnabled,
  onToggleSound,
  contestantName,
  onSetContestantName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#0e1a38] to-[#040817] border-2 border-cyan-400 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.6)] p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h3 className="font-kbc-display font-bold text-lg text-white">
              Classroom & Game Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-4">
          {/* Contestant / Team Name */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Contestant / Team Name:
            </label>
            <input
              type="text"
              value={contestantName}
              onChange={(e) => onSetContestantName(e.target.value)}
              placeholder="e.g. Period 3 Marketers, Team Alpha"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-hidden"
            />
          </div>

          {/* Timer Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Ghadiyal Babu (Timer per Question):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '30s', value: 30 },
                { label: '45s', value: 45 },
                { label: '60s', value: 60 },
                { label: 'Untimed', value: 0 }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSetTimerDuration(opt.value)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    timerDuration === opt.value
                      ? 'bg-cyan-600 text-white border-cyan-300 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {timerDuration === 0
                ? 'Discussion mode: No countdown timer, ideal for group debate.'
                : `Active timer: ${timerDuration} seconds per question.`}
            </p>
          </div>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">
                Game Audio & Synthesizer
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className={`px-3 py-1 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>
        </div>

        {/* Done */}
        <div className="mt-5 pt-3 border-t border-cyan-500/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm hover:from-cyan-500 transition-all cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
