'use server';
/**
 * @fileOverview An AI agent for providing a preliminary analysis of medical symptoms.
 *
 * - analyzeSymptoms - A function that analyzes user-provided symptoms.
 * - MedicalSymptomInput - The input type for the analyzeSymptoms function.
 * - MedicalSymptomOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalSymptomInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A comma-separated list of symptoms provided by the user (e.g., "fever, cough, headache").'),
   age: z.number().int().describe("The user's age."),
   sex: z.string().describe("The user's biological sex (e.g., 'male', 'female')."),
});
export type MedicalSymptomInput = z.infer<typeof MedicalSymptomInputSchema>;

const MedicalSymptomOutputSchema = z.object({
  probable_conditions: z.array(z.object({
    condition: z.string().describe("A potential medical condition matching the symptoms."),
    confidence: z.number().min(0).max(1).describe("A confidence score (0 to 1) for this condition."),
  })).describe("A list of probable conditions based on the symptoms."),
  risk_level: z.enum(["low", "medium", "high", "emergency"]).describe("An assessed risk level based on the symptoms."),
  advice: z.string().describe("Actionable advice for the user, including when to seek medical attention. This should always include a disclaimer."),
});
export type MedicalSymptomOutput = z.infer<typeof MedicalSymptomOutputSchema>;

export async function analyzeSymptoms(input: MedicalSymptomInput): Promise<MedicalSymptomOutput> {
  return medicalSymptomFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalSymptomPrompt',
  input: {schema: MedicalSymptomInputSchema},
  output: {schema: MedicalSymptomOutputSchema},
  prompt: `You are an AI Medical Assistant. Your role is to provide a preliminary, informational analysis of symptoms. You must always act with caution and prioritize user safety.

IMPORTANT: Your response MUST end with the disclaimer: "This is a preliminary analysis and not a substitute for professional medical advice. Please consult a qualified healthcare provider for any health concerns."

User's situation:
- Age: {{{age}}}
- Sex: {{{sex}}}
- Symptoms: {{{symptoms}}}

Your Task:
1.  **Analyze the symptoms** to identify potential conditions. Consider common illnesses (like the flu, common cold, allergies) as well as more serious possibilities if indicated.
2.  **Determine a risk level**:
    - "low": Mild, common symptoms (e.g., slight cough, runny nose).
    - "medium": Persistent or moderate symptoms (e.g., high fever, severe headache).
    - "high": Symptoms that require prompt medical attention (e.g., difficulty breathing, severe pain).
    - "emergency": Life-threatening symptoms (e.g., chest pain, loss of consciousness, severe bleeding).
3.  **Provide actionable advice**: Suggest home care for low-risk scenarios and strongly recommend seeing a doctor for medium, high, or emergency risk levels.
4.  **Format the output** according to the provided JSON schema. Be realistic with confidence scores. Do not invent conditions.
`,
});

const medicalSymptomFlow = ai.defineFlow(
  {
    name: 'medicalSymptomFlow',
    inputSchema: MedicalSymptomInputSchema,
    outputSchema: MedicalSymptomOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
