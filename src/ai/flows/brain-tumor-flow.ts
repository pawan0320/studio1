'use server';
/**
 * @fileOverview An AI agent for classifying brain tumors from MRI scans.
 *
 * - classifyBrainTumor - A function that classifies a brain tumor from an image.
 * - BrainTumorInput - The input type for the classifyBrainTumor function.
 * - BrainTumorOutput - The return type for the classifyBrainTumor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BrainTumorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a brain MRI, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type BrainTumorInput = z.infer<typeof BrainTumorInputSchema>;

const BrainTumorOutputSchema = z.object({
  classification: z.enum(["glioma", "meningioma", "pituitary", "no tumor"]).describe("The classification of the tumor, or 'no tumor' if none is detected."),
  confidence: z.number().min(0).max(1).describe("The confidence score of the classification, from 0 to 1."),
  analysis: z.string().describe("A brief analysis of the findings from the MRI scan.")
});
export type BrainTumorOutput = z.infer<typeof BrainTumorOutputSchema>;

export async function classifyBrainTumor(input: BrainTumorInput): Promise<BrainTumorOutput> {
  return brainTumorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'brainTumorPrompt',
  input: {schema: BrainTumorInputSchema},
  output: {schema: BrainTumorOutputSchema},
  prompt: `You are a medical imaging AI specialist. Your task is to analyze the provided brain MRI scan and classify the type of tumor present.

The possible classifications are: "glioma", "meningioma", "pituitary", or "no tumor".

Analyze the image provided and determine the most likely classification. Provide a confidence score for your determination and a brief, professional analysis of what you see in the scan to support your conclusion.

Image: {{media url=photoDataUri}}`,
});

const brainTumorFlow = ai.defineFlow(
  {
    name: 'brainTumorFlow',
    inputSchema: BrainTumorInputSchema,
    outputSchema: BrainTumorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
