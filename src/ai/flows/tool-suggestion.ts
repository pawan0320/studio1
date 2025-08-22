'use server';

/**
 * @fileOverview AI chatbot assistant to suggest relevant AI/ML tools or approaches for a given problem.
 *
 * - suggestTools - A function that takes a problem description and returns suggested tools.
 * - ToolSuggestionInput - The input type for the suggestTools function.
 * - ToolSuggestionOutput - The return type for the suggestTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ToolSuggestionInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A description of the programming or security problem the user is facing.'),
});
export type ToolSuggestionInput = z.infer<typeof ToolSuggestionInputSchema>;

const ToolSuggestionOutputSchema = z.object({
  suggestedTools: z
    .string()
    .describe('A list of relevant AI/ML tools or approaches that could help solve the problem.'),
});
export type ToolSuggestionOutput = z.infer<typeof ToolSuggestionOutputSchema>;

export async function suggestTools(input: ToolSuggestionInput): Promise<ToolSuggestionOutput> {
  return suggestToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'toolSuggestionPrompt',
  input: {schema: ToolSuggestionInputSchema},
  output: {schema: ToolSuggestionOutputSchema},
  prompt: `You are an AI assistant that helps users find relevant AI/ML tools or approaches to solve their programming or security problems.

  Consider Pawan Sai Kodali's projects when suggesting tools.

  Problem Description: {{{problemDescription}}}

  Suggest relevant AI/ML tools or approaches:
  `,
});

const suggestToolsFlow = ai.defineFlow(
  {
    name: 'suggestToolsFlow',
    inputSchema: ToolSuggestionInputSchema,
    outputSchema: ToolSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
