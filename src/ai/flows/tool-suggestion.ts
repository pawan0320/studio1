'use server';

/**
 * @fileOverview AI chatbot assistant to answer questions about Pawan Sai Kodali.
 *
 * - answerQuery - A function that takes a user query and returns an answer.
 * - PortfolioQueryInput - The input type for the answerQuery function.
 * - PortfolioQueryOutput - The return type for the answerQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioQueryInputSchema = z.object({
  query: z
    .string()
    .describe('A user\'s question about Pawan Sai Kodali\'s skills, projects, resume, or background.'),
});
export type PortfolioQueryInput = z.infer<typeof PortfolioQueryInputSchema>;

const PortfolioQueryOutputSchema = z.object({
  answer: z
    .string()
    .describe('An answer to the user\'s question.'),
});
export type PortfolioQueryOutput = z.infer<typeof PortfolioQueryOutputSchema>;

export async function answerQuery(input: PortfolioQueryInput): Promise<PortfolioQueryOutput> {
  return portfolioQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioQueryPrompt',
  input: {schema: PortfolioQueryInputSchema},
  output: {schema: PortfolioQueryOutputSchema},
  prompt: `You are Pawan Sai Kodali's AI assistant. Your goal is to answer questions about his skills, projects, resume, and educational background based on the information provided in this portfolio.

  Keep your answers concise and helpful.

  User's Question: {{{query}}}

  Answer:
  `,
});

const portfolioQueryFlow = ai.defineFlow(
  {
    name: 'portfolioQueryFlow',
    inputSchema: PortfolioQueryInputSchema,
    outputSchema: PortfolioQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
