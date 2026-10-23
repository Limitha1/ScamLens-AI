// Gemini AI Live Analysis Service for ScamLens AI
import { DEFAULT_ANALYSIS_DATA, SAMPLE_PRESETS } from '../data/mockData';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Candidate models in order of priority
const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest'
];

/**
 * Analyzes a recruitment/internship/scholarship message using live Google AI Studio Gemini API.
 * Falls back gracefully to heuristic matching if the network or API is temporarily unavailable.
 */
export async function analyzeMessageWithGemini(inputText) {
  if (!inputText || !inputText.trim()) {
    throw new Error('Please provide text to analyze.');
  }

  const prompt = `You are ScamLens AI, an expert cybersecurity and anti-fraud system for university students.
Analyze the following student internship, scholarship, or job offer message for scams, predatory upfront fees, phishing, and deceptive patterns.

Message to analyze:
"""
${inputText.trim()}
"""

Return a JSON object conforming strictly to this format:
{
  "risk_level": "High" | "Medium" | "Low",
  "risk_score": integer between 0 and 100,
  "category": string (e.g. "Fake Internship Offer", "Predatory Scholarship Scam", "Telegram Task Scam", "Verified Legitimate Offer"),
  "breakdown": {
    "urgency": integer between 0 and 100,
    "financialDemand": integer between 0 and 100,
    "domainAuthenticity": integer between 0 and 100,
    "senderCredibility": integer between 0 and 100
  },
  "flagged_text": [
    {
      "phrase": "exact matching substring from the message that is suspicious or a hook",
      "reason": "clear educational explanation why this phrase indicates fraud or risk"
    }
  ],
  "checklist": [
    "actionable verification step 1 for the student",
    "actionable verification step 2 for the student",
    "actionable verification step 3 for the student"
  ],
  "aiSummary": "2-3 concise sentences summarizing why this message is or isn't a threat and immediate advice for the student."
}
Only output valid JSON.`;

  // Try candidate models
  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (!response.ok) {
        console.warn(`Gemini model ${model} returned status ${response.status}`);
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText);

      // Validate core required fields
      if (typeof parsed.risk_score === 'number' && parsed.risk_level) {
        return {
          ...parsed,
          isLiveGemini: true,
          modelUsed: model
        };
      }
    } catch (err) {
      console.warn(`Error using Gemini model ${model}:`, err);
    }
  }

  // Graceful fallback to heuristic detection if API key fails or network drops
  console.info('Falling back to local heuristic detection engine.');
  return getLocalHeuristicAnalysis(inputText);
}

/**
 * Local heuristic fallback engine ensuring 100% uptime
 */
function getLocalHeuristicAnalysis(inputText) {
  // Check against predefined presets first
  for (const preset of SAMPLE_PRESETS) {
    if (preset.text.trim() === inputText.trim()) {
      return {
        ...preset.result,
        isLiveGemini: false,
        modelUsed: 'Heuristic Rule Engine'
      };
    }
  }

  const lower = inputText.toLowerCase();
  const hasFee = lower.includes("registration fee") || lower.includes("fee") || lower.includes("deposit") || lower.includes("pay") || lower.includes("cryptocurrency");
  const hasUrgency = lower.includes("today") || lower.includes("immediately") || lower.includes("urgent") || lower.includes("24 hours");
  const hasSelection = lower.includes("selected") || lower.includes("congratulations") || lower.includes("approved");

  if (hasFee || hasSelection || hasUrgency) {
    return {
      ...DEFAULT_ANALYSIS_DATA,
      isLiveGemini: false,
      modelUsed: 'Heuristic Rule Engine',
      flagged_text: [
        hasFee ? {
          phrase: "Pay the registration fee today",
          reason: "Legitimate employers and grant foundations never ask applicants to pay upfront security deposits."
        } : null,
        hasSelection ? {
          phrase: "Congratulations! You are selected.",
          reason: "Generic greetings and unprompted selections are common phishing hooks."
        } : null
      ].filter(Boolean)
    };
  }

  // Clean message fallback
  return {
    ...SAMPLE_PRESETS[3].result,
    isLiveGemini: false,
    modelUsed: 'Heuristic Rule Engine'
  };
}
