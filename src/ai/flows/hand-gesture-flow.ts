'use server';
/**
 * @fileOverview An AI agent for recognizing hand gestures and movement from images.
 *
 * - analyzeHandGesture - A function that analyzes a hand gesture from an image.
 * - HandGestureInput - The input type for the analyzeHandGesture function.
 * - HandGestureOutput - The return type for the analyzeHandGesture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HandGestureInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a hand, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prevWristX: z.number().optional().describe("The previous x-coordinate of the wrist."),
  prevWristY: z.number().optional().describe("The previous y-coordinate of the wrist."),
});
export type HandGestureInput = z.infer<typeof HandGestureInputSchema>;

const HandGestureOutputSchema = z.object({
  handState: z.enum(["OPEN", "CLOSED", "UNKNOWN"]).describe("The state of the hand, whether it is open or closed."),
  movement: z.string().describe("The direction of hand movement (e.g., UP, DOWN, LEFT, RIGHT, STILL)."),
  wristX: z.number().describe("The current x-coordinate of the wrist."),
  wristY: z.number().describe("The current y-coordinate of the wrist."),
});
export type HandGestureOutput = z.infer<typeof HandGestureOutputSchema>;

export async function analyzeHandGesture(input: HandGestureInput): Promise<HandGestureOutput> {
  return handGestureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'handGesturePrompt',
  input: {schema: HandGestureInputSchema},
  output: {schema: HandGestureOutputSchema},
  prompt: `You are a highly accurate hand gesture and movement recognition AI.
Your task is to analyze the provided image of a hand and determine its state and movement.

1.  **Hand State**: Determine if the hand is 'OPEN' (all five fingers are visibly extended) or 'CLOSED' (fingers are curled into a fist). If you cannot determine the state, return 'UNKNOWN'.
2.  **Wrist Position**: Identify the (x, y) coordinates of the center of the wrist in the image. The image is 640px wide and 480px high. Return the coordinates.
3.  **Movement Detection**:
    - The previous wrist coordinates are provided as 'prevWristX' and 'prevWristY'.
    - Compare the current wrist coordinates (wristX, wristY) with the previous ones.
    - A significant change (more than 20 pixels) in position indicates movement.
    - Determine the direction: 'UP', 'DOWN', 'LEFT', 'RIGHT'.
    - If there is no significant change, the movement is 'STILL'.

Analyze this image:
Image: {{media url=photoDataUri}}
Previous Wrist X: {{{prevWristX}}}
Previous Wrist Y: {{{prevWristY}}}
`,
});

const handGestureFlow = ai.defineFlow(
  {
    name: 'handGestureFlow',
    inputSchema: HandGestureInputSchema,
    outputSchema: HandGestureOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
