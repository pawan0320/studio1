
'use server';
/**
 * @fileOverview An AI agent for recognizing basic sign language gestures from images.
 *
 * - analyzeSignGesture - A function that analyzes a sign language gesture from an image.
 * - SignLanguageInput - The input type for the analyzeSignGesture function.
 * - SignLanguageOutput - The return type for the analyzeSignGesture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SignLanguageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a hand performing a sign, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SignLanguageInput = z.infer<typeof SignLanguageInputSchema>;

const SignLanguageOutputSchema = z.object({
  sign: z.string().describe("The recognized sign language gesture (e.g., 'A', 'B', 'Hello', 'Thank You', 'Open Hand', 'Pointing'). Be creative but realistic."),
  description: z.string().describe("A brief description of what the sign means or how it's formed."),
});
export type SignLanguageOutput = z.infer<typeof SignLanguageOutputSchema>;

export async function analyzeSignGesture(input: SignLanguageInput): Promise<SignLanguageOutput> {
  return signLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'signLanguagePrompt',
  input: {schema: SignLanguageInputSchema},
  output: {schema: SignLanguageOutputSchema},
  prompt: `You are a sign language recognition expert AI. Your task is to analyze the provided image of a hand and identify the sign language gesture being performed.

Focus on common, single-hand American Sign Language (ASL) gestures where possible. If the sign isn't clear or standard, describe it based on the hand shape (e.g., 'Open Hand', 'Closed Fist', 'Pointing Index Finger').

Analyze the image and determine the most likely sign. Provide a brief description of the sign.

Image: {{media url=photoDataUri}}
`,
});

const signLanguageFlow = ai.defineFlow(
  {
    name: 'signLanguageFlow',
    inputSchema: SignLanguageInputSchema,
    outputSchema: SignLanguageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
