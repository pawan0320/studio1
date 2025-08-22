
'use server';

import { suggestTools } from '@/ai/flows/tool-suggestion';
import type { z } from 'zod';

type ToolSuggestionInput = z.infer<typeof import('@/ai/flows/tool-suggestion').ToolSuggestionInput>;

export async function getToolSuggestion(input: ToolSuggestionInput) {
  try {
    const result = await suggestTools(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching tool suggestion:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `I'm sorry, I encountered an issue. ${errorMessage}` };
  }
}
