'use server';

import { answerQuery, type PortfolioQueryInput } from '@/ai/flows/tool-suggestion';
import { recommendCrop, type CropRecommendationInput } from '@/ai/flows/crop-recommendation';
import { classifyBrainTumor, type BrainTumorInput } from '@/ai/flows/brain-tumor-flow';
import { analyzeHandGesture, type HandGestureInput } from '@/ai/flows/hand-gesture-flow';
import { getStockPrediction, type StockPredictionInput } from '@/ai/flows/stock-prediction-flow';
import { analyzeSignGesture, type SignLanguageInput } from '@/ai/flows/sign-language-flow';
import { analyzeMolecule, type MoleculeAnalysisInput } from '@/ai/flows/drug-discovery-flow';
import { analyzeSymptoms, type MedicalSymptomInput } from '@/ai/flows/medical-symptom-flow';

export async function getPortfolioAnswer(input: PortfolioQueryInput) {
  try {
    const result = await answerQuery(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching portfolio answer:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `AI Error: ${errorMessage}` };
  }
}

export async function getCropRecommendation(input: CropRecommendationInput) {
  try {
    const result = await recommendCrop(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching crop recommendation:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `AI Error: ${errorMessage}` };
  }
}

export async function getBrainTumorClassification(input: BrainTumorInput) {
  try {
    const result = await classifyBrainTumor(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching brain tumor classification:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `AI Error: ${errorMessage}` };
  }
}

export async function getHandGestureAnalysis(input: HandGestureInput) {
  try {
    const result = await analyzeHandGesture(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching hand gesture analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `AI Error: ${errorMessage}` };
  }
}

export async function getStockPredictionAnalysis(input: StockPredictionInput) {
  try {
    const result = await getStockPrediction(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching stock prediction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `AI Error: ${errorMessage}` };
  }
}

export async function getSignLanguageAnalysis(input: SignLanguageInput) {
    try {
        const result = await analyzeSignGesture(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching sign language analysis:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `AI Error: ${errorMessage}` };
    }
}

export async function getMoleculeAnalysis(input: MoleculeAnalysisInput) {
    try {
        const result = await analyzeMolecule(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching molecule analysis:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `AI Error: ${errorMessage}` };
    }
}

export async function getSymptomAnalysis(input: MedicalSymptomInput) {
    try {
        const result = await analyzeSymptoms(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching symptom analysis:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `AI Error: ${errorMessage}` };
    }
}
