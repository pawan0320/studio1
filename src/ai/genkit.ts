import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'YOUR_ACTUAL_API_KEY_HERE') {
  console.warn('WARNING: GEMINI_API_KEY is not set or is invalid in .env file. AI features will fail.');
}

export const ai = genkit({
  plugins: [googleAI({apiKey})],
  model: 'googleai/gemini-2.0-flash',
});
