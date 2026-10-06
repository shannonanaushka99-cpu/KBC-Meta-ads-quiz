/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MetaStrategyReference {
  id: string;
  name: string;
  officialDescription: string;
  howItWorks: string;
  bestUsedFor: string[];
  tradeOff: string;
  keyRule: string;
  colorHex: string;
}

export const META_STRATEGIES_REFERENCE: MetaStrategyReference[] = [
  {
    id: 'highest-volume',
    name: 'Highest Volume',
    officialDescription: '"Get the most results for your budget."',
    howItWorks: 'Meta automatically bids to get the absolute highest number of conversions, leads, or link clicks possible while spending your entire daily/lifetime budget. It does not constrain the cost per conversion—it prioritizes volume over maintaining a specific cost efficiency.',
    bestUsedFor: [
      'Scaling campaigns quickly.',
      'Launches where your priority is maximum reach or volume rather than strict margin control.',
      "Broad prospecting campaigns where you want Meta's algorithm to operate with maximum flexibility."
    ],
    tradeOff: 'Conversion costs can fluctuate depending on competition in the auction.',
    keyRule: 'Guarantees budget delivery; does NOT guarantee uniform CPA.',
    colorHex: '#3b82f6'
  },
  {
    id: 'cost-per-result',
    name: 'Cost Per Result Goal',
    officialDescription: '"Aim for a certain cost per result while maximizing the volume of results."',
    howItWorks: 'You specify a target average cost per action (e.g., aiming for $15 per lead). Meta\'s algorithm bids dynamically in auctions to keep the overall average cost near or below that target, while still trying to spend your budget and get as many conversions as possible.',
    bestUsedFor: [
      'Performance marketing with strict target Cost Per Acquisition (CPA) limits.',
      'Maintaining predictable margins across long-running campaigns.'
    ],
    tradeOff: 'If your cost goal is set too low or unrealistically tight, Meta may struggle to enter auctions, resulting in under-spending or stalled ad delivery.',
    keyRule: 'Controls the overall AVERAGE cost across the entire campaign, not individual auctions.',
    colorHex: '#10b981'
  },
  {
    id: 'roas-goal',
    name: 'ROAS Goal (Return on Ad Spend)',
    officialDescription: '"Aim for a certain return on ad spend while maximizing the value of results."',
    howItWorks: 'Rather than focusing purely on the number of conversions, Meta optimizes for the total monetary value generated. You set a target return (e.g., $3.00 returned for every $1.00 spent, or a 300% ROAS), and Meta bids higher on users predicted to make higher-value purchases.',
    bestUsedFor: [
      'E-commerce businesses with varying product prices or large product catalogs.',
      'Optimizing for High Lifetime Value (LTV) or high Average Order Value (AOV) customers.'
    ],
    tradeOff: 'Requires robust purchase tracking with dynamic order values via the Meta Pixel or Conversions API (CAPI).',
    keyRule: 'Focuses on REVENUE and total cart value, not just raw volume of checkout events.',
    colorHex: '#8b5cf6'
  },
  {
    id: 'bid-cap',
    name: 'Bid Cap',
    officialDescription: '"Set the highest you want to bid in any auction."',
    howItWorks: 'Sets a strict maximum limit on how much Meta can bid in any single individual ad auction. Unlike "Cost per result goal" (which controls the overall average cost), Bid Cap is an absolute ceiling that Meta cannot cross in any auction.',
    bestUsedFor: [
      'Advanced media buyers who understand their exact margins and impression value.',
      'Controlling spend in highly competitive auction periods (e.g., Black Friday / Cyber Monday).'
    ],
    tradeOff: 'Extremely restrictive. If your bid cap is lower than market rates, your ads won\'t win auctions and campaign delivery will stop completely.',
    keyRule: 'Absolute HARD CEILING per individual auction. Can stall delivery to $0 if set under auction price.',
    colorHex: '#f59e0b'
  }
];
