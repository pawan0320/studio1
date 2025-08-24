
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, TestTube, BrainCircuit, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { getCropRecommendation, getPortfolioAnswer } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { CornerDownLeft, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "./projects";
import ProjectDisplay from "./project-display";
import BrainTumorDemo from "./brain-tumor-demo";
import HandGestureDemo from "./hand-gesture-demo";


// Crop Recommendation Form
const CropFormSchema = z.object({
  nitrogen: z.number().min(0).max(150),
  phosphorus: z.number().min(0).max(150),
  potassium: z.number().min(0).max(250),
  temperature: z.number().min(0).max(50),
  humidity: z.number().min(0).max(100),
  ph: z.number().min(0).max(14),
  rainfall: z.number().min(0).max(350),
});
type CropFormValues = z.infer<typeof CropFormSchema>;

const CropRecommendationForm = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const { toast } = useToast();

    const form = useForm<CropFormValues>({
        resolver: zodResolver(CropFormSchema),
        defaultValues: {
            nitrogen: 90,
            phosphorus: 50,
            potassium: 50,
            temperature: 25,
            humidity: 70,
            ph: 7,
            rainfall: 100,
        },
    });

    const onSubmit: SubmitHandler<CropFormValues> = async (data) => {
        setLoading(true);
        setResult(null);
        try {
            const res = await getCropRecommendation(data);
            if (res.success && res.data) {
                setResult(res.data.crop);
            } else {
                toast({
                    variant: "destructive",
                    title: "AI Error",
                    description: res.error || "Could not get a recommendation.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Submission Error",
                description: "Failed to connect to the AI model.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="nitrogen" render={({ field }) => ( <FormItem> <FormLabel>Nitrogen</FormLabel> <FormControl><Slider min={0} max={150} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="phosphorus" render={({ field }) => ( <FormItem> <FormLabel>Phosphorus</FormLabel> <FormControl><Slider min={0} max={150} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="potassium" render={({ field }) => ( <FormItem> <FormLabel>Potassium</FormLabel> <FormControl><Slider min={0} max={250} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="temperature" render={({ field }) => ( <FormItem> <FormLabel>Temperature (°C)</FormLabel> <FormControl><Slider min={0} max={50} step={0.1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="humidity" render={({ field }) => ( <FormItem> <FormLabel>Humidity (%)</FormLabel> <FormControl><Slider min={0} max={100} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="ph" render={({ field }) => ( <FormItem> <FormLabel>Soil pH</FormLabel> <FormControl><Slider min={0} max={14} step={0.1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
            </div>
            <FormField control={form.control} name="rainfall" render={({ field }) => ( <FormItem> <FormLabel>Rainfall (mm)</FormLabel> <FormControl><Slider min={0} max={350} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl> <FormMessage /> </FormItem> )} />
            <div className="flex flex-col items-center gap-4">
                <Button type="submit" disabled={loading} size="lg" className="glow-primary w-full md:w-auto">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <TestTube className="mr-2 h-5 w-5" />}
                    Recommend Crop
                </Button>
                {result && (
                    <div className="text-center p-4 bg-primary/10 rounded-lg w-full">
                        <p className="text-muted-foreground">The model recommends:</p>
                        <p className="text-2xl font-bold text-primary text-glow-primary">{result}</p>
                    </div>
                )}
            </div>
        </form>
      </Form>
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
     <div className="flex flex-col h-full bg-transparent">
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
    </div>
  );
}

const playgroundDemos = [
  {
    id: "chat",
    title: "AI Chat",
    description: "Send a prompt to the Gemini API and get a direct response. This is a general-purpose chat to demonstrate the model's capabilities.",
    Icon: BrainCircuit,
    component: <PlaygroundChat />
  },
  {
    id: "crop",
    title: "Crop Recommendation System",
    description: "An AI-powered system that recommends the best crop to plant based on soil composition and environmental factors. Adjust the sliders to get a recommendation.",
    Icon: Leaf,
    component: <CropRecommendationForm />
  }
];

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
    // For other projects, show the generic display
    return <ProjectDisplay project={selectedProject!} />;
  };

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
          {selectedProject ? (
            getProjectDemo(selectedProject.id)
          ) : (
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {playgroundDemos.map((demo) => (
                <Card key={demo.id} className="h-full bg-card border-accent/20 overflow-hidden tilt-card glow-accent shadow-2xl shadow-accent/10 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/20 p-3 rounded-full">
                         <demo.Icon className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-headline text-glow-accent">{demo.title}</CardTitle>
                        <CardDescription className="pt-2">{demo.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex-grow">
                     {demo.component}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
