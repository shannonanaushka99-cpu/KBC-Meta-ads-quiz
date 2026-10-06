/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PrizeLevel, Question } from '../types/game';

export const PRIZE_LADDER: PrizeLevel[] = [
  { questionNumber: 1, prize: 5000, prizeLabel: '₹5,000', isSafeHaven: false },
  { questionNumber: 2, prize: 20000, prizeLabel: '₹20,000', isSafeHaven: false },
  { questionNumber: 3, prize: 80000, prizeLabel: '₹80,000', isSafeHaven: false },
  { questionNumber: 4, prize: 160000, prizeLabel: '₹1,60,000', isSafeHaven: true }, // Padav 1
  { questionNumber: 5, prize: 320000, prizeLabel: '₹3,20,000', isSafeHaven: false },
  { questionNumber: 6, prize: 640000, prizeLabel: '₹6,40,000', isSafeHaven: false },
  { questionNumber: 7, prize: 1250000, prizeLabel: '₹12,50,000', isSafeHaven: true }, // Padav 2
  { questionNumber: 8, prize: 2500000, prizeLabel: '₹25,00,000', isSafeHaven: false },
  { questionNumber: 9, prize: 5000000, prizeLabel: '₹50,00,000', isSafeHaven: false },
  { questionNumber: 10, prize: 70000000, prizeLabel: '₹7,00,00,000', isSafeHaven: true } // Jackpot 7 Crore
];

