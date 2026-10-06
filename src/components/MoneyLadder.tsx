/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Trophy, X } from 'lucide-react';
import { PRIZE_LADDER } from '../data/questions';

interface MoneyLadderProps {
  currentQuestionIndex: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const MoneyLadder: React.FC<MoneyLadderProps> = ({
  currentQuestionIndex,
  isOpenMobile,
  onCloseMobile
}) => {
  // Ladder reversed (highest amount at the top)
  const reversedLadder = [...PRIZE_LADDER].reverse();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Ladder Container */}
      <aside
        className={`fixed lg:static top-0 right-0 h-full lg:h-auto z-50 lg:z-10 w-72 sm:w-80 lg:w-64 xl:w-72 bg-slate-950/95 lg:bg-slate-950/60 lg:backdrop-blur-md border-l border-blue-900/60 p-4 transition-transform duration-300 flex flex-col justify-between select-none ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-blue-900/60">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="font-kbc-display font-bold text-sm sm:text-base tracking-wider text-amber-300">
                Prize Ladder
              </h3>
            </div>
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Ladder Items */}
          <div className="space-y-1.5 font-mono text-xs sm:text-sm">
            {reversedLadder.map((tier) => {
              const tierIndex = tier.questionNumber - 1;
              const isCurrent = tierIndex === currentQuestionIndex;
              const isPassed = tierIndex < currentQuestionIndex;
              const isJackpot = tier.questionNumber === 10;

              let rowClass = 'text-slate-400 bg-slate-900/40 border-transparent';
              let numClass = 'text-slate-500';
              let amountClass = 'text-slate-300';

              if (isCurrent) {
                rowClass =
                  'bg-gradient-to-r from-amber-500/30 via-yellow-500/40 to-amber-600/30 border-amber-400/80 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] font-bold scale-[1.02]';
                numClass = 'text-amber-300 font-extrabold';
                amountClass = 'text-amber-200 font-extrabold';
              } else if (isPassed) {
                rowClass = 'text-emerald-300 bg-emerald-950/30 border-emerald-800/40';
                numClass = 'text-emerald-400';
                amountClass = 'text-emerald-200';
              } else if (tier.isSafeHaven) {
                rowClass = 'text-cyan-200 bg-blue-950/40 border-cyan-800/40 font-semibold';
                numClass = 'text-cyan-400';
                amountClass = 'text-cyan-200';
              }

              return (
                <div
                  key={tier.questionNumber}
                  className={`relative flex items-center justify-between px-3 py-1.5 rounded-md border transition-all duration-200 ${rowClass}`}
                >
                  {/* Left: Question Number & Safe Haven Badge */}
                  <div className="flex items-center gap-2">
                    <span className={`w-5 text-right font-bold ${numClass}`}>
                      {tier.questionNumber}
                    </span>
                    {tier.isSafeHaven && (
                      <span
                        title={isJackpot ? "Grand Jackpot" : "Guaranteed Safe Haven (Padav)"}
                        className="flex items-center gap-1 text-[10px] text-amber-400"
                      >
                        <Shield className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                        {isJackpot ? 'JACKPOT' : 'PADAV'}
                      </span>
                    )}
                  </div>

                  {/* Right: Prize Amount */}
                  <div className="flex items-center gap-1">
                    <span className={`tabular-nums font-kbc-display ${amountClass}`}>
                      {tier.prizeLabel}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping ml-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info: Padav summary */}
        <div className="mt-4 pt-3 border-t border-blue-900/60 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Padav 1: ₹1,60,000 (Q4)</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Padav 2: ₹12,50,000 (Q7)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Jackpot: ₹7,00,00,000 (Q10)</span>
          </div>
        </div>
      </aside>
    </>
  );
};
