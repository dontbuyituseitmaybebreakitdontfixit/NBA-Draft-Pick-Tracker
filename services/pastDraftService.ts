
import { DraftPick, TradeType } from '../types';
import { PAST_DRAFTS_DATA } from '../assets/pastDraftsData';
import { PAST_YEARS, TEAMS } from '../constants';

export const fetchPastDraftData = async (): Promise<{ firstRound: DraftPick[], secondRound: DraftPick[] }> => {
    // In a real app, this might fetch from an API
    // Here we use the static data and fill in gaps
    const picks = fillMissingPastPicks(PAST_DRAFTS_DATA);
    
    // We mainly focus on Round 1 for history in this demo, but structure supports Round 2
    return {
        firstRound: picks.filter(p => p.round === 1),
        secondRound: picks.filter(p => p.round === 2)
    };
};

const fillMissingPastPicks = (existingPicks: DraftPick[]): DraftPick[] => {
    const picks = [...existingPicks];
    const lookup = new Set(existingPicks.map(p => `${p.originalOwnerId}-${p.year}-${p.round}`));
  
    // Only fill 1st round for past years to keep UI clean if data is missing
    Object.keys(TEAMS).forEach(teamId => {
      PAST_YEARS.forEach(year => {
        const round = 1; 
        const key = `${teamId}-${year}-${round}`;
        if (!lookup.has(key)) {
          picks.push({
            year,
            round: 1,
            originalOwnerId: teamId,
            status: TradeType.OWN,
            details: 'Player Name N/A',
            player: 'Selection Made' // Generic placeholder
          });
        }
      });
    });
  
    return picks;
};
