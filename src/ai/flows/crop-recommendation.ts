
'use server';
/**
 * @fileOverview An AI agent for recommending crops.
 *
 * - recommendCrop - A function that recommends a crop based on input data.
 * - CropRecommendationInput - The input type for the recommendCrop function.
 * - CropRecommendationOutput - The return type for the recommendCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationInputSchema = z.object({
  nitrogen: z.number().describe("The ratio of Nitrogen content in the soil (kg/ha)."),
  phosphorus: z.number().describe("The ratio of Phosphorus content in the soil (kg/ha)."),
  potassium: z.number().describe("The ratio of Potassium content in the soil (kg/ha)."),
  temperature: z.number().describe("The temperature in degrees Celsius."),
  humidity: z.number().describe("The relative humidity in %."),
  ph: z.number().describe("The pH value of the soil."),
  rainfall: z.number().describe("The rainfall in mm/month."),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const CropRecommendationOutputSchema = z.object({
  crop: z.string().describe("The recommended crop to plant."),
  reasoning: z.string().describe("A brief explanation for the recommendation."),
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;

export async function recommendCrop(input: CropRecommendationInput): Promise<CropRecommendationOutput> {
  return cropRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationPrompt',
  input: {schema: CropRecommendationInputSchema},
  output: {schema: CropRecommendationOutputSchema},
  prompt: `You are an expert agronomist. Your task is to recommend the best crop to plant based on the provided soil and weather conditions.
  
  Analyze the following data:
  - Nitrogen: {{{nitrogen}}} kg/ha
  - Phosphorus: {{{phosphorus}}} kg/ha
  - Potassium: {{{potassium}}} kg/ha
  - Temperature: {{{temperature}}}°C
  - Humidity: {{{humidity}}}%
  - pH: {{{ph}}}
  - Rainfall: {{{rainfall}}} mm/month
  
  Based on this data, provide a single, specific crop recommendation. For example: "Rice", "Maize", "Jute", "Cotton", "Coconut", "Papaya", etc. Also provide a short reasoning for your choice.`,
});

const cropRecommendationFlow = ai.defineFlow(
  {
    name: 'cropRecommendationFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
