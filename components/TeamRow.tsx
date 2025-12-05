import React from 'react';
import { Team, DraftPick } from '../types';
import TeamLogo from './TeamLogo';
import DraftCell from './DraftCell';

interface TeamRowProps {
  team: Team;
  years: number[];
  picksMap: Map<string, DraftPick>;
  secondaryPicksMap?: Map<string, DraftPick>; // Optional 2nd round map
  onPickClick: (pick: DraftPick) => void;
  showTeamLabel?: boolean;
}

const TeamRow: React.FC<TeamRowProps> = ({ team, years, picksMap, secondaryPicksMap, onPickClick, showTeamLabel = true }) => {
  return (
    <tr className="hover:bg-slate-800/30 transition-colors">
      {showTeamLabel && (
        <td className="sticky-row-header left-0 z-30 w-24 md:w-32 bg-nba-bg border-r border-slate-800 p-2 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.5)]">
          <div className="flex items-center space-x-3">
            <TeamLogo teamId={team.id} />
            <div className="hidden md:block text-left">
              <div className="font-bold text-white text-sm">{team.abbrev}</div>
            </div>
          </div>
        </td>
      )}

      {years.map(year => {
        const firstPick = picksMap.get(`${team.id}-${year}`);
        const secondPick = secondaryPicksMap?.get(`${team.id}-${year}`);
        
        // If secondaryPicksMap is provided, we do the split view
        if (secondaryPicksMap) {
            return (
                <td key={year} className="p-0.5 h-32 border-b border-slate-800/50 relative min-w-[100px]">
                    <div className="flex flex-col h-full w-full rounded overflow-hidden border border-slate-700/30">
                        {/* First Round - Top Half */}
                        <div className="h-1/2 w-full border-b border-slate-700/50 bg-slate-800/10">
                            <DraftCell 
                                pick={firstPick} 
                                teamId={team.id} 
                                year={year} 
                                onClick={onPickClick}
                                showRoundLabel={false} // Clean look, top is implicitly 1st
                                className="hover:brightness-110"
                            />
                        </div>
                        {/* Second Round - Bottom Half - Slightly Darker/Tinted */}
                        <div className="h-1/2 w-full bg-slate-900/40">
                             <DraftCell 
                                pick={secondPick} 
                                teamId={team.id} 
                                year={year} 
                                onClick={onPickClick}
                                showRoundLabel={false}
                                className="hover:brightness-110"
                            />
                        </div>
                    </div>
                </td>
            );
        }

        // Standard Single View (for Trade Summaries or other views)
        return (
          <td key={year} className="p-1 h-20 border-b border-slate-800/50 relative">
            <DraftCell 
              pick={firstPick} 
              teamId={team.id} 
              year={year} 
              onClick={onPickClick}
            />
          </td>
        );
      })}
    </tr>
  );
};

export default TeamRow;