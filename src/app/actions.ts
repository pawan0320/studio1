
'use server';

import { answerQuery } from '@/ai/flows/tool-suggestion';
import { recommendCrop } from '@/ai/flows/crop-recommendation';
import { classifyBrainTumor } from '@/ai/flows/brain-tumor-flow';
import { analyzeHandGesture } from '@/ai/flows/hand-gesture-flow';
import { getStockPrediction } from '@/ai/flows/stock-prediction-flow';
import { analyzeSignGesture } from '@/ai/flows/sign-language-flow';
import type { z } from 'zod';

type PortfolioQueryInput = z.infer<typeof import('@/ai/flows/tool-suggestion').PortfolioQueryInput>;
type CropRecommendationInput = z.infer<typeof import('@/ai/flows/crop-recommendation').CropRecommendationInput>;
type BrainTumorInput = z.infer<typeof import('@/ai/flows/brain-tumor-flow').BrainTumorInput>;
type HandGestureInput = z.infer<typeof import('@/ai/flows/hand-gesture-flow').HandGestureInput>;
type StockPredictionInput = z.infer<typeof import('@/ai/flows/stock-prediction-flow').StockPredictionInput>;
type SignLanguageInput = z.infer<typeof import('@/ai/flows/sign-language-flow').SignLanguageInput>;


export async function getPortfolioAnswer(input: PortfolioQueryInput) {
  try {
    const result = await answerQuery(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching portfolio answer:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
  }
}

export async function getCropRecommendation(input: CropRecommendationInput) {
  try {
    const result = await recommendCrop(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching crop recommendation:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
  }
}

export async function getBrainTumorClassification(input: BrainTumorInput) {
  try {
    const result = await classifyBrainTumor(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching brain tumor classification:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
  }
}


export async function getHandGestureAnalysis(input: HandGestureInput) {
  try {
    const result = await analyzeHandGesture(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching hand gesture analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
  }
}

export async function getStockPredictionAnalysis(input: StockPredictionInput) {
  try {
    const result = await getStockPrediction(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching stock prediction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
  }
}

export async function getSignLanguageAnalysis(input: SignLanguageInput) {
    try {
        const result = await analyzeSignGesture(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching sign language analysis:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
    }
}
