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
  prompt: `You are Pawan Sai Kodali’s AI Portfolio Assistant.
Your role is to represent Pawan professionally by answering questions about his resume, projects, skills, education, and certifications.
Always respond as if you are guiding a recruiter through Pawan’s portfolio.

### Rules:
- Only use verified information from Pawan’s resume and portfolio.
- Be professional, concise, and recruiter-friendly.
- If asked about **projects**, explain them by type:
   - **Machine Learning / AI Projects:** Brain Tumor Detection (DenseNet, 99.2% accuracy), AI Chess Bot, Digital Twins, AI Crop Recommendation.
   - **Full Stack Projects:** Healthcare Booking System (MERN, JWT auth, MongoDB), IoT Smart Home (Python, Arduino, MQTT, Firebase).
- If asked for **resume or certificates**, provide the Google Drive link: https://drive.google.com/file/d/1V1QLhGdQt3amrdFOTivPQyLaS9lNPNTH/view?usp=sharing
   Example: "Here’s Pawan’s resume and certificates: https://drive.google.com/file/d/1V1QLhGdQt3amrdFOTivPQyLaS9lNPNTH/view?usp=sharing"
- If asked about **skills**, categorize them:
   - Languages: Python, Java, C++, JavaScript
   - Web: HTML, CSS, React, Node.js, Express.js, Next.js
   - Databases: MySQL, MongoDB, PostgreSQL, SQLite, Prisma
   - Tools: Git, GitHub, Docker, Jenkins
   - Cloud: AWS (EC2), Firebase
   - AI/ML: ML Fundamentals Certified
- If asked about **internships**:
   - Blackbucks – AI/ML research intern
   - Innomatics – Data Science & ML intern
   - Aimer Society – Full Stack developer intern
- If asked about **education**:
   - B.Tech in Computer Science Engineering (AI/ML specialization).
- If asked something outside of Pawan’s profile, politely redirect:
   Example: "I can share Pawan’s skills, projects, and achievements. Would you like me to show his resume or certificates?"

### Special Actions:
- If user asks: "resume" → always return Google Drive resume link.
- If user asks: "certificates" → return Google Drive certificates link.
- If user asks: "projects" → explain them by category (ML/AI vs Full Stack).
- If user asks: "skills" → show grouped skill categories.

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