export const PRIMARY_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which Meta bidding strategy has the official description: \"Get the most results for your budget\"?",
    options: {
      A: "Cost Per Result Goal",
      B: "Bid Cap",
      C: "Highest Volume",
      D: "ROAS Goal"
    },
    correctOption: "C",
    prize: 5000,
    prizeLabel: "₹5,000",
    strategyCategory: "Highest Volume",
    officialQuote: 'Meta\'s Description: "Get the most results for your budget."',
    explanation: "Highest Volume is Meta's default volume-maximizing strategy. Meta automatically bids to get the highest number of conversions, leads, or link clicks while fully spending your daily or lifetime budget without setting a per-action cost ceiling.",
    tradeOff: "Conversion costs can fluctuate depending on competition in the auction.",
    expertClue: "Listen closely! The brief states word-for-word that 'Get the most results for your budget' is Meta's exact definition for Highest Volume!",
    audienceWeights: { A: 12, B: 6, C: 78, D: 4 }
  },
  {
    id: 2,
    question: "If an advertiser specifies a target average of $15 per lead to maintain predictable margins across long campaigns, which strategy are they using?",
    options: {
      A: "Highest Volume",
      B: "Cost Per Result Goal",
      C: "Bid Cap",
      D: "Maximum Reach Cap"
    },
    correctOption: "B",
    prize: 20000,
    prizeLabel: "₹20,000",
    strategyCategory: "Cost Per Result Goal",
    officialQuote: 'Meta\'s Description: "Aim for a certain cost per result while maximizing the volume of results."',
    explanation: "Cost Per Result Goal allows you to specify a target average cost per action (e.g. $15 per lead). Meta bids dynamically across auctions to keep the overall average cost near or below that target while still attempting to spend your budget.",
    tradeOff: "If your cost goal is set too low or unrealistically tight, Meta may struggle to enter auctions, resulting in under-spending or stalled delivery.",
    expertClue: "They want to maintain an AVERAGE target cost across the campaign. That is unequivocally 'Cost Per Result Goal'!",
    audienceWeights: { A: 8, B: 82, C: 7, D: 3 }
  },
  {
    id: 3,
    question: "What is the crucial operational difference between a 'Cost Per Result Goal' and a 'Bid Cap'?",
    options: {
      A: "Cost Per Result Goal controls daily budget; Bid Cap controls lifetime budget",
      B: "Cost Per Result targets an average cost, whereas Bid Cap is an absolute ceiling in any individual auction",
      C: "Bid Cap optimizes for total revenue value, while Cost Per Result only optimizes for clicks",
      D: "There is no difference; Meta uses both terms interchangeably"
    },
    correctOption: "B",
    prize: 80000,
    prizeLabel: "₹80,000",
    strategyCategory: "Comparative Strategy",
    officialQuote: 'Bid Cap sets a strict maximum limit in any single auction, unlike Cost Per Result which controls overall average cost.',
    explanation: "Cost Per Result Goal allows individual auctions to be won above or below your target as long as the cumulative average meets your goal. In contrast, Bid Cap is an unbreachable hard ceiling on every single individual auction.",
    tradeOff: "A Bid Cap set below market rate causes delivery to halt immediately, whereas a Cost Per Result Goal attempts dynamic bidding adjustments.",
    expertClue: "Remember the keyword: AVERAGE vs INDIVIDUAL AUCTION CEILING. Look at Option B!",
    audienceWeights: { A: 9, B: 79, C: 8, D: 4 }
  },
  {
    id: 4,
    question: "An e-commerce store with 500 catalog items priced from $10 to $500 wants Meta to bid higher on customers likely to make larger purchases. Which strategy is required?",
    options: {
      A: "Bid Cap",
      B: "Highest Volume",
      C: "ROAS Goal (Return on Ad Spend)",
      D: "Cost Per Result Goal"
    },
    correctOption: "C",
    prize: 160000,
    prizeLabel: "₹1,60,000",
    strategyCategory: "ROAS Goal",
    officialQuote: 'Meta\'s Description: "Aim for a certain return on ad spend while maximizing the value of results."',
    explanation: "ROAS Goal focuses on monetary value rather than raw conversion count. Meta dynamically raises bids on prospective buyers predicted to generate higher cart value, making it ideal for e-commerce with diverse catalog pricing.",
    tradeOff: "Requires robust purchase tracking with dynamic order values via Meta Pixel or Conversions API (CAPI).",
    expertClue: "The question highlights product catalog price variance ($10 to $500) and maximizing monetary value! That screams ROAS Goal!",
    audienceWeights: { A: 5, B: 11, C: 81, D: 3 }
  },
  {
    id: 5,
    question: "What mandatory technical tracking requirement must be active to successfully run a 'ROAS Goal' campaign?",
    options: {
      A: "A verified Facebook Business Page with 50,000+ likes",
      B: "Robust purchase tracking with dynamic order values via Meta Pixel or Conversions API (CAPI)",
      C: "A connected PayPal Business account with automated refunds",
      D: "Daily manual budget edits in Ads Manager"
    },
    correctOption: "B",
    prize: 320000,
    prizeLabel: "₹3,20,000",
    strategyCategory: "ROAS Goal",
    officialQuote: 'Trade-off: Requires robust purchase tracking with dynamic order values via the Meta Pixel or Conversions API.',
    explanation: "Because Meta optimizes for return on ad spend (revenue divided by ad spend), it must receive the exact monetary purchase values back from your store in real-time through the Meta Pixel or Conversions API (CAPI).",
    tradeOff: "Without passing actual purchase currency values, the algorithm cannot calculate or optimize for ROAS.",
    expertClue: "Think about how Meta knows the dollar value of a shopping cart—it needs dynamic order values via Pixel or CAPI!",
    audienceWeights: { A: 4, B: 86, C: 6, D: 4 }
  },
  {
    id: 6,
    question: "When prioritizing rapid scaling and maximum reach with 'Highest Volume', what primary trade-off must media buyers anticipate?",
    options: {
      A: "Meta will only deliver ads during overnight hours",
      B: "Conversion costs can fluctuate depending on competition in the auction",
      C: "The ad account will be banned if daily budget exceeds $1,000",
      D: "Meta will refuse to spend more than 50% of your allocated budget"
    },
    correctOption: "B",
    prize: 640000,
    prizeLabel: "₹6,40,000",
    strategyCategory: "Highest Volume",
    officialQuote: 'Trade-off: Conversion costs can fluctuate depending on competition in the auction.',
    explanation: "Highest Volume prioritizes spending your entire budget to capture the maximum volume of results. It does not enforce a cost-per-action limit, so during competitive auction peaks, your cost per conversion may rise significantly.",
    tradeOff: "Prioritizes volume over maintaining a specific cost efficiency.",
    expertClue: "Highest Volume has no cost ceiling, so when auction competition spikes, conversion costs naturally fluctuate!",
    audienceWeights: { A: 3, B: 84, C: 5, D: 8 }
  },
  {
    id: 7,
    question: "A performance marketer notices their ad campaign has completely stalled and is under-spending ($0 spent). Which bidding scenario most likely caused this?",
    options: {
      A: "Using Highest Volume on a broad prospecting audience",
      B: "Setting an unrealistically low Bid Cap or tight Cost Goal that cannot win auctions",
      C: "Using ROAS Goal with dynamic catalog integration enabled",
      D: "Targeting people in multiple time zones simultaneously"
    },
    correctOption: "B",
    prize: 1250000,
    prizeLabel: "₹12,50,000",
    strategyCategory: "Comparative Strategy",
    officialQuote: 'If your bid cap or cost goal is set too low or unrealistically tight, Meta struggles to enter auctions, resulting in under-spending or stalled ad delivery.',
    explanation: "Both Bid Cap and Cost Per Result Goal can suffocate delivery if the target is set below market rates. With Bid Cap, Meta is legally prohibited from bidding above the ceiling, halting impressions completely if market clearing prices are higher.",
    tradeOff: "Extremely restrictive bidding criteria will prevent Meta from participating in auctions.",
    expertClue: "If your bid is too low to enter the auction floor, you win zero impressions and spend zero dollars. Check Option B!",
    audienceWeights: { A: 7, B: 83, C: 6, D: 4 }
  },
  {
    id: 8,
    question: "During hyper-competitive auction surges like Black Friday / Cyber Monday, why do advanced media buyers specifically deploy 'Bid Cap'?",
    options: {
      A: "To force Meta to win 100% of all ad impressions regardless of cost",
      B: "To set an absolute ceiling and prevent paying unprofitable prices during intense bidding wars",
      C: "To bypass the Meta learning phase in under 6 hours",
      D: "To automatically generate promotional coupon codes on Instagram"
    },
    correctOption: "B",
    prize: 2500000,
    prizeLabel: "₹25,00,000",
    strategyCategory: "Bid Cap",
    officialQuote: 'Best Used For: Advanced media buyers who understand their exact margins and impression value; controlling spend in highly competitive auction periods (e.g., Black Friday / Cyber Monday).',
    explanation: "On Black Friday, auction competition skyrockets, driving CPMs to extreme highs. A Bid Cap protects profitability by guaranteeing that Meta will never bid higher than the advertiser's mathematical break-even threshold in any single auction.",
    tradeOff: "If your cap is set below the prevailing market rate, your ads won't win auctions and delivery stops.",
    expertClue: "Bid Cap serves as a strict financial shield against crazy holiday bidding wars by capping the maximum auction bid!",
    audienceWeights: { A: 10, B: 80, C: 6, D: 4 }
  },
  {
    id: 9,
    question: "Why does Meta classify 'Bid Cap' as best suited strictly for advanced media buyers?",
    options: {
      A: "Because it requires knowing coding languages like Python and SQL",
      B: "Because it requires understanding exact margins, conversion rates, and value per impression",
      C: "Because only ad accounts older than 10 years are permitted to use it",
      D: "Because it requires a minimum monthly spend of $500,000"
    },
    correctOption: "B",
    prize: 5000000,
    prizeLabel: "₹50,00,000",
    strategyCategory: "Bid Cap",
    officialQuote: 'Best Used For: Advanced media buyers who understand their exact margins and impression value.',
    explanation: "Setting an individual auction bid ceiling requires deep mathematical clarity on conversion rates, profit margins, and impression value. Setting it even slightly too low halts delivery entirely, while setting it too high defeats its purpose.",
    tradeOff: "Extremely restrictive nature makes it risky for novice media buyers.",
    expertClue: "The official guide explicitly highlights: 'Advanced media buyers who understand their exact margins and impression value.'",
    audienceWeights: { A: 5, B: 85, C: 6, D: 4 }
  },
  {
    id: 10,
    question: "A client states: \"We need Meta's algorithm to operate with maximum flexibility on broad prospecting, guaranteeing our entire $50,000 launch budget is spent to maximize reach.\" Which strategy MUST you run?",
    options: {
      A: "Bid Cap set at $3.50",
      B: "Cost Per Result Goal set at $12",
      C: "Highest Volume",
      D: "ROAS Goal set at 500%"
    },
    correctOption: "C",
    prize: 70000000,
    prizeLabel: "₹7,00,00,000",
    strategyCategory: "Highest Volume",
    officialQuote: 'Best Used For: Scaling campaigns quickly. Launches where your priority is maximum reach or volume rather than strict margin control. Broad prospecting campaigns where you want Meta\'s algorithm to operate with maximum flexibility.',
    explanation: "Highest Volume gives the algorithm complete auction flexibility to deploy 100% of the budget. It doesn't constrict bids with CPA goals or caps, ensuring maximum volume and broad audience delivery during critical launch phases.",
    tradeOff: "Conversion costs can fluctuate, but total delivery and budget exhaustion are guaranteed.",
    expertClue: "This is for the 7 CRORE jackpot! Look at the keywords: 'maximum flexibility', 'broad prospecting', 'entire launch budget spent'. That is the hallmark of Highest Volume!",
    audienceWeights: { A: 4, B: 6, C: 88, D: 2 }
  }
];

