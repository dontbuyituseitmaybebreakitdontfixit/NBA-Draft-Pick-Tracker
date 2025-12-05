import { GoogleGenAI } from "@google/genai";
import { AiAnalysisResponse, DraftPick, TradeType } from "../types";
import { TEAMS } from "../constants";

const apiKey = process.env.API_KEY || '';

// Initialize carefully - only if key exists to prevent immediate crash, though functionality will be limited
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize Gemini Client", e);
  }
}

export const analyzePickWithGemini = async (pick: DraftPick): Promise<AiAnalysisResponse> => {
  if (!ai) {
    return {
        analysis: "API Key missing. Please configure the environment to use AI features.",
        rating: "Neutral",
        stepienWarning: false
    };
  }

  const team = TEAMS[pick.originalOwnerId];
  const owner = pick.currentOwnerId ? TEAMS[pick.currentOwnerId] : team;

  const prompt = `
    You are an NBA expert analyst. Analyze this draft asset:
    Year: ${pick.year}
    Original Team: ${team.name}
    Current Status: ${pick.status}
    Current Owner: ${owner.name}
    Details: ${pick.details}

    Provide a concise 2-sentence analysis of this asset's value. 
    Is it a premium asset, neutral, or low value? 
    Does this potentially violate the Stepien Rule (trading consecutive future 1st rounders)?
    
    Return JSON: { "analysis": "string", "rating": "Asset" | "Liability" | "Neutral", "stepienWarning": boolean }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    
    return JSON.parse(text) as AiAnalysisResponse;

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      analysis: "Unable to generate AI analysis at this moment.",
      rating: "Neutral",
      stepienWarning: false
    };
  }
};

export const askGeneralQuestion = async (query: string): Promise<string> => {
    if (!ai) return "AI Service Unavailable (Missing API Key)";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: "You are an NBA Collective Bargaining Agreement (CBA) expert. Explain rules like the Stepien Rule concisely."
            }
        });
        return response.text || "No response generated.";
    } catch (e) {
        return "Error connecting to AI service.";
    }
}
