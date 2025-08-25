'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSymptomAnalysis } from '@/app/actions';
import { HeartPulse, Loader2, AlertTriangle, ShieldCheck, Thermometer } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface SymptomResult {
  probable_conditions: {
    condition: string;
    confidence: number;
  }[];
  risk_level: "low" | "medium" | "high" | "emergency";
  advice: string;
}

const riskStyles = {
    low: { icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
    medium: { icon: Thermometer, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    high: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    emergency: { icon: HeartPulse, color: "text-red-700", bg: "bg-red-700/10", border: "border-red-700/20" },
};


export default function MedicalBotDemo() {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState<number | ''>(30);
  const [sex, setSex] = useState('male');
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || age === '') {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter symptoms and age.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await getSymptomAnalysis({ symptoms, age, sex });
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: res.error || 'Could not get an analysis.',
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

  return (
    <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-full">
                <HeartPulse className="h-8 w-8 text-accent" />
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-glow-accent">AI Medical Assistant Demo</CardTitle>
                <CardDescription className="pt-2">Enter your symptoms, age, and sex to get a preliminary analysis from the AI. This is a conceptual demo and not a substitute for professional medical advice.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value))} min="0" max="120" className="bg-background/50 focus:border-accent border-accent/50" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                     <Select value={sex} onValueChange={setSex}>
                        <SelectTrigger id="sex" className="bg-background/50 focus:border-accent border-accent/50">
                            <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Input 
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g., fever, cough, headache"
                    className="bg-background/50 focus:border-accent border-accent/50"
                    disabled={isLoading}
                />
            </div>
          <Button type="submit" disabled={isLoading} className="w-full glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <HeartPulse className="mr-2 h-5 w-5" />}
              Analyze Symptoms
          </Button>
        </form>

        {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="h-12 w-12 text-accent animate-spin" />
                <p className="text-muted-foreground">AI is running analysis... this may take a moment.</p>
            </div>
        )}

        {result && (
            <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-xl font-bold text-center">Preliminary Analysis</h3>
                <div className={`p-4 bg-muted rounded-lg space-y-4 border ${riskStyles[result.risk_level].border}`}>
                    <div className="flex items-center justify-center gap-4 text-center">
                        <div>
                             <p className="text-sm text-muted-foreground">Risk Level</p>
                             <p className={`text-2xl font-bold capitalize ${riskStyles[result.risk_level].color}`}>{result.risk_level}</p>
                        </div>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Possible Conditions</p>
                        <div className="space-y-2 mt-1">
                             {result.probable_conditions.map(p => (
                                <div key={p.condition}>
                                    <div className="flex justify-between items-center text-sm">
                                        <span>{p.condition}</span>
                                        <span className="font-mono text-muted-foreground">{(p.confidence * 100).toFixed(0)}% Conf.</span>
                                    </div>
                                    <Progress value={p.confidence * 100} className="h-2 mt-1 bg-accent/20 [&>div]:bg-accent" />
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">AI Assistant's Advice</p>
                        <p className="text-sm">{result.advice}</p>
                    </div>
                </div>
            </div>
        )}

         <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This tool provides a preliminary analysis for informational purposes only. It is not a medical device and is not a substitute for professional medical advice, diagnosis, or treatment.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
