/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, Sparkles, RefreshCcw, BookOpen } from 'lucide-react';
import { KbcEmblem } from '../KbcEmblem';

interface VictoryModalProps {
  isOpen: boolean;
  onPlayAgain: () => void;
  onOpenStudyGuide: () => void;
  teamName?: string;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onPlayAgain,
  onOpenStudyGuide,
  teamName
}) => {
  useEffect(() => {
    if (!isOpen) return;

    // Spectacular firework confetti bursts
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#ffffff']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#ffffff']
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#132347] via-[#0b162f] to-[#040817] border-4 border-amber-400 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.8)] p-6 sm:p-8 text-center overflow-hidden">
        {/* Decorative background rays */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Center Emblem */}
        <div className="flex justify-center mb-3">
          <KbcEmblem size={130} />
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 text-amber-400 font-kbc-display font-extrabold text-sm sm:text-base tracking-widest uppercase">
          <Sparkles className="w-5 h-5" />
          <span>Historical Triumph!</span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 mb-2 font-kbc-display">
          SAAT CRORE!
        </h2>
        <div className="text-3xl sm:text-5xl font-extrabold font-kbc-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wider drop-shadow-[0_4px_10px_rgba(245,158,11,0.5)] my-2">
          ₹7,00,00,000
        </div>

        {teamName && (
          <p className="text-cyan-300 font-semibold text-sm mb-3">
            Honoring: <span className="text-white font-bold">{teamName}</span>
          </p>
        )}

        <p className="text-sm sm:text-base text-slate-200 max-w-md mx-auto leading-relaxed my-4">
          Unbelievable mastery! You answered all 10 high-stakes questions correctly, proving
          expert fluency in Meta's auction mechanics, algorithms, and bidding strategies.
        </p>

        {/* Certificate Pill Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-400/40 my-4 text-left flex items-start gap-3">
          <Award className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-300">
              Meta Certified Auction Master
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              10/10 Mastery in Highest Volume, Cost Per Result Goal, ROAS Goal, and Bid Cap.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenStudyGuide}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Review Concepts
          </button>
          <button
            type="button"
            onClick={onPlayAgain}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
