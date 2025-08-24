'use server';
/**
 * @fileOverview An AI agent for providing stock analysis and a simulated price prediction.
 *
 * - getStockPrediction - A function that returns an analysis for a stock ticker.
 * - StockPredictionInput - The input type for the getStockPrediction function.
 * - StockPredictionOutput - The return type for the getStockPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StockPredictionInputSchema = z.object({
  ticker: z
    .string()
    .describe('The stock ticker symbol (e.g., "AAPL", "GOOGL").'),
});
export type StockPredictionInput = z.infer<typeof StockPredictionInputSchema>;

const StockPredictionOutputSchema = z.object({
  currentPrice: z.number().describe("The current simulated price of the stock."),
  predictedPrice: z.number().describe("The AI's predicted price for the next interval."),
  analysis: z.string().describe("A brief, insightful analysis of the stock's recent performance and the rationale behind the prediction. Mention key trends or patterns."),
  history: z.array(z.object({
      time: z.string().describe("The timestamp for the data point, in HH:MM format."),
      price: z.number().describe("The price at that time."),
  })).describe("A list of the last 60 minutes of simulated price data."),
});
export type StockPredictionOutput = z.infer<typeof StockPredictionOutputSchema>;

export async function getStockPrediction(input: StockPredictionInput): Promise<StockPredictionOutput> {
  return stockPredictionFlow(input);
}

// Helper to generate a realistic but fake stock price stream
function generateSimulatedStockData(ticker: string) {
    const basePrice = Math.abs(ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 500 + 50; // Base price between 50 and 550
    const volatility = 0.02 + (ticker.length % 5) * 0.005;
    const trend = (ticker.charCodeAt(0) % 3 - 1) * 0.0005; // -0.0005, 0, or +0.0005

    const prices = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < 60; i++) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - (59 - i));
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const shock = (Math.random() - 0.5) * volatility;
        currentPrice *= (1 + trend + shock);
        prices.push({ time, price: parseFloat(currentPrice.toFixed(2)) });
    }

    return prices;
}


const prompt = ai.definePrompt({
  name: 'stockPredictionPrompt',
  input: {schema: z.object({
      ticker: z.string(),
      historyData: z.string(),
  })},
  output: {schema: StockPredictionOutputSchema},
  prompt: `You are a financial analyst AI. Your task is to analyze the provided recent stock price data and provide a single predicted price for the next minute, along with a brief analysis.

The user has provided the ticker: {{{ticker}}}.
Here is the price history for the last 60 minutes (oldest to newest):
{{{historyData}}}

Based on this data:
1.  Identify the most recent price and set it as 'currentPrice'.
2.  Analyze the trend (e.g., upward, downward, volatile, stable) from the historical data.
3.  Based on the trend, extrapolate a single 'predictedPrice' for the next minute. This should be a realistic, small increment or decrement from the current price.
4.  Write a brief 'analysis' explaining the trend you observed and the reasoning for your prediction. Keep it concise and professional.
5.  Return the full 60-minute price history in the 'history' field.
`,
});

const stockPredictionFlow = ai.defineFlow(
  {
    name: 'stockPredictionFlow',
    inputSchema: StockPredictionInputSchema,
    outputSchema: StockPredictionOutputSchema,
  },
  async ({ ticker }) => {
    const history = generateSimulatedStockData(ticker);
    const historyString = history.map(p => `${p.time}: $${p.price}`).join(', ');

    const { output } = await prompt({
        ticker,
        historyData: historyString,
    });
    return output!;
  }
);
