import React, { useState, useEffect, useMemo } from 'react';
import { TEAMS, YEARS } from './constants';
import { MAJOR_TRADES } from './assets/tradeScenarios';
import { DraftPick } from './types';
import TeamLogo from './components/TeamLogo';
import TeamRow from './components/TeamRow';
import AiModal from './components/AiModal';
import { askGeneralQuestion } from './services/geminiService';
import { fetchDraftData } from './services/googleSheetService';

type Tab = 'draft_picks' | 'trades' | string; // string will be teamId

const App: React.FC = () => {
  const [selectedPick, setSelectedPick] = useState<DraftPick | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('draft_picks');
  const [picksData, setPicksData] = useState<{ first: DraftPick[], second: DraftPick[] }>({ first: [], second: [] });
  const [loading, setLoading] = useState(true);

  // Load Data on Mount
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { firstRound, secondRound } = await fetchDraftData();
      setPicksData({ first: firstRound, second: secondRound });
      setLoading(false);
    };
    load();
  }, []);

  // Maps for efficient Grid rendering
  const picksMapFirst = useMemo(() => {
    const map = new Map<string, DraftPick>();
    picksData.first.forEach(pick => map.set(`${pick.originalOwnerId}-${pick.year}`, pick));
    return map;
  }, [picksData.first]);

  const picksMapSecond = useMemo(() => {
    const map = new Map<string, DraftPick>();
    picksData.second.forEach(pick => map.set(`${pick.originalOwnerId}-${pick.year}`, pick));
    return map;
  }, [picksData.second]);

  // Helper to get ALL picks relevant to a specific team (Incoming + Own) for the Summary View
  const getTeamAssets = (teamId: string) => {
    const assetsByYear: Record<number, { own: DraftPick[], incoming: DraftPick[] }> = {};
    
    YEARS.forEach(year => {
        assetsByYear[year] = { own: [], incoming: [] };
    });

    const processPick = (pick: DraftPick) => {
        if (!assetsByYear[pick.year]) return;

        // Is this my pick?
        if (pick.originalOwnerId === teamId) {
            assetsByYear[pick.year].own.push(pick);
        } 
        // Is this coming to me?
        else if (pick.currentOwnerId === teamId || pick.splitOwners?.includes(teamId)) {
            assetsByYear[pick.year].incoming.push(pick);
        }
        // Swap rights?
        else if (pick.swapOptions?.includes(teamId) && pick.originalOwnerId !== teamId) {
             assetsByYear[pick.year].incoming.push(pick);
        }
    };

    picksData.first.forEach(processPick);
    picksData.second.forEach(processPick);

    return assetsByYear;
  };

  const handleAiSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!searchQuery.trim()) return;
      
      setIsAskingAi(true);
      setAiAnswer(null);
      const answer = await askGeneralQuestion(searchQuery);
      setAiAnswer(answer);
      setIsAskingAi(false);
  };

  const renderMainGrid = () => (
    <div className="inline-block min-w-full align-middle">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-900/95 backdrop-blur z-20 sticky-row-header">
            <th scope="col" className="sticky-corner top-0 left-0 z-40 w-24 md:w-32 bg-slate-900 border-b border-r border-slate-700 p-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider shadow-lg">
              Team
            </th>
            {YEARS.map(year => (
              <th key={year} scope="col" className="sticky-col-header top-0 z-20 min-w-[100px] bg-slate-900 border-b border-slate-700 p-4 text-center text-sm font-bold text-slate-300">
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {Object.values(TEAMS).map((team) => (
            <TeamRow 
              key={team.id}
              team={team}
              years={YEARS}
              picksMap={picksMapFirst}
              secondaryPicksMap={picksMapSecond} // Triggers split view
              onPickClick={setSelectedPick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTradesContent = () => (
      <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
        {MAJOR_TRADES.map(trade => (
          <div key={trade.id} className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-800/80 p-6 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                 <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
                    {trade.player}
                 </h2>
                 <p className="text-slate-400 mt-1 ml-4 text-sm max-w-2xl">{trade.description}</p>
              </div>
              <div className="flex -space-x-2 ml-4">
                {trade.teamsInvolved.map(tid => (
                  <TeamLogo key={tid} teamId={tid} size="lg" className="ring-4 ring-slate-800" />
                ))}
              </div>
            </div>
            
            {/* Involved Rows */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                   <tr className="bg-slate-900/30">
                     <th className="w-24 md:w-32 p-2"></th>
                     {YEARS.map(year => (
                        <th key={year} className="p-2 text-center text-xs text-slate-500 font-mono">{year}</th>
                     ))}
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {trade.teamsInvolved.map(teamId => (
                    <TeamRow 
                      key={teamId}
                      team={TEAMS[teamId]}
                      years={YEARS}
                      picksMap={picksMapFirst}
                      onPickClick={setSelectedPick}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
  );

  const renderTeamView = (teamId: string) => {
    const team = TEAMS[teamId];
    if (!team) return null;
    const assets = getTeamAssets(teamId);

    return (
        <div className="flex flex-col h-full bg-nba-bg">
            {/* Single Team Row Grid */}
            <div className="overflow-x-auto border-b border-slate-700 bg-slate-900/20">
                 <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr>
                            <th className="w-24 md:w-32 bg-slate-900 border-r border-slate-800"></th>
                            {YEARS.map(year => (
                                <th key={year} className="p-2 text-center text-xs text-slate-500 font-mono bg-slate-900">{year}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <TeamRow 
                            team={team} 
                            years={YEARS} 
                            picksMap={picksMapFirst} 
                            secondaryPicksMap={picksMapSecond} 
                            onPickClick={setSelectedPick} 
                        />
                    </tbody>
                 </table>
            </div>

            {/* Asset Summary */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center mb-8">
                         <TeamLogo teamId={team.id} size="xl" className="mr-6 ring-4 ring-slate-800 shadow-xl" />
                         <div>
                             <h2 className="text-3xl font-bold text-white">{team.city} {team.name}</h2>
                             <p className="text-slate-400">Future Asset Summary</p>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {YEARS.map(year => {
                            const yearData = assets[year];
                            return (
                                <div key={year} className="bg-slate-800/40 rounded-lg border border-slate-700/50 p-4 hover:border-slate-600 transition-colors">
                                    <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-2 mb-3">{year}</h3>
                                    
                                    <div className="space-y-4">
                                        {/* OWN PICKS */}
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Outgoing / Status</span>
                                            {yearData.own.map(pick => (
                                                <div key={`${pick.round}-${pick.year}`} onClick={() => setSelectedPick(pick)} className="flex items-start space-x-2 mb-2 cursor-pointer hover:bg-slate-700/50 p-1 rounded">
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${pick.round === 1 ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-600/50 text-slate-300'}`}>
                                                        {pick.round === 1 ? 'R1' : 'R2'}
                                                    </span>
                                                    <p className="text-sm text-slate-300 leading-snug">{pick.details}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* INCOMING PICKS */}
                                        {yearData.incoming.length > 0 && (
                                            <div>
                                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider block mb-1">Incoming</span>
                                                {yearData.incoming.map((pick, idx) => (
                                                    <div key={idx} onClick={() => setSelectedPick(pick)} className="flex items-start space-x-2 mb-2 cursor-pointer hover:bg-slate-700/50 p-1 rounded bg-green-900/10 border border-green-900/30">
                                                        <TeamLogo teamId={pick.originalOwnerId} size="sm" className="w-5 h-5 text-[8px] mt-0.5" />
                                                        <div>
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`text-[10px] font-bold ${pick.round === 1 ? 'text-white' : 'text-slate-400'}`}>
                                                                    {pick.round === 1 ? '1st Round' : '2nd Round'}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-slate-400 leading-tight mt-0.5">{pick.details}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {yearData.incoming.length === 0 && (
                                            <div className="text-xs text-slate-600 italic">No incoming assets</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-nba-bg text-slate-200">
      
      {/* Navbar */}
      <header className="flex-none bg-slate-900 border-b border-nba-border shadow-lg z-50">
        <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center space-x-3 shrink-0">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded flex items-center justify-center font-bold text-white text-lg shadow-blue-500/20 shadow-lg">
                    H
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white hidden md:block">Hoops<span className="text-blue-500">Futures</span></h1>
            </div>

            {/* AI Search Bar */}
            <div className="flex-1 max-w-xl mx-4 relative hidden sm:block">
                <form onSubmit={handleAiSearch} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-9 pr-3 py-1.5 border border-slate-700 rounded-full leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-xs transition-all shadow-inner" 
                        placeholder="Ask AI about rules..." 
                    />
                </form>
                {/* AI Popover */}
                {(isAskingAi || aiAnswer) && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4 z-50">
                        {isAskingAi ? (
                            <div className="flex items-center space-x-2 text-sm text-blue-400">
                                <span className="animate-spin">●</span>
                                <span>Consulting CBA Database...</span>
                            </div>
                        ) : (
                            <div className="relative">
                                <button onClick={() => setAiAnswer(null)} className="absolute -top-2 -right-2 text-slate-400 hover:text-white">&times;</button>
                                <p className="text-sm text-slate-200 leading-relaxed">{aiAnswer}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto scrollbar-hide border-t border-slate-800">
            {/* Main Tabs */}
            <div className="flex shrink-0">
                <button 
                    onClick={() => setActiveTab('draft_picks')}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === 'draft_picks' ? 'border-blue-500 text-white bg-slate-800' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                >
                    Draft Picks
                </button>
                <button 
                    onClick={() => setActiveTab('trades')}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center space-x-2 ${activeTab === 'trades' ? 'border-purple-500 text-white bg-slate-800' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                >
                    <span>Major Trades</span>
                </button>
            </div>
            
            <div className="w-px h-6 bg-slate-700 mx-2 shrink-0"></div>

            {/* Team Tabs */}
            <div className="flex space-x-1 pr-6">
                {Object.values(TEAMS).sort((a,b) => a.id.localeCompare(b.id)).map(team => (
                    <button
                        key={team.id}
                        onClick={() => setActiveTab(team.id)}
                        className={`p-1.5 rounded-t-lg border-b-2 transition-all opacity-80 hover:opacity-100 hover:bg-slate-800 ${activeTab === team.id ? 'border-white opacity-100 bg-slate-800' : 'border-transparent grayscale hover:grayscale-0'}`}
                        title={`${team.city} ${team.name}`}
                    >
                        <TeamLogo teamId={team.id} size="sm" className="w-6 h-6 text-[8px]" />
                    </button>
                ))}
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative bg-nba-bg custom-scrollbar">
        {loading ? (
             <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-mono text-sm animate-pulse">Loading Asset Database...</p>
                </div>
             </div>
        ) : (
            <>
                {activeTab === 'draft_picks' && renderMainGrid()}
                {activeTab === 'trades' && renderTradesContent()}
                {activeTab !== 'draft_picks' && activeTab !== 'trades' && renderTeamView(activeTab)}
            </>
        )}
      </main>

      {/* Legend */}
      <footer className="flex-none bg-slate-900 border-t border-slate-800 p-2 text-[10px] text-slate-500 flex justify-between items-center z-50">
        <div className="flex items-center space-x-4 overflow-x-auto">
            <span className="flex items-center shrink-0"><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>Traded</span>
            <span className="flex items-center shrink-0"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>Swap</span>
            <span className="flex items-center shrink-0"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>Conditional/Split</span>
            <span className="flex items-center shrink-0 ml-4 border-l border-slate-700 pl-4">Top: 1st Round</span>
            <span className="flex items-center shrink-0">Bottom: 2nd Round</span>
        </div>
        <div className="flex space-x-2 shrink-0">
            <span>Powered by Gemini 2.5 Flash</span>
        </div>
      </footer>

      {/* Modal */}
      {selectedPick && (
        <AiModal pick={selectedPick} onClose={() => setSelectedPick(null)} />
      )}
    </div>
  );
};

export default App;