export const FLIP_QUESTIONS: Question[] = [
  {
    id: 101,
    question: "Which Meta bidding strategy has the official description: \"Set the highest you want to bid in any auction\"?",
    options: {
      A: "Highest Volume",
      B: "Bid Cap",
      C: "Cost Per Result Goal",
      D: "Target ROAS"
    },
    correctOption: "B",
    prize: 0,
    prizeLabel: "",
    strategyCategory: "Bid Cap",
    officialQuote: 'Meta\'s Description: "Set the highest you want to bid in any auction."',
    explanation: "Bid Cap is the only strategy that establishes an uncrossable ceiling on what Meta can bid in each individual auction.",
    tradeOff: "Extremely restrictive—if set lower than market rates, campaign delivery stops completely.",
    expertClue: "The exact words 'Set the highest you want to bid in any auction' belong solely to Bid Cap!",
    audienceWeights: { A: 5, B: 87, C: 5, D: 3 }
  },
  {
    id: 102,
    question: "If an advertiser aims for $3.00 returned for every $1.00 spent, what specific ROAS target are they configuring?",
    options: {
      A: "30% ROAS",
      B: "130% ROAS",
      C: "300% ROAS",
      D: "3000% ROAS"
    },
    correctOption: "C",
    prize: 0,
    prizeLabel: "",
    strategyCategory: "ROAS Goal",
    officialQuote: 'You set a target return (e.g., $3.00 returned for every $1.00 spent, or a 300% ROAS).',
    explanation: "$3.00 return on a $1.00 investment equals a 3.0x multiplier, which translates mathematically to 300% Return on Ad Spend (ROAS).",
    tradeOff: "Requires dynamic order value tracking via Pixel or CAPI.",
    expertClue: "$3 returned for $1 spent is 3x or 300%!",
    audienceWeights: { A: 3, B: 7, C: 87, D: 3 }
  },
  {
    id: 103,
    question: "Unlike 'Highest Volume' which optimizes purely for number of conversions, what does 'ROAS Goal' optimize for?",
    options: {
      A: "The highest number of video views under 3 seconds",
      B: "Total monetary value generated and high-order-value customers",
      C: "The lowest possible cost per thousand impressions (CPM)",
      D: "Organic engagement and post shares"
    },
    correctOption: "B",
    prize: 0,
    prizeLabel: "",
    strategyCategory: "ROAS Goal",
    officialQuote: 'Rather than focusing purely on the number of conversions, Meta optimizes for the total monetary value generated.',
    explanation: "ROAS Goal prioritizes revenue over transaction count, bidding higher for shoppers predicted to make larger cart purchases.",
    tradeOff: "Meta bids higher on high-value shoppers, which may result in fewer total purchases but greater revenue.",
    expertClue: "ROAS is about REVENUE and total cart value, not just counting orders!",
    audienceWeights: { A: 4, B: 88, C: 5, D: 3 }
  },
  {
    id: 104,
    question: "Under 'Highest Volume', what guarantee does Meta's algorithm provide regarding your campaign budget?",
    options: {
      A: "It guarantees cost per conversion will never change",
      B: "It aims to get the absolute highest number of results while spending your entire daily/lifetime budget",
      C: "It guarantees a minimum 400% Return on Ad Spend",
      D: "It guarantees refunding unspent funds if CPA rises"
    },
    correctOption: "B",
    prize: 0,
    prizeLabel: "",
    strategyCategory: "Highest Volume",
    officialQuote: 'Meta automatically bids to get the absolute highest number of conversions, leads, or link clicks possible while spending your entire daily/lifetime budget.',
    explanation: "Highest Volume commits to spending the entire allocated budget to maximize total actions, accepting cost fluctuations as auction competition shifts.",
    tradeOff: "Volume is prioritized over strict cost per result constraints.",
    expertClue: "The definition says it gets the highest number of results while spending your entire budget!",
    audienceWeights: { A: 6, B: 84, C: 6, D: 4 }
  }
];
