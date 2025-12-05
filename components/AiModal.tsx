import React, { useEffect, useState } from 'react';
import { DraftPick, AiAnalysisResponse, TradeType } from '../types';
import { analyzePickWithGemini } from '../services/geminiService';
import TeamLogo from './TeamLogo';

interface AiModalProps {
  pick: DraftPick | null;
  onClose: () => void;
}

const AiModal: React.FC<AiModalProps> = ({ pick, onClose }) => {
  const [data, setData] = useState<AiAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pick) {
      setLoading(true);
      setData(null);
      analyzePickWithGemini(pick).then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [pick]);

  if (!pick) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-nba-card border border-nba-border w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <div>
                <h3 className="text-white font-bold text-lg">{pick.year} First Round Pick</h3>
                <p className="text-slate-400 text-xs uppercase tracking-wider">{pick.status}</p>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
            
            {/* Visual Representation */}
            <div className="flex justify-center items-center space-x-6 p-4 bg-slate-900/50 rounded-lg">
                <div className="text-center">
                    <p className="text-xs text-slate-500 mb-2">ORIGINAL</p>
                    <TeamLogo teamId={pick.originalOwnerId} size="lg" />
                </div>
                
                {pick.status !== TradeType.OWN && (
                    <>
                        <div className="text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                        <div className="text-center">
                             <p className="text-xs text-slate-500 mb-2">RIGHTS</p>
                             {pick.splitOwners ? (
                                 <div className="flex -space-x-2">
                                     {pick.splitOwners.map(id => <TeamLogo key={id} teamId={id} size="md" />)}
                                 </div>
                             ) : (
                                <TeamLogo teamId={pick.currentOwnerId || pick.originalOwnerId} size="lg" />
                             )}
                        </div>
                    </>
                )}
            </div>

            {/* Details */}
            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                <p className="text-sm text-slate-300 font-mono leading-relaxed">{pick.details}</p>
            </div>

            {/* AI Analysis */}
            <div className="border-t border-slate-700 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-sm">GEMINI INSIGHTS</span>
                    {loading && <span className="text-xs text-slate-500 animate-pulse">Analyzing...</span>}
                </div>

                {loading ? (
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-700 rounded w-full animate-pulse"></div>
                        <div className="h-2 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                    </div>
                ) : data ? (
                    <div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">{data.analysis}</p>
                        
                        <div className="flex gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${data.rating === 'Asset' ? 'bg-green-900/30 border-green-500 text-green-400' : data.rating === 'Liability' ? 'bg-red-900/30 border-red-500 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                                Verdict: {data.rating}
                            </span>
                            {data.stepienWarning && (
                                <span className="px-2 py-1 rounded text-xs font-bold bg-red-900/30 border border-red-500 text-red-400 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    Stepien Risk
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-red-400">Analysis failed.</p>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default AiModal;
