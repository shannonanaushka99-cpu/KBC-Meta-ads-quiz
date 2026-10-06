/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowRight, X } from 'lucide-react';
import { Question } from '../../types/game';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  wasCorrect?: boolean;
  onNextQuestion?: () => void;
  isGameOver?: boolean;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isOpen,
  onClose,
  question,
  wasCorrect,
  onNextQuestion,
  isGameOver = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0c1836] via-[#081024] to-[#030612] border-2 border-cyan-400/80 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.5)] p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-cyan-500/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {question.strategyCategory}
              </span>
              {wasCorrect !== undefined && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    wasCorrect
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                      : 'bg-red-950 text-red-300 border border-red-500/50'
                  }`}
                >
                  {wasCorrect ? '✓ Sahi Jawab (Correct)' : '✗ Galat Jawab (Incorrect)'}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Concept Breakdown & Teaching Notes
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question & Correct Option Card */}
        <div className="my-4 p-4 rounded-xl bg-slate-900/80 border border-blue-900/60">
          <p className="text-xs text-slate-400 font-semibold mb-1">THE QUESTION:</p>
          <p className="text-sm font-medium text-slate-200 mb-3">{question.question}</p>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-400 mr-2">
                Option ({question.correctOption}):
              </span>
              <span className="font-semibold text-white">
                {question.options[question.correctOption]}
              </span>
            </div>
          </div>
        </div>

        {/* Meta Official Description Quote */}
        {question.officialQuote && (
          <div className="my-3 p-3 rounded-lg bg-blue-950/40 border-l-4 border-cyan-400 text-xs sm:text-sm text-cyan-200 italic">
            {question.officialQuote}
          </div>
        )}

        {/* Deep Dive: How It Works & Why */}
        <div className="space-y-3 text-sm text-slate-200 my-4 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-4 h-4" />
              How It Works In Practice
            </h4>
            <p>{question.explanation}</p>
          </div>

          {/* Trade-off Warning */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              Critical Auction Trade-Off
            </h4>
            <p className="text-xs sm:text-sm text-amber-100/90">{question.tradeOff}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-cyan-500/30 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
          >
            Close Notes
          </button>
          {onNextQuestion && !isGameOver && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNextQuestion();
              }}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
