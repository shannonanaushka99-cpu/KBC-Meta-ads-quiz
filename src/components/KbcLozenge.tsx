/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OptionKey } from '../types/game';

interface KbcQuestionBannerProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  category: string;
}

export const KbcQuestionBanner: React.FC<KbcQuestionBannerProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  category
}) => {
  return (
    <div className="relative w-full flex items-center justify-center my-3 px-2 sm:px-4">
      {/* Left extending horizontal connector wire */}
      <div className="hidden md:block absolute left-0 w-8 lg:w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-slate-200" />
      
      {/* The Question Lozenge Container */}
      <div className="relative w-full max-w-4xl">
        {/* Outer metallic border container */}
        <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-cyan-400 via-slate-100 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
          <div className="relative px-6 py-5 sm:py-6 rounded-md bg-gradient-to-b from-[#0e1a38] via-[#091024] to-[#040817] border border-blue-900/60 text-center flex flex-col items-center justify-center min-h-[96px]">
            {/* Strategy badge */}
            <span className="text-[11px] uppercase tracking-wider font-semibold text-cyan-300/80 mb-1">
              Question {questionNumber} of {totalQuestions} · {category}
            </span>
            {/* Question prose */}
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {questionText}
            </h2>
          </div>
        </div>

        {/* Left & Right metallic tips/pins */}
        <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-slate-200 border-2 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-slate-200 border-2 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      </div>

      {/* Right extending horizontal connector wire */}
      <div className="hidden md:block absolute right-0 w-8 lg:w-12 h-[2px] bg-gradient-to-l from-transparent via-cyan-400/60 to-slate-200" />
    </div>
  );
};

interface KbcOptionButtonProps {
  optionKey: OptionKey;
  text: string;
  state: 'default' | 'selected' | 'correct' | 'wrong' | 'eliminated';
  disabled: boolean;
  onClick: () => void;
}

export const KbcOptionButton: React.FC<KbcOptionButtonProps> = ({
  optionKey,
  text,
  state,
  disabled,
  onClick
}) => {
  // Determine styles based on state
  let borderGradient = 'from-slate-300 via-cyan-200 to-slate-400';
  let innerBg = 'from-[#141d3d] via-[#0a1128] to-[#030718]';
  let textColor = 'text-slate-100';
  let letterColor = 'text-amber-400';
  let glow = 'shadow-[0_0_12px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]';

  if (state === 'selected') {
    borderGradient = 'from-amber-200 via-yellow-400 to-amber-500';
    innerBg = 'from-[#b45309] via-[#d97706] to-[#78350f]';
    textColor = 'text-white font-bold';
    letterColor = 'text-yellow-100';
    glow = 'shadow-[0_0_25px_rgba(245,158,11,0.8)] animate-pulse-gold';
  } else if (state === 'correct') {
    borderGradient = 'from-emerald-200 via-green-400 to-emerald-500';
    innerBg = 'from-[#047857] via-[#059669] to-[#064e3b]';
    textColor = 'text-white font-bold';
    letterColor = 'text-green-100';
    glow = 'shadow-[0_0_30px_rgba(16,185,129,0.9)] animate-pulse-green';
  } else if (state === 'wrong') {
    borderGradient = 'from-red-200 via-red-400 to-rose-600';
    innerBg = 'from-[#b91c1c] via-[#dc2626] to-[#7f1d1d]';
    textColor = 'text-white font-bold';
    letterColor = 'text-red-100';
    glow = 'shadow-[0_0_25px_rgba(239,68,68,0.8)]';
  } else if (state === 'eliminated') {
    borderGradient = 'from-slate-700 via-slate-800 to-slate-900';
    innerBg = 'from-[#0a0f1d] via-[#050811] to-[#02040a]';
    textColor = 'text-slate-600 line-through';
    letterColor = 'text-slate-600';
    glow = 'opacity-30';
  }

  return (
    <div className="relative w-full flex items-center my-1.5 sm:my-2">
      {/* Side connector line */}
      <div className="hidden sm:block w-3 sm:w-5 h-[2px] bg-gradient-to-r from-transparent to-cyan-400/50" />

      <button
        type="button"
        disabled={disabled || state === 'eliminated'}
        onClick={onClick}
        aria-label={`Option ${optionKey}: ${text}`}
        className={`group relative flex-1 text-left transition-all duration-200 p-[2px] rounded-lg bg-gradient-to-r ${borderGradient} ${glow} ${
          disabled ? 'cursor-default' : 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
        }`}
      >
        <div
          className={`relative flex items-center px-4 py-3 sm:py-4 rounded-md bg-gradient-to-b ${innerBg} border border-white/10 min-h-[58px] sm:min-h-[64px]`}
        >
          {/* Option Letter Tag (A), (B), (C), (D) */}
          <span
            className={`font-kbc-display font-extrabold text-base sm:text-lg mr-3 shrink-0 ${letterColor}`}
          >
            {optionKey}:
          </span>

          {/* Option Text */}
          <span className={`text-sm sm:text-base leading-snug ${textColor}`}>
            {text}
          </span>
        </div>

        {/* Diamond point caps */}
        <div className="hidden sm:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-slate-200 border border-cyan-400 shadow-sm" />
        <div className="hidden sm:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-slate-200 border border-cyan-400 shadow-sm" />
      </button>

      {/* Side connector line */}
      <div className="hidden sm:block w-3 sm:w-5 h-[2px] bg-gradient-to-l from-transparent to-cyan-400/50" />
    </div>
  );
};
