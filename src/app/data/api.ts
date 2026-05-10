import type { CaseProfile, SentencePrediction } from "./mockData";

export interface ApiPrediction extends SentencePrediction {
  aiExplanation?: string;
  casesFound?: number;
  groupAverage?: number | null;
  comparisonAverage?: number | null;
  groupCount?: number;
  comparisonCount?: number;
  similarCases?: any[];
}

export async function predictSentenceFromAPI(
  profile: CaseProfile
): Promise<ApiPrediction> {
  const response = await fetch("http://localhost:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return response.json();
}