
'use server';

import { answerQuery } from '@/ai/flows/tool-suggestion';
import type { z } from 'zod';

type PortfolioQueryInput = z.infer<typeof import('@/ai/flows/tool-suggestion').PortfolioQueryInput>;

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
