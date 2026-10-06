/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PhoneCall, PhoneOff, UserCheck, Clock } from 'lucide-react';

interface PhoneFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertClue: string;
}

export const PhoneFriendModal: React.FC<PhoneFriendModalProps> = ({
  isOpen,
  onClose,
  expertClue
}) => {
  const [callState, setCallState] = useState<'RINGING' | 'CONNECTED'>('RINGING');
  const [callTimer, setCallTimer] = useState(30);

  useEffect(() => {
    if (!isOpen) {
      setCallState('RINGING');
      setCallTimer(30);
      return;
    }

    // Connect after 1.5s ring
    const ringTimeout = setTimeout(() => {
      setCallState('CONNECTED');
    }, 1500);

    return () => clearTimeout(ringTimeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || callState !== 'CONNECTED') return;

    if (callTimer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCallTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, callState, callTimer]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#0f1d3a] to-[#040916] border-2 border-cyan-400 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.6)] p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="font-kbc-display font-bold text-lg text-cyan-200">
              Phone-A-Friend Lifeline
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-300">
            <Clock className="w-3.5 h-3.5" />
            <span>{callTimer}s</span>
          </div>
        </div>

        {/* Call Animation / Contact */}
        <div className="my-6 text-center">
          <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[3px] shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <UserCheck className="w-10 h-10 text-cyan-300" />
            </div>
            {callState === 'RINGING' && (
              <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
            )}
          </div>

          <h4 className="mt-3 text-base font-bold text-white">
            Meta Performance Media Director
          </h4>
          <p className="text-xs text-cyan-300 font-mono">
            {callState === 'RINGING' ? 'Dialing contact... (Tring Tring)' : 'Connected · Live Audio'}
          </p>
        </div>

        {/* Message Bubble */}
        <div className="my-4 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-left">
          {callState === 'RINGING' ? (
            <p className="text-sm text-slate-400 italic animate-pulse">
              "Connecting to our advertising strategist, please hold on..."
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                Strategist's Analysis:
              </p>
              <p className="text-sm text-slate-100 leading-relaxed font-medium">
                "{expertClue}"
              </p>
            </div>
          )}
        </div>

        {/* End Call Button */}
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <PhoneOff className="w-4 h-4" />
            End Call & Back to Question
          </button>
        </div>
      </div>
    </div>
  );
};
