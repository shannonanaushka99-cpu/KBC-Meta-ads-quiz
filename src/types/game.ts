/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type MetaStrategyType = 
  | 'Highest Volume'
  | 'Cost Per Result Goal'
  | 'ROAS Goal'
  | 'Bid Cap'
  | 'Comparative Strategy';

export interface Question {
  id: number;
  question: string;
  options: Record<OptionKey, string>;
  correctOption: OptionKey;
  prize: number;
  prizeLabel: string;
  strategyCategory: MetaStrategyType;
  officialQuote: string;
  explanation: string;
  tradeOff: string;
  expertClue: string;
  audienceWeights: Record<OptionKey, number>;
}

export interface PrizeLevel {
  questionNumber: number;
  prize: number;
  prizeLabel: string;
  isSafeHaven: boolean; // Padav (checkpoint where winnings are locked)
}

export interface LifelinesState {
  fiftyFifty: boolean;
  phoneFriend: boolean;
  audiencePoll: boolean;
  flipQuestion: boolean;
}

export type GameStatus = 
  | 'WELCOME'
  | 'QUESTION_ACTIVE'
  | 'ANSWER_LOCKED'
  | 'RESULT_REVEALED'
  | 'WALK_AWAY'
  | 'GAME_OVER'
  | 'VICTORY';

export interface TeamScore {
  name: string;
  winnings: number;
  winningsLabel: string;
  questionsAnswered: number;
}
