'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getStockPredictionAnalysis } from '@/app/actions';
import { LineChart, TrendingUp, Loader2 } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

interface StockResult {
  currentPrice: number;
  predictedPrice: number;
  analysis: string;
  history: { time: string; price: number }[];
}

export default function StockPredictionDemo() {
  const [ticker, setTicker] = useState('AAPL');
  const [result, setResult] = useState<StockResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid Ticker',
        description: 'Please enter a stock ticker symbol.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await getStockPredictionAnalysis({ ticker });
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: res.error || 'Could not get a prediction.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'Failed to connect to the AI model.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-glow-accent">Stock Price Prediction Demo</CardTitle>
                <CardDescription className="pt-2">Enter a stock ticker to get a simulated price prediction and analysis from the AI. This demo uses the Gemini model to interpret simulated data.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input 
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g., AAPL, GOOGL"
            className="bg-background/50 focus:border-accent border-accent/50"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LineChart className="mr-2 h-5 w-5" />}
              Analyze
          </Button>
        </form>

        {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="h-12 w-12 text-accent animate-spin" />
                <p className="text-muted-foreground">AI is running analysis... this may take a moment.</p>
            </div>
        )}

        {result && (
            <div className="space-y-6 animate-in fade-in-50">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-muted rounded-lg space-y-4">
                        <h3 className="text-xl font-bold">Analysis for ${ticker}</h3>
                         <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Current Price</p>
                                <p className="text-3xl font-bold text-glow-accent">${result.currentPrice.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Predicted Next</p>
                                <p className="text-3xl font-bold text-glow-accent">${result.predictedPrice.toFixed(2)}</p>
                            </div>
                         </div>
                        <div>
                            <p className="text-sm text-muted-foreground">AI Analyst Notes</p>
                            <p className="text-sm">{result.analysis}</p>
                        </div>
                    </div>
                     <div className="p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Simulated 60-Min Price Chart</h3>
                        <div className="h-60">
                           <ChartContainer config={chartConfig}>
                              <AreaChart
                                accessibilityLayer
                                data={result.history}
                                margin={{
                                  left: 12,
                                  right: 12,
                                  top: 10
                                }}
                              >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(-5)} />
                                <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Area
                                  dataKey="price"
                                  type="natural"
                                  fill="var(--color-price)"
                                  fillOpacity={0.4}
                                  stroke="var(--color-price)"
                                />
                              </AreaChart>
                            </ChartContainer>
                        </div>
                    </div>
                 </div>
                 <p className="text-xs text-muted-foreground text-center italic">
                    Disclaimer: This tool is for educational purposes only and uses simulated data. It does not constitute financial advice.
                 </p>
            </div>
        )}
         {!isLoading && !result && (
            <div className="text-center text-muted-foreground italic p-8">
                Enter a ticker symbol to begin analysis.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
