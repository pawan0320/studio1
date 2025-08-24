
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, TestTube, BrainCircuit, Loader2, LineChart as LineChartIcon } from "lucide-react";
import { useState, useRef, useEffect, type FormEvent, useMemo } from 'react';
import { getPortfolioAnswer } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { CornerDownLeft, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "./projects";
import ProjectDisplay from "./project-display";
import BrainTumorDemo from "./brain-tumor-demo";
import HandGestureDemo from "./hand-gesture-demo";
import StockPredictionDemo from "./stock-prediction-demo";
import SignLanguageDemo from "./sign-language-demo";
import ProstheticControlDemo from "./prosthetic-control-demo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


// New Crop Recommendation Component
const FEATURES = [
  { key: "ph", label: "Soil pH", min: 4.5, max: 9.0, step: 0.1, help: "Acidic (low) to alkaline (high)" },
  { key: "n", label: "Nitrogen (N) [kg/ha]", min: 0, max: 140, step: 1, help: "Available nitrogen in soil" },
  { key: "p", label: "Phosphorus (P) [kg/ha]", min: 0, max: 120, step: 1, help: "Available phosphorus in soil" },
  { key: "k", label: "Potassium (K) [kg/ha]", min: 0, max: 200, step: 1, help: "Available potassium in soil" },
  { key: "rain", label: "Rainfall [mm/month]", min: 0, max: 600, step: 5, help: "Approx. monthly rainfall" },
  { key: "temp", label: "Temperature [°C]", min: 5, max: 45, step: 0.5, help: "Ambient temperature" },
  { key: "hum", label: "Humidity [%]", min: 10, max: 100, step: 1, help: "Relative humidity" },
];

const CROPS = [
  { name: "Rice", ideal: { ph: [5.5, 7.0], n: [60, 120], p: [40, 80], k: [60, 120], rain: [150, 400], temp: [20, 35], hum: [60, 90] }, notes: "Thrives in warm, humid climates with standing water / high rainfall." },
  { name: "Wheat", ideal: { ph: [6.0, 7.5], n: [60, 100], p: [30, 60], k: [40, 80], rain: [30, 80], temp: [12, 25], hum: [30, 60] }, notes: "Cool-season cereal; moderate inputs and lower humidity." },
  { name: "Maize", ideal: { ph: [5.8, 7.2], n: [60, 120], p: [40, 80], k: [40, 100], rain: [60, 150], temp: [18, 32], hum: [40, 70] }, notes: "Warm-season; avoids extremes of drought or waterlogging." },
  { name: "Cotton", ideal: { ph: [5.8, 8.0], n: [50, 100], p: [30, 60], k: [60, 120], rain: [50, 120], temp: [20, 35], hum: [40, 60] }, notes: "Prefers warm, relatively dry conditions; sensitive to waterlogging." },
  { name: "Sugarcane", ideal: { ph: [6.0, 7.5], n: [80, 140], p: [40, 80], k: [80, 160], rain: [120, 300], temp: [20, 35], hum: [60, 85] }, notes: "High biomass crop; needs warmth and moisture." },
  { name: "Soybean", ideal: { ph: [6.0, 7.5], n: [20, 60], p: [40, 80], k: [40, 80], rain: [60, 150], temp: [20, 30], hum: [50, 70] }, notes: "Legume; moderate rainfall and neutral pH preferred." },
  { name: "Potato", ideal: { ph: [5.0, 6.5], n: [60, 120], p: [60, 100], k: [80, 160], rain: [60, 150], temp: [10, 24], hum: [50, 70] }, notes: "Cooler temperatures; slightly acidic soils reduce scab." },
  { name: "Tomato", ideal: { ph: [6.0, 7.0], n: [40, 80], p: [40, 80], k: [60, 120], rain: [40, 120], temp: [18, 30], hum: [50, 70] }, notes: "Warm but not hot; well-drained soils." },
  { name: "Banana", ideal: { ph: [5.5, 7.0], n: [80, 140], p: [40, 80], k: [100, 180], rain: [150, 400], temp: [22, 35], hum: [70, 95] }, notes: "Tropical; high humidity, high K requirement." },
  { name: "Groundnut", ideal: { ph: [5.8, 7.0], n: [20, 60], p: [30, 60], k: [30, 60], rain: [40, 120], temp: [22, 32], hum: [40, 60] }, notes: "Legume; prefers light, well-drained soils." },
  { name: "Pulses (Lentil/Gram)", ideal: { ph: [6.0, 7.5], n: [10, 40], p: [20, 50], k: [20, 60], rain: [20, 80], temp: [15, 28], hum: [30, 60] }, notes: "Low N requirement due to fixation; cool to moderate climates." },
  { name: "Tea", ideal: { ph: [4.5, 5.5], n: [60, 120], p: [40, 80], k: [60, 120], rain: [150, 400], temp: [18, 30], hum: [70, 95] }, notes: "Acid-loving perennial; high rainfall and humidity." },
  { name: "Coffee", ideal: { ph: [5.0, 6.5], n: [40, 100], p: [30, 60], k: [40, 120], rain: [100, 250], temp: [15, 28], hum: [60, 85] }, notes: "Subtropical; prefers shade, moderate humidity, no frost." },
];

const defaultState = { ph: 6.5, n: 80, p: 50, k: 80, rain: 120, temp: 26, hum: 65 };

function normalize(value: number, min: number, max: number) {
  if (max === min) return 0.5;
  const v = (value - min) / (max - min);
  return Math.max(0, Math.min(1, v));
}

function clampToRange(value: number, [rmin, rmax]: number[]) {
  if (value < rmin) return rmin;
  if (value > rmax) return rmax;
  return value;
}

function scoreCrop(user: typeof defaultState, crop: (typeof CROPS)[0]) {
  let total = 0;
  let count = 0;

  for (const f of FEATURES) {
    const key = f.key as keyof typeof defaultState;
    const [imin, imax] = crop.ideal[key as keyof typeof crop.ideal];
    const u = user[key];

    const within = u >= imin && u <= imax;
    let dist = 0;
    if (!within) {
      const nearest = clampToRange(u, [imin, imax]);
      dist = Math.abs(u - nearest) / (f.max - f.min);
    }
    const featureScore = 1 - dist;
    total += featureScore;
    count += 1;
  }

  const avg = total / Math.max(1, count);
  return avg;
}

function formatReason(user: typeof defaultState, crop: (typeof CROPS)[0]) {
  const bad = [];
  for (const f of FEATURES) {
    const key = f.key as keyof typeof defaultState;
    const [imin, imax] = crop.ideal[key as keyof typeof crop.ideal];
    const u = user[key];
    if (u < imin) bad.push(`${f.label} low (ideal ${imin}-${imax})`);
    else if (u > imax) bad.push(`${f.label} high (ideal ${imin}-${imax})`);
  }
  if (bad.length === 0) return "Your conditions are within ideal ranges for this crop.";
  return `Needs attention: ${bad.slice(0, 3).join(", ")}${bad.length > 3 ? ", …" : ""}`;
}

const CropRecommender = () => {
    const [state, setState] = useState(defaultState);
    const [showAll, setShowAll] = useState(false);

    const results = useMemo(() => {
        const scored = CROPS.map((c) => ({
            crop: c,
            score: scoreCrop(state, c),
            reason: formatReason(state, c),
        }));
        scored.sort((a, b) => b.score - a.score);
        return scored;
    }, [state]);

    function update(key: string, value: number) {
        setState((s) => ({ ...s, [key]: value }));
    }

    function reset() {
        setState(defaultState);
    }

    const top = showAll ? results : results.slice(0, 3);

    return (
        <div className="text-foreground">
            <div className="grid md:grid-cols-5 gap-6 items-start">
                <section className="md:col-span-2 space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Your Conditions</h2>
                        <div className="flex gap-2">
                            <Button onClick={reset} variant="outline" size="sm">Reset</Button>
                            <Button onClick={() => setShowAll((v) => !v)} variant="outline" size="sm">
                                {showAll ? "Top 3" : "Show All"}
                            </Button>
                        </div>
                    </div>

                    {FEATURES.map((f) => (
                        <div key={f.key} className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-medium text-sm" htmlFor={`slider-${f.key}`}>{f.label}</label>
                                <Input
                                    id={`number-${f.key}`}
                                    type="number"
                                    value={state[f.key as keyof typeof state]}
                                    min={f.min}
                                    max={f.max}
                                    step={f.step}
                                    onChange={(e) => update(f.key, Number(e.target.value))}
                                    className="w-28 h-8 text-xs bg-background"
                                />
                            </div>
                            <input
                                id={`slider-${f.key}`}
                                type="range"
                                min={f.min}
                                max={f.max}
                                step={f.step}
                                value={state[f.key as keyof typeof state]}
                                onChange={(e) => update(f.key, Number(e.target.value))}
                                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer range-lg accent-primary"
                            />
                             <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>{f.min}</span>
                                <span>{f.help}</span>
                                <span>{f.max}</span>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="md:col-span-3">
                    <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
                    <div className="grid lg:grid-cols-2 gap-4">
                        {top.map(({ crop, score, reason }, i) => (
                            <article key={crop.name} className="p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-sm text-muted-foreground">Rank #{i + 1}</div>
                                        <h3 className="text-lg font-semibold">{crop.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground">Suitability</div>
                                        <div className="text-2xl font-bold text-accent">{Math.round(score * 100)}%</div>
                                    </div>
                                </div>
                                <dl className="grid grid-cols-2 gap-2 mt-3 text-sm">
                                    {FEATURES.map((f) => {
                                        const key = f.key as keyof typeof defaultState;
                                        const [imin, imax] = crop.ideal[key as keyof typeof crop.ideal];
                                        const u = state[key];
                                        const ok = u >= imin && u <= imax;
                                        return (
                                            <div key={`${crop.name}-${f.key}`} className="flex items-center gap-2">
                                                <span className={`inline-block w-2 h-2 rounded-full ${ok ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                <div>
                                                    <div className="text-muted-foreground text-xs">{f.label}</div>
                                                    <div className="text-[10px] text-muted-foreground/70">Ideal {imin}–{imax} • Yours {u}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </dl>
                                <p className="mt-3 text-xs text-muted-foreground">{reason}</p>
                            </article>
                        ))}
                    </div>
                     <div className="mt-4 p-4 bg-accent/10 text-accent-foreground rounded-lg border border-accent/20">
                        <p className="text-xs">
                            <TestTube className="inline-block w-4 h-4 mr-2" />
                            <span className="font-medium">How this works:</span> For each crop, we compare your inputs to its ideal ranges to compute a suitability score.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

// AI Chat Component
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PlaygroundChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Re-using the portfolio answer flow for general purpose chat for now.
      const result = await getPortfolioAnswer({ query: currentInput });
      
      if (result.success && result.data) {
        const assistantMessage: Message = { role: 'assistant', content: result.data.answer };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(result.error || 'Sorry, something went wrong.');
      }
    } catch (error) {
       const errorMessage: Message = { role: 'assistant', content: 'An unexpected error occurred.' };
       setMessages((prev) => [...prev, errorMessage]);
       toast({
          variant: "destructive",
          title: "AI Error",
          description: error instanceof Error ? error.message : 'Failed to connect to the AI assistant.',
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <Card className="h-full bg-card/80 border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10 flex flex-col">
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-3 rounded-full">
                    <BrainCircuit className="h-8 w-8 text-accent" />
                </div>
                <div>
                    <CardTitle className="text-2xl font-headline text-glow-accent">AI Chat</CardTitle>
                    <CardDescription className="pt-2">Send a prompt to the Gemini API and get a direct response. This is a general-purpose chat to demonstrate the model's capabilities.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0">
             <div className="flex-1 overflow-y-auto space-y-4 p-4 h-96 relative">
              {messages.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">Ask me anything!</p>
                  </div>
              )}
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start' )}>
                  {msg.role === 'assistant' && (<div className="bg-primary/20 p-2 rounded-full"><Bot className="h-6 w-6 text-primary" /></div>)}
                  <div className={cn('max-w-sm rounded-lg px-4 py-2', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted' )}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (<div className="bg-muted p-2 rounded-full"><User className="h-6 w-6" /></div>)}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <div className="bg-primary/20 p-2 rounded-full"><Bot className="h-6 w-6 text-primary" /></div>
                  <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-primary/20">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Send a message..." disabled={isLoading} className="bg-background/50 focus:border-primary border-primary/50" />
              <Button type="submit" disabled={isLoading} className="glow-primary">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CornerDownLeft className="h-4 w-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
        </CardContent>
    </Card>
  );
}

interface AiPlaygroundProps {
  selectedProject: Project | null;
}

export default function AiPlayground({ selectedProject }: AiPlaygroundProps) {
  const getProjectDemo = (projectId: string | undefined) => {
    if (!projectId) return null;
    if (projectId === 'brain-tumor') {
      return <BrainTumorDemo />;
    }
     if (projectId === 'hand-gesture') {
      return <HandGestureDemo />;
    }
    if (projectId === 'crop-recommender') {
        return <CropRecommender />;
    }
    if (projectId === 'stock-prediction') {
        return <StockPredictionDemo />;
    }
     if (projectId === 'sign-language') {
      return <SignLanguageDemo />;
    }
     if (projectId === 'prosthetic-control') {
      return <ProstheticControlDemo />;
    }
    // For other projects, show the generic display
    return <ProjectDisplay project={selectedProject!} />;
  };
  
  const isProjectWithDemo = selectedProject?.id && ['brain-tumor', 'hand-gesture', 'crop-recommender', 'stock-prediction', 'sign-language', 'prosthetic-control'].includes(selectedProject.id);


  return (
    <section id="ai-playground" className="bg-card/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-accent sm:text-5xl">AI Playground</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {selectedProject ? `Viewing Demo: ${selectedProject.title}` : "Interact with live AI models."}
          </p>
        </div>
        <div className="mt-12">
          {selectedProject && isProjectWithDemo ? (
            getProjectDemo(selectedProject.id)
          ) : selectedProject ? (
             <ProjectDisplay project={selectedProject} />
          ) : (
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">
                    <BrainCircuit className="mr-2 h-5 w-5" />
                    AI Chat
                </TabsTrigger>
                <TabsTrigger value="crop">
                    <Leaf className="mr-2 h-5 w-5" />
                    Crop Recommendation
                </TabsTrigger>
                <TabsTrigger value="stock">
                    <LineChartIcon className="mr-2 h-5 w-5" />
                    Stock Prediction
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat">
                <PlaygroundChat />
              </TabsContent>
              <TabsContent value="crop">
                 <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/20 p-3 rounded-full">
                         <Leaf className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-headline text-glow-accent">Crop Recommendation System</CardTitle>
                        <CardDescription className="pt-2">An AI-powered system that recommends the best crop to plant based on soil composition and environmental factors. Adjust the sliders to get a recommendation.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CropRecommender />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="stock">
                <StockPredictionDemo />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
}
