/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  RotateCcw, 
  Lock, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Settings as SettingsIcon,
  Shield,
  HelpCircle
} from 'lucide-react';
import { 
  OptionKey, 
  Question, 
  GameStatus, 
  LifelinesState 
} from './types/game';
import { PRIMARY_QUESTIONS, FLIP_QUESTIONS, PRIZE_LADDER } from './data/questions';
import { kbcAudio } from './utils/audio';
import { KbcEmblem } from './components/KbcEmblem';
import { KbcQuestionBanner, KbcOptionButton } from './components/KbcLozenge';
import { LifelineBar } from './components/LifelineBar';
import { MoneyLadder } from './components/MoneyLadder';
import { AudiencePollModal } from './components/Modals/AudiencePollModal';
import { PhoneFriendModal } from './components/Modals/PhoneFriendModal';
import { ExplanationModal } from './components/Modals/ExplanationModal';
import { StudyGuideModal } from './components/Modals/StudyGuideModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { VictoryModal } from './components/Modals/VictoryModal';
import { GameOverModal } from './components/Modals/GameOverModal';

export default function App() {
  // Game questions state
  const [questions, setQuestions] = useState<Question[]>(PRIMARY_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [flipPool, setFlipPool] = useState<Question[]>(FLIP_QUESTIONS);

  // Status & selections
  const [status, setStatus] = useState<GameStatus>('WELCOME');
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<OptionKey[]>([]);

  // Lifelines
  const [lifelines, setLifelines] = useState<LifelinesState>({
    fiftyFifty: true,
    phoneFriend: true,
    audiencePoll: true,
    flipQuestion: true
  });

  // Modals
  const [showAudienceModal, setShowAudienceModal] = useState<boolean>(false);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false);
  const [showStudyGuideModal, setShowStudyGuideModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showLadderMobile, setShowLadderMobile] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  // Classroom settings
  const [contestantName, setContestantName] = useState<string>('Class Hot Seat');
  const [timerDuration, setTimerDuration] = useState<number>(45); // 45s default, 0 = untimed
  const [timeLeft, setTimeLeft] = useState<number | null>(45);
  const [soundMuted, setSoundMuted] = useState<boolean>(kbcAudio.isMuted());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isWalkAway, setIsWalkAway] = useState<boolean>(false);

  // Winnings calculation
  const currentQuestion = questions[currentIdx] || questions[0];

  // Calculate current banked safe haven amount
  const getGuaranteedSafeHaven = useCallback((): { amount: number; label: string } => {
    // Checkpoints: Q4 (₹1,60,000) and Q7 (₹12,50,000)
    if (currentIdx >= 7) {
      return { amount: 1250000, label: '₹12,50,000' };
    }
    if (currentIdx >= 4) {
      return { amount: 160000, label: '₹1,60,000' };
    }
    return { amount: 0, label: '₹0' };
  }, [currentIdx]);

  // Current won amount (if quit or active)
  const getCurrentWonAmount = useCallback((): { amount: number; label: string } => {
    if (currentIdx === 0) return { amount: 0, label: '₹0' };
    const prevTier = PRIZE_LADDER[currentIdx - 1];
    return { amount: prevTier.prize, label: prevTier.prizeLabel };
  }, [currentIdx]);

  // Timer effect ("Ghadiyal Babu" / Tik-Tiki)
  useEffect(() => {
    if (status !== 'QUESTION_ACTIVE' || timerDuration === 0) {
      return;
    }

    if (timeLeft === null) {
      setTimeLeft(timerDuration);
      return;
    }

    if (timeLeft <= 0) {
      // Time up! Lock as wrong or game over
      kbcAudio.playWrongBuzzer();
      setStatus('GAME_OVER');
      setIsWalkAway(false);
      setShowGameOverModal(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return timerDuration;
        if (prev <= 10 && prev > 0) {
          kbcAudio.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, timeLeft, timerDuration]);

  // Reset timer on new question
  const resetTimer = useCallback(() => {
    setTimeLeft(timerDuration > 0 ? timerDuration : null);
  }, [timerDuration]);

  // Start / Restart game
  const handleStartGame = () => {
    setQuestions(PRIMARY_QUESTIONS);
    setCurrentIdx(0);
    setFlipPool(FLIP_QUESTIONS);
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setIsCorrect(null);
    setEliminatedOptions([]);
    setLifelines({
      fiftyFifty: true,
      phoneFriend: true,
      audiencePoll: true,
      flipQuestion: true
    });
    setStatus('QUESTION_ACTIVE');
    setIsWalkAway(false);
    setShowGameOverModal(false);
    setShowVictoryModal(false);
    resetTimer();
    kbcAudio.playHeartbeat();
  };

  // Option selection
  const handleSelectOption = (key: OptionKey) => {
    if (status !== 'QUESTION_ACTIVE' || isAnswerLocked) return;
    setSelectedOption(key);
    kbcAudio.playHeartbeat();
  };

  // "Lock Kiya Jaye" (Lock Answer confirmation)
  const handleLockAnswer = () => {
    if (!selectedOption || isAnswerLocked) return;

    setIsAnswerLocked(true);
    setStatus('ANSWER_LOCKED');
    kbcAudio.playLockSound();

    // Dramatic 1.6s suspense stinger before revelation!
    setTimeout(() => {
      const correct = selectedOption === currentQuestion.correctOption;
      setIsCorrect(correct);
      setStatus('RESULT_REVEALED');

      if (correct) {
        // Correct answer!
        if (currentIdx === questions.length - 1) {
          // ₹7 Crore Jackpot victory!
          kbcAudio.playWinJackpot();
          setStatus('VICTORY');
          setShowVictoryModal(true);
        } else {
          kbcAudio.playCorrectFanfare();
        }
      } else {
        // Wrong answer!
        kbcAudio.playWrongBuzzer();
        setTimeout(() => {
          setStatus('GAME_OVER');
          setIsWalkAway(false);
          setShowGameOverModal(true);
        }, 1200);
      }
    }, 1600);
  };

  // Advance to next question
  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
      setIsCorrect(null);
      setEliminatedOptions([]);
      setStatus('QUESTION_ACTIVE');
      resetTimer();
      kbcAudio.playHeartbeat();
    }
  };

  // Lifeline: 50:50
  const handleUseFiftyFifty = () => {
    if (!lifelines.fiftyFifty || status !== 'QUESTION_ACTIVE') return;

    kbcAudio.playLifelineChime();
    setLifelines((prev) => ({ ...prev, fiftyFifty: false }));

    const correct = currentQuestion.correctOption;
    const incorrects = (['A', 'B', 'C', 'D'] as OptionKey[]).filter((k) => k !== correct);
    // Shuffle and pick 2 incorrect options to eliminate
    const shuffled = [...incorrects].sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    setEliminatedOptions(toEliminate);

    // If currently selected option was eliminated, deselect it
    if (selectedOption && toEliminate.includes(selectedOption)) {
      setSelectedOption(null);
    }
  };

  // Lifeline: Phone a Friend
  const handleUsePhoneFriend = () => {
    if (!lifelines.phoneFriend || status !== 'QUESTION_ACTIVE') return;
    kbcAudio.playLifelineChime();
    setLifelines((prev) => ({ ...prev, phoneFriend: false }));
    setShowPhoneModal(true);
  };

  // Lifeline: Audience Poll
  const handleUseAudiencePoll = () => {
    if (!lifelines.audiencePoll || status !== 'QUESTION_ACTIVE') return;
    kbcAudio.playLifelineChime();
    setLifelines((prev) => ({ ...prev, audiencePoll: false }));
    setShowAudienceModal(true);
  };

  // Lifeline: Flip / Switch Question
  const handleUseFlipQuestion = () => {
    if (!lifelines.flipQuestion || status !== 'QUESTION_ACTIVE' || flipPool.length === 0) return;

    kbcAudio.playLifelineChime();
    setLifelines((prev) => ({ ...prev, flipQuestion: false }));

    // Pick a replacement question from flipPool
    const [replacement, ...remaining] = flipPool;
    setFlipPool(remaining);

    // Swap current question while keeping current prize and question number
    const updatedQuestion: Question = {
      ...replacement,
      id: currentQuestion.id,
      prize: currentQuestion.prize,
      prizeLabel: currentQuestion.prizeLabel
    };

    const newQuestions = [...questions];
    newQuestions[currentIdx] = updatedQuestion;
    setQuestions(newQuestions);

    // Reset selection and eliminated state for the new question
    setSelectedOption(null);
    setEliminatedOptions([]);
    resetTimer();
  };

  // Quit / Walk Away
  const handleQuitGame = () => {
    if (status === 'WELCOME' || status === 'GAME_OVER' || status === 'VICTORY') return;

    const confirmed = window.confirm(
      `Are you sure you want to quit and take your safe banked winnings of ${getCurrentWonAmount().label}?`
    );
    if (confirmed) {
      kbcAudio.playHeartbeat();
      setIsWalkAway(true);
      setStatus('WALK_AWAY');
      setShowGameOverModal(true);
    }
  };

  // Fullscreen toggle for classroom smartboards/projectors
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Audio mute toggle
  const handleToggleSound = () => {
    const isMuted = kbcAudio.toggleMute();
    setSoundMuted(isMuted);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {/* Dynamic Studio Background Glow */}
      <div className="fixed inset-0 pointer-events-none kbc-studio-lighting z-0" />

      {/* Top Navigation & Lifelines Bar (visible during active play) */}
      {status !== 'WELCOME' && (
        <LifelineBar
          lifelines={lifelines}
          disabled={status !== 'QUESTION_ACTIVE'}
          currentPrizeLabel={currentQuestion.prizeLabel}
          timeLeft={timerDuration > 0 && status === 'QUESTION_ACTIVE' ? timeLeft : null}
          timerActive={status === 'QUESTION_ACTIVE'}
          soundMuted={soundMuted}
          isFullscreen={isFullscreen}
          onUseFiftyFifty={handleUseFiftyFifty}
          onUsePhoneFriend={handleUsePhoneFriend}
          onUseAudiencePoll={handleUseAudiencePoll}
          onUseFlipQuestion={handleUseFlipQuestion}
          onOpenPrizeLadder={() => setShowLadderMobile(true)}
          onQuitGame={handleQuitGame}
          onToggleSound={handleToggleSound}
          onToggleFullscreen={handleToggleFullscreen}
          onOpenStudyGuide={() => setShowStudyGuideModal(true)}
        />
      )}

      {/* MAIN VIEWPORT CONTAINER */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch justify-between w-full max-w-7xl mx-auto px-2 sm:px-4 py-3">
        {/* ========================================================= */}
        {/* VIEW 1: WELCOME SCREEN / CLASSROOM LOBBY                  */}
        {/* ========================================================= */}
        {status === 'WELCOME' ? (
          <div className="w-full flex flex-col items-center justify-center my-auto py-6 sm:py-10 px-4 text-center">
            {/* Medallion */}
            <div className="relative mb-4">
              <KbcEmblem size={220} className="hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-kbc-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]">
              KAUN BANEGA CROREPATI
            </h1>
            <p className="text-sm sm:text-lg font-kbc-display text-cyan-300 tracking-widest mt-2 uppercase">
              Meta Ad Bidding Master Challenge
            </p>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed">
              Answer 10 progressive high-stakes questions on Meta's 4 Bidding Strategies:
              <strong className="text-cyan-300"> Highest Volume</strong>,
              <strong className="text-emerald-300"> Cost Per Result Goal</strong>,
              <strong className="text-purple-300"> ROAS Goal</strong>, and
              <strong className="text-amber-300"> Bid Cap</strong>.
            </p>

            {/* Lobby Setup Card */}
            <div className="w-full max-w-md bg-slate-900/80 border border-blue-900/60 p-5 rounded-2xl shadow-[0_0_30px_rgba(30,58,138,0.4)] my-6 text-left space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Contestant / Class Team Name:
                </label>
                <input
                  type="text"
                  value={contestantName}
                  onChange={(e) => setContestantName(e.target.value)}
                  placeholder="e.g. Media Buyers Team, Period 4 Marketers"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Countdown Timer (Ghadiyal Babu):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '30s', val: 30 },
                    { label: '45s', val: 45 },
                    { label: '60s', val: 60 },
                    { label: 'Untimed', val: 0 }
                  ].map((t) => (
                    <button
                      key={t.val}
                      type="button"
                      onClick={() => setTimerDuration(t.val)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        timerDuration === t.val
                          ? 'bg-cyan-600 text-white border-cyan-300 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowStudyGuideModal(true)}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Study 4 Strategies
              </button>

              <button
                type="button"
                onClick={handleStartGame}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base sm:text-lg font-kbc-display tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                ENTER THE HOT SEAT
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: ACTIVE QUESTION ARENA & KBC STAGE                */
          /* ========================================================= */
          <div className="flex-1 flex flex-col justify-between items-center w-full max-w-4xl mx-auto py-2">
            {/* Central Background KBC Emblem (subtle watermarked backdrop) */}
            <div className="relative w-full flex items-center justify-center -mb-6 pointer-events-none select-none">
              <KbcEmblem size={170} subtle />
            </div>

            {/* Question Banner (The Pointed Hexagonal Lozenge) */}
            <KbcQuestionBanner
              questionNumber={currentIdx + 1}
              totalQuestions={questions.length}
              questionText={currentQuestion.question}
              category={currentQuestion.strategyCategory}
            />

            {/* 4 Options Grid (2x2 on desktop, matches user's screenshot layout) */}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 sm:gap-y-2 px-2 my-2">
              {(['A', 'B', 'C', 'D'] as OptionKey[]).map((key) => {
                const text = currentQuestion.options[key];
                const isEliminated = eliminatedOptions.includes(key);

                // Option State determination
                let state: 'default' | 'selected' | 'correct' | 'wrong' | 'eliminated' = 'default';

                if (isEliminated) {
                  state = 'eliminated';
                } else if (status === 'RESULT_REVEALED' || status === 'GAME_OVER' || status === 'VICTORY') {
                  if (key === currentQuestion.correctOption) {
                    state = 'correct';
                  } else if (key === selectedOption && !isCorrect) {
                    state = 'wrong';
                  }
                } else if (selectedOption === key) {
                  state = 'selected';
                }

                return (
                  <KbcOptionButton
                    key={key}
                    optionKey={key}
                    text={text}
                    state={state}
                    disabled={status !== 'QUESTION_ACTIVE'}
                    onClick={() => handleSelectOption(key)}
                  />
                );
              })}
            </div>

            {/* BOTTOM HOST ACTION DOCK ("Computer ji, lock kiya jaye!") */}
            <div className="w-full max-w-4xl min-h-[64px] flex flex-wrap items-center justify-between gap-3 px-3 py-2 my-2 rounded-xl bg-slate-950/70 border border-blue-900/40 backdrop-blur-xs">
              {/* Contestant Tag & Safe Haven hint */}
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300">
                  Safe Haven Payout: <strong className="text-amber-300">{getGuaranteedSafeHaven().label}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                {/* When an option is selected and waiting to lock */}
                {status === 'QUESTION_ACTIVE' && selectedOption && (
                  <button
                    type="button"
                    onClick={handleLockAnswer}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-kbc-display font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    LOCK OPTION ({selectedOption})
                  </button>
                )}

                {/* During suspense stinger beat */}
                {status === 'ANSWER_LOCKED' && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-950/60 border border-amber-500/50 text-amber-300 font-kbc-display text-xs sm:text-sm font-bold animate-pulse">
                    <Lock className="w-4 h-4" />
                    Computer ji, Option ({selectedOption}) ko lock kar diya hai...
                  </div>
                )}

                {/* When Answer is Revealed */}
                {status === 'RESULT_REVEALED' && (
                  <div className="flex items-center gap-2">
                    {/* View Explanation Button */}
                    <button
                      type="button"
                      onClick={() => setShowExplanationModal(true)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
                    >
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      Concept Notes
                    </button>

                    {/* Next Question (if correct) */}
                    {isCorrect && (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Money Ladder Sidebar (right column on desktop, matches image) */}
        {status !== 'WELCOME' && (
          <MoneyLadder
            currentQuestionIndex={currentIdx}
            isOpenMobile={showLadderMobile}
            onCloseMobile={() => setShowLadderMobile(false)}
          />
        )}
      </main>

      {/* QUIET FOOTER */}
      <footer className="relative z-10 w-full py-2.5 px-4 text-center border-t border-blue-950/60 bg-slate-950/90 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Kaun Banega Meta Crorepati · Classroom Media Buying Challenge</span>
        <div className="flex items-center gap-4 text-slate-400">
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Classroom Settings</span>
          </button>
          <button
            type="button"
            onClick={() => setShowStudyGuideModal(true)}
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Strategy Reference</span>
          </button>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Audience Poll Lifeline Modal */}
      <AudiencePollModal
        isOpen={showAudienceModal}
        onClose={() => setShowAudienceModal(false)}
        options={currentQuestion.options}
        simulatedWeights={currentQuestion.audienceWeights}
        eliminatedOptions={eliminatedOptions}
      />

      {/* 2. Phone A Friend Lifeline Modal */}
      <PhoneFriendModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        expertClue={currentQuestion.expertClue}
      />

      {/* 3. Concept Explanation / Teaching Notes Modal */}
      <ExplanationModal
        isOpen={showExplanationModal}
        onClose={() => setShowExplanationModal(false)}
        question={currentQuestion}
        wasCorrect={isCorrect ?? undefined}
        onNextQuestion={currentIdx < questions.length - 1 ? handleNextQuestion : undefined}
      />

      {/* 4. Meta Bidding Strategies Reference Sheet */}
      <StudyGuideModal
        isOpen={showStudyGuideModal}
        onClose={() => setShowStudyGuideModal(false)}
      />

      {/* 5. Classroom Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        timerDuration={timerDuration}
        onSetTimerDuration={(sec) => {
          setTimerDuration(sec);
          setTimeLeft(sec > 0 ? sec : null);
        }}
        soundEnabled={!soundMuted}
        onToggleSound={handleToggleSound}
        contestantName={contestantName}
        onSetContestantName={setContestantName}
      />

      {/* 6. Victory 7 Crore Modal */}
      <VictoryModal
        isOpen={showVictoryModal}
        teamName={contestantName}
        onPlayAgain={handleStartGame}
        onOpenStudyGuide={() => {
          setShowVictoryModal(false);
          setShowStudyGuideModal(true);
        }}
      />

      {/* 7. Game Over / Walk Away Modal */}
      <GameOverModal
        isOpen={showGameOverModal}
        teamName={contestantName}
        finalWinningsLabel={
          isWalkAway ? getCurrentWonAmount().label : getGuaranteedSafeHaven().label
        }
        isWalkAway={isWalkAway}
        questionsAnsweredCount={isCorrect ? currentIdx + 1 : currentIdx}
        onPlayAgain={handleStartGame}
        onOpenStudyGuide={() => {
          setShowGameOverModal(false);
          setShowStudyGuideModal(true);
        }}
      />
    </div>
  );
}
