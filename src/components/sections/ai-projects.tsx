
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Bot, Leaf, TestTube, Thermometer, Sun, Wind, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { getCropRecommendation } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField control={form.control} name="nitrogen" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nitrogen (N)</FormLabel>
                        <FormControl>
                          <Slider
                            min={0} max={150} step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="phosphorus" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phosphorus (P)</FormLabel>
                        <FormControl>
                          <Slider
                            min={0} max={150} step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="potassium" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Potassium (K)</FormLabel>
                        <FormControl>
                          <Slider
                            min={0} max={250} step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="temperature" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Temperature (°C)</FormLabel>
                        <FormControl>
                          <Slider
                            min={0} max={50} step={0.1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="humidity" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Humidity (%)</FormLabel>
                         <FormControl>
                          <Slider
                            min={0} max={100} step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="ph" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Soil pH</FormLabel>
                         <FormControl>
                          <Slider
                            min={0} max={14} step={0.1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
             <FormField control={form.control} name="rainfall" render={({ field }) => (
                <FormItem>
                    <FormLabel>Rainfall (mm)</FormLabel>
                     <FormControl>
                          <Slider
                            min={0} max={350} step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <div className="flex flex-col items-center gap-4">
                <Button type="submit" disabled={loading} size="lg" className="glow-primary w-full md:w-auto">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <TestTube className="mr-2 h-5 w-5" />}
                    Recommend Crop
                </Button>
                {result && (
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <p className="text-muted-foreground">The model recommends:</p>
                        <p className="text-2xl font-bold text-primary text-glow-primary">{result}</p>
                    </div>
                )}
            </div>
        </form>
        </Form>
    );
};

const aiProjects = [
  {
    title: "Brain Tumor Detection",
    description: "An AI model that detects brain tumors from MRI scans with high accuracy. This demo provides a detailed explanation of the model architecture and its performance.",
    image: "https://placehold.co/600x400.png",
    hint: "brain mri",
    Icon: BrainCircuit,
    demoType: "link",
    link: "#"
  },
  {
    title: "AI Chess Bot",
    description: "A chess engine that uses reinforcement learning. Watch a video demonstration of the bot playing against a human and explore an interactive explanation of its decision-making process.",
    image: "https://placehold.co/600x400.png",
    hint: "chess game",
    Icon: Bot,
    demoType: "link",
    link: "#"
  },
  {
    title: "Crop Recommendation System",
    description: "An AI-powered system that recommends the best crop to plant based on soil composition and environmental factors. Adjust the sliders below to get a recommendation.",
    Icon: Leaf,
    demoType: "interactive",
    component: <CropRecommendationForm />
  }
];

export default function AiProjectsSection() {
  return (
    <section id="ai-projects" className="bg-card/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-accent sm:text-5xl">AI in Action</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See My AI Projects Live.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {aiProjects.map((project) => (
            <Card key={project.title} className="h-full bg-card border-accent/20 overflow-hidden tilt-card glow-accent shadow-2xl shadow-accent/10">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                     <project.Icon className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-headline text-glow-accent">{project.title}</CardTitle>
                    <CardDescription className="pt-2">{project.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {project.demoType === 'link' && project.link && (
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                        <Image 
                            src={project.image!} 
                            alt={project.title}
                            fill
                            className="object-cover"
                            data-ai-hint={project.hint}
                        />
                    </div>
                )}
                {project.demoType === 'interactive' && project.component}
                {project.demoType === 'link' && project.link && (
                    <Button asChild className="w-full glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href={project.link}>
                            Try Demo
                        </Link>
                    </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
