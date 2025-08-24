'use server';
/**
 * @fileOverview An AI agent for conceptual analysis of molecules for drug discovery.
 *
 * - analyzeMolecule - A function that analyzes a molecule from a SMILES string.
 * - MoleculeAnalysisInput - The input type for the analyzeMolecule function.
 * - MoleculeAnalysisOutput - The return type for the analyzeMolecule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoleculeAnalysisInputSchema = z.object({
  smiles: z
    .string()
    .describe(
      'The SMILES (Simplified Molecular-Input Line-Entry System) string representing the molecule.'
    ),
});
export type MoleculeAnalysisInput = z.infer<typeof MoleculeAnalysisInputSchema>;

const MoleculeAnalysisOutputSchema = z.object({
  molecularWeight: z.number().describe("The calculated molecular weight of the molecule (in g/mol)."),
  logP: z.number().describe("The calculated LogP (octanol-water partition coefficient), indicating lipophilicity."),
  hBondDonors: z.number().int().describe("The number of hydrogen bond donors."),
  hBondAcceptors: z.number().int().describe("The number of hydrogen bond acceptors."),
  tpsa: z.number().describe("The Topological Polar Surface Area (TPSA)."),
  drugLikeness: z.string().describe("A qualitative assessment of the molecule's drug-likeness based on common rules like Lipinski's Rule of Five (e.g., 'Good', 'Moderate', 'Poor')."),
  summary: z.string().describe("A brief, high-level summary of the molecule's potential as a drug candidate, mentioning its key properties and potential therapeutic applications or challenges."),
});
export type MoleculeAnalysisOutput = z.infer<typeof MoleculeAnalysisOutputSchema>;

export async function analyzeMolecule(input: MoleculeAnalysisInput): Promise<MoleculeAnalysisOutput> {
  return drugDiscoveryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'drugDiscoveryPrompt',
  input: {schema: MoleculeAnalysisInputSchema},
  output: {schema: MoleculeAnalysisOutputSchema},
  prompt: `You are a computational chemist AI specializing in drug discovery. Your task is to analyze a molecule provided as a SMILES string.

For the given SMILES string: {{{smiles}}}

1.  Calculate or estimate the following physicochemical properties:
    *   Molecular Weight (g/mol)
    *   LogP (a measure of lipophilicity)
    *   Number of Hydrogen Bond Donors
    *   Number of Hydrogen Bond Acceptors
    *   Topological Polar Surface Area (TPSA)

2.  Evaluate its drug-likeness. Use Lipinski's Rule of Five as a primary guideline (MW <= 500, LogP <= 5, H-bond donors <= 5, H-bond acceptors <= 10). Provide a simple assessment: 'Good', 'Moderate', or 'Poor'.

3.  Provide a concise summary of the molecule's potential. Mention its general class if identifiable (e.g., "resembles a kinase inhibitor"), its compliance with drug-likeness rules, and what its properties might imply for its use as a therapeutic (e.g., "good oral bioavailability is likely," or "high polarity may limit cell membrane permeability").

Provide the full analysis in the specified JSON format.
`,
});

const drugDiscoveryFlow = ai.defineFlow(
  {
    name: 'drugDiscoveryFlow',
    inputSchema: MoleculeAnalysisInputSchema,
    outputSchema: MoleculeAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
