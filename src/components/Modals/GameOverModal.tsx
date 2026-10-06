/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IndianRupee, ShieldCheck, RefreshCcw, BookOpen, AlertOctagon } from 'lucide-react';
import { KbcEmblem } from '../KbcEmblem';

interface GameOverModalProps {
  isOpen: boolean;
  finalWinningsLabel: string;
  isWalkAway: boolean;
  questionsAnsweredCount: number;
  onPlayAgain: () => void;
  onOpenStudyGuide: () => void;
  teamName?: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  finalWinningsLabel,
  isWalkAway,
  questionsAnsweredCount,
  onPlayAgain,
  onOpenStudyGuide,
  teamName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#141b36] via-[#0b1024] to-[#040612] border-2 border-cyan-400 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.6)] p-6 sm:p-7 text-center overflow-hidden">
        {/* Decorative subtle emblem */}
        <div className="flex justify-center mb-2">
          <KbcEmblem size={100} subtle />
        </div>

        {/* Icon & Status */}
        <div className="flex items-center justify-center gap-2 mb-1">
          {isWalkAway ? (
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          ) : (
            <AlertOctagon className="w-6 h-6 text-red-400" />
          )}
          <span
            className={`font-kbc-display font-bold text-sm tracking-wider uppercase ${
              isWalkAway ? 'text-amber-300' : 'text-rose-400'
            }`}
          >
            {isWalkAway ? 'Strategic Decision · Walk Away' : 'Khel Samapt (Game Over)'}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {isWalkAway ? 'Wise Choice to Bank Winnings!' : 'Hard Luck in the Hot Seat!'}
        </h3>

        {teamName && (
          <p className="text-xs text-cyan-300 font-semibold mb-2">
            Contestant: {teamName}
          </p>
        )}

        {/* Final Take-Home Cash Box */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-b from-blue-950/60 to-slate-900/90 border border-cyan-500/40 shadow-inner">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Final Guaranteed Takeaway
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold font-kbc-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mt-1 flex items-center justify-center gap-1">
            <IndianRupee className="w-6 h-6 text-amber-400" />
            <span>{finalWinningsLabel}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Questions cleared: <span className="text-cyan-300 font-bold">{questionsAnsweredCount} / 10</span>
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-3">
          {isWalkAway
            ? 'You protected your earnings and secured your prize money before taking an unnecessary risk.'
            : 'Meta auction mechanics require precision! Review the bidding strategies and step back onto the hot seat.'}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenStudyGuide}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Review 4 Strategies
          </button>
          <button
            type="button"
            onClick={onPlayAgain}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
