/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Users, RefreshCw, IndianRupee, Volume2, VolumeX, Maximize, Minimize, BookOpen, Clock } from 'lucide-react';
import { LifelinesState } from '../types/game';

interface LifelineBarProps {
  lifelines: LifelinesState;
  disabled: boolean;
  currentPrizeLabel: string;
  timeLeft: number | null;
  timerActive: boolean;
  soundMuted: boolean;
  isFullscreen: boolean;
  onUseFiftyFifty: () => void;
  onUsePhoneFriend: () => void;
  onUseAudiencePoll: () => void;
  onUseFlipQuestion: () => void;
  onOpenPrizeLadder: () => void;
  onQuitGame: () => void;
  onToggleSound: () => void;
  onToggleFullscreen: () => void;
  onOpenStudyGuide: () => void;
}

export const LifelineBar: React.FC<LifelineBarProps> = ({
  lifelines,
  disabled,
  currentPrizeLabel,
  timeLeft,
  timerActive,
  soundMuted,
  isFullscreen,
  onUseFiftyFifty,
  onUsePhoneFriend,
  onUseAudiencePoll,
  onUseFlipQuestion,
  onOpenPrizeLadder,
  onQuitGame,
  onToggleSound,
  onToggleFullscreen,
  onOpenStudyGuide
}) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-blue-900/50 py-2.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 z-30 select-none">
      {/* Zone 1: Lifelines Group (matches the exact screenshot layout) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 50:50 */}
        <button
          type="button"
          disabled={!lifelines.fiftyFifty || disabled}
          onClick={onUseFiftyFifty}
          title={lifelines.fiftyFifty ? "50:50 Lifeline: Eliminate 2 wrong answers" : "50:50 already used"}
          className={`relative px-3.5 sm:px-4 py-1.5 rounded-lg font-kbc-display font-extrabold text-sm sm:text-base tracking-wider transition-all duration-200 border ${
            lifelines.fiftyFifty && !disabled
              ? 'bg-gradient-to-b from-[#1e40af] to-[#0f172a] text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-900/60 text-slate-600 border-slate-800 cursor-not-allowed opacity-40 line-through'
          }`}
        >
          50:50
        </button>

        {/* Phone a Friend */}
        <button
          type="button"
          disabled={!lifelines.phoneFriend || disabled}
          onClick={onUsePhoneFriend}
          title={lifelines.phoneFriend ? "Phone A Friend: Consult Meta Performance Expert" : "Phone A Friend already used"}
          className={`relative p-2 sm:p-2.5 rounded-lg transition-all duration-200 border ${
            lifelines.phoneFriend && !disabled
              ? 'bg-gradient-to-b from-[#1e40af] to-[#0f172a] text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-900/60 text-slate-600 border-slate-800 cursor-not-allowed opacity-40'
          }`}
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          {!lifelines.phoneFriend && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-red-500/80 rotate-45" />
            </div>
          )}
        </button>

        {/* Audience Poll */}
        <button
          type="button"
          disabled={!lifelines.audiencePoll || disabled}
          onClick={onUseAudiencePoll}
          title={lifelines.audiencePoll ? "Audience Poll: Class & audience voting" : "Audience Poll already used"}
          className={`relative p-2 sm:p-2.5 rounded-lg transition-all duration-200 border ${
            lifelines.audiencePoll && !disabled
              ? 'bg-gradient-to-b from-[#1e40af] to-[#0f172a] text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-900/60 text-slate-600 border-slate-800 cursor-not-allowed opacity-40'
          }`}
        >
          <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          {!lifelines.audiencePoll && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-red-500/80 rotate-45" />
            </div>
          )}
        </button>

        {/* Flip / Switch Question */}
        <button
          type="button"
          disabled={!lifelines.flipQuestion || disabled}
          onClick={onUseFlipQuestion}
          title={lifelines.flipQuestion ? "Flip Question: Swap for another Meta bidding question" : "Flip Question already used"}
          className={`relative p-2 sm:p-2.5 rounded-lg transition-all duration-200 border ${
            lifelines.flipQuestion && !disabled
              ? 'bg-gradient-to-b from-[#1e40af] to-[#0f172a] text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-900/60 text-slate-600 border-slate-800 cursor-not-allowed opacity-40'
          }`}
        >
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          {!lifelines.flipQuestion && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-red-500/80 rotate-45" />
            </div>
          )}
        </button>

        {/* Rupee / Winnings Button */}
        <button
          type="button"
          onClick={onOpenPrizeLadder}
          title="View Prize Ladder & Safe Havens"
          className="relative px-3 py-1.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 border bg-gradient-to-b from-[#1e40af] to-[#0f172a] text-amber-300 border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <IndianRupee className="w-4 h-4 text-amber-300" />
          <span className="font-kbc-display hidden sm:inline">{currentPrizeLabel}</span>
        </button>

        {/* QUIT button (classic KBC quit) */}
        <button
          type="button"
          disabled={disabled}
          onClick={onQuitGame}
          title="Quit & Take Safe Banked Winnings"
          className="px-3.5 py-1.5 rounded-lg font-kbc-display font-extrabold text-xs sm:text-sm tracking-wider text-white bg-gradient-to-b from-blue-700 to-slate-900 border border-cyan-300/40 hover:from-red-600 hover:to-rose-900 hover:border-red-400 transition-all duration-200 shadow-sm cursor-pointer"
        >
          QUIT
        </button>
      </div>

      {/* Zone 2: Timer ("Ghadiyal Babu" / Tik-Tiki) */}
      {timeLeft !== null && (
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/90 rounded-full border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
          <span
            className={`font-mono text-sm sm:text-base font-bold tabular-nums ${
              timeLeft <= 10 ? 'text-red-400 font-extrabold animate-pulse' : 'text-cyan-200'
            }`}
          >
            {timeLeft}s
          </span>
        </div>
      )}

      {/* Zone 3: Classroom Utilities (Audio, Study Guide, Fullscreen) */}
      <div className="flex items-center gap-2">
        {/* Study Guide */}
        <button
          type="button"
          onClick={onOpenStudyGuide}
          title="Meta Bidding Strategies Cheat Sheet"
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors cursor-pointer"
        >
          {soundMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />}
        </button>

        {/* Fullscreen / Projector Mode */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Classroom Projector Mode" : "Enter Classroom Projector Mode (Fullscreen)"}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/50 transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
    </header>
  );
};
