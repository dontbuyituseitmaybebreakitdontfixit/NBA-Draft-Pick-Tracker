export enum TradeType {
  OWN = 'OWN',
  TRADED = 'TRADED',
  SWAP = 'SWAP',
  CONDITIONAL = 'CONDITIONAL',
  SPLIT = 'SPLIT' // Complex scenario with multiple potential owners
}

export interface Team {
  id: string;
  city: string;
  name: string;
  abbrev: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface TradeDetail {
  toTeamId: string;
  type: TradeType;
  condition?: string;
  probability?: number; // For simulation
}

export interface DraftPick {
  year: number;
  round: 1 | 2;
  originalOwnerId: string;
  status: TradeType;
  currentOwnerId?: string; // If fully traded
  swapOptions?: string[]; // IDs of teams involved in swap
  splitOwners?: string[]; // IDs for complex conditional splits
  details: string; // Text description
  isStepienRisk?: boolean; // AI calculated risk
}

export interface AiAnalysisResponse {
  analysis: string;
  rating: 'Asset' | 'Liability' | 'Neutral';
  stepienWarning: boolean;
}

export interface TradeScenario {
  id: string;
  player: string;
  teamsInvolved: string[];
  description: string;
}