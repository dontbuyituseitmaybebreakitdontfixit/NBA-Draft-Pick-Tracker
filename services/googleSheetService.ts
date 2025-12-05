import { DraftPick, TradeType } from '../types';
import { GOOGLE_SHEET_CSV_URL, YEARS, TEAMS } from '../constants';
import { MOCK_CSV_DATA } from '../assets/mockData';

export const fetchDraftData = async (): Promise<{ firstRound: DraftPick[], secondRound: DraftPick[] }> => {
  let csvText = '';

  if (GOOGLE_SHEET_CSV_URL) {
    try {
      const response = await fetch(GOOGLE_SHEET_CSV_URL);
      if (response.ok) {
        csvText = await response.text();
      } else {
        console.warn('Failed to fetch from Google Sheet, falling back to mock data.');
        csvText = MOCK_CSV_DATA;
      }
    } catch (e) {
      console.error('Error fetching CSV:', e);
      csvText = MOCK_CSV_DATA;
    }
  } else {
    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 600));
    csvText = MOCK_CSV_DATA;
  }

  const allPicks = parseCSV(csvText);

  // If the CSV is missing entries for certain Year/Team combos (e.g., standard "Own" picks),
  // we should fill them in to ensure the grid is complete.
  // This helps keep the spreadsheet clean (only list trades).
  const filledPicks = fillMissingOwnPicks(allPicks);

  return {
    firstRound: filledPicks.filter(p => p.round === 1),
    secondRound: filledPicks.filter(p => p.round === 2)
  };
};

const parseCSV = (csvText: string): DraftPick[] => {
  const lines = csvText.split('\n');
  const picks: DraftPick[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV split (assumes no commas in fields, which is risky but fine for this controlled data)
    // A robust regex or library is better for production
    const cols = line.split(','); 
    
    // Schema: Year, Round, OriginalTeam, Status, CurrentOwner, RelatedTeams, Details, StepienRisk
    if (cols.length < 3) continue;

    const year = parseInt(cols[0]);
    const round = parseInt(cols[1]) as 1 | 2;
    const originalOwnerId = cols[2].trim();
    const status = (cols[3]?.trim() as TradeType) || TradeType.OWN;
    const currentOwnerId = cols[4]?.trim() || undefined;
    const relatedTeamsStr = cols[5]?.trim() || '';
    const details = cols[6]?.trim() || `Own ${round === 1 ? '1st' : '2nd'} Round Pick`;
    const isStepienRisk = cols[7]?.trim().toLowerCase() === 'true';

    // Parse Related Teams (pipe separated for swaps/splits)
    let swapOptions: string[] | undefined;
    let splitOwners: string[] | undefined;

    if (status === TradeType.SWAP && relatedTeamsStr) {
        swapOptions = relatedTeamsStr.split('|').map(s => s.trim());
    } else if (status === TradeType.SPLIT && relatedTeamsStr) {
        splitOwners = relatedTeamsStr.split('|').map(s => s.trim());
    }

    picks.push({
      year,
      round,
      originalOwnerId,
      status,
      currentOwnerId,
      swapOptions,
      splitOwners,
      details,
      isStepienRisk
    });
  }

  return picks;
};

const fillMissingOwnPicks = (existingPicks: DraftPick[]): DraftPick[] => {
  const picks = [...existingPicks];
  const lookup = new Set(existingPicks.map(p => `${p.originalOwnerId}-${p.year}-${p.round}`));

  Object.keys(TEAMS).forEach(teamId => {
    YEARS.forEach(year => {
      [1, 2].forEach(round => {
        const key = `${teamId}-${year}-${round}`;
        if (!lookup.has(key)) {
          picks.push({
            year,
            round: round as 1 | 2,
            originalOwnerId: teamId,
            status: TradeType.OWN,
            details: `Own ${round === 1 ? '1st' : '2nd'} Round Pick`
          });
        }
      });
    });
  });

  return picks;
};
