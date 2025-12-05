import React from 'react';
import { DraftPick, TradeType } from '../types';
import TeamLogo from './TeamLogo';

interface DraftCellProps {
  pick: DraftPick | undefined;
  teamId: string;
  year: number;
  onClick: (pick: DraftPick) => void;
  className?: string;
  showRoundLabel?: boolean;
}

const DraftCell: React.FC<DraftCellProps> = ({ pick, teamId, year, onClick, className = '', showRoundLabel = false }) => {
  // Default to OWN if no pick record exists
  const currentPick: DraftPick = pick || {
    year,
    round: 1, // Default, though context usually provides correct pick
    originalOwnerId: teamId,
    status: TradeType.OWN,
    details: 'Implied Own',
    isStepienRisk: false
  };

  const handleClick = () => onClick(currentPick);
  
  // Base classes for cell content layout
  const baseClasses = `w-full h-full flex flex-col items-center justify-center relative transition-all cursor-pointer group overflow-hidden ${className}`;

  // Helper to render Round Label
  const RoundLabel = () => (
    showRoundLabel ? (
        <span className="absolute top-0.5 right-1 text-[8px] font-mono text-slate-500 opacity-50">{currentPick.round === 1 ? '1st' : '2nd'}</span>
    ) : null
  );

  // -- Render Logic based on Status --

  // 1. TRADED OUT
  if (currentPick.status === TradeType.TRADED && currentPick.currentOwnerId) {
    return (
      <div onClick={handleClick} className={`${baseClasses} bg-red-900/20 border-l-2 border-l-red-500 hover:bg-red-900/30`}>
        <RoundLabel />
        <span className="text-[9px] font-bold text-red-400 mb-0.5 tracking-wider uppercase scale-90">Outgoing</span>
        <TeamLogo teamId={currentPick.currentOwnerId} size="sm" />
        {currentPick.isStepienRisk && (
           <div className="absolute top-1 left-1 text-red-500 animate-pulse" title="Stepien Risk">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
           </div>
        )}
      </div>
    );
  }

  // 2. SWAP
  if (currentPick.status === TradeType.SWAP && currentPick.swapOptions) {
    return (
      <div onClick={handleClick} className={`${baseClasses} bg-orange-900/20 border-l-2 border-l-orange-500 hover:bg-orange-900/30`}>
        <RoundLabel />
        <span className="text-[9px] text-orange-400 font-bold mb-0.5 scale-90">SWAP</span>
        <div className="flex items-center justify-center -space-x-1.5">
            {currentPick.swapOptions.map(id => (
                <TeamLogo key={id} teamId={id} size="sm" className="w-5 h-5 text-[8px] ring-1 ring-nba-card" />
            ))}
        </div>
      </div>
    );
  }

  // 3. SPLIT / CONDITIONAL
  if (currentPick.status === TradeType.SPLIT && currentPick.splitOwners) {
     const isTwo = currentPick.splitOwners.length === 2;
     return (
      <div onClick={handleClick} className={`${baseClasses} bg-purple-900/20 border-l-2 border-l-purple-500 hover:bg-purple-900/30`}>
        <RoundLabel />
        <span className="absolute top-0.5 left-0.5 text-[8px] text-purple-300 font-mono z-10 scale-75 origin-top-left">COND</span>
        
        {isTwo ? (
            <div className="flex items-center justify-around w-full pt-1">
                 <div className="flex flex-col items-center scale-90">
                    <TeamLogo teamId={currentPick.splitOwners[0]} size="sm" className="w-5 h-5 text-[8px]" />
                 </div>
                 <div className="h-6 w-px bg-purple-500/30"></div>
                 <div className="flex flex-col items-center scale-90">
                    <TeamLogo teamId={currentPick.splitOwners[1]} size="sm" className="w-5 h-5 text-[8px]" />
                 </div>
            </div>
        ) : (
            <div className="flex flex-wrap justify-center gap-0.5 w-full px-1 pt-2">
                 {currentPick.splitOwners.slice(0, 3).map((id) => (
                     <TeamLogo key={id} teamId={id} size="sm" className="w-4 h-4 text-[6px]" />
                 ))}
            </div>
        )}
      </div>
    );
  }

  // 4. CONDITIONAL (Standard)
  if (currentPick.status === TradeType.CONDITIONAL) {
       return (
      <div onClick={handleClick} className={`${baseClasses} bg-yellow-900/10 border-l-2 border-l-yellow-600 hover:bg-yellow-900/20`}>
        <RoundLabel />
        <span className="text-[8px] text-yellow-500 font-bold mb-0.5 uppercase scale-90">Prot.</span>
        <div className="flex items-center space-x-1 opacity-80 scale-90">
            <TeamLogo teamId={teamId} size="sm" className="grayscale opacity-50 w-5 h-5 text-[8px]" />
            <span className="text-yellow-500 text-[8px]">➜</span>
            <TeamLogo teamId={currentPick.currentOwnerId || teamId} size="sm" className="w-5 h-5 text-[8px]" />
        </div>
      </div>
    );
  }

  // 5. OWN (Standard)
  return (
    <div onClick={handleClick} className={`${baseClasses} bg-slate-800/30 hover:bg-slate-700/50`}>
        <RoundLabel />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-800 group-hover:text-slate-700 transition-colors select-none">{year % 100}</span>
        </div>
        <TeamLogo teamId={teamId} size="sm" className="opacity-20 group-hover:opacity-100 transition-opacity w-8 h-8 text-[10px]" />
    </div>
  );
};

export default DraftCell;