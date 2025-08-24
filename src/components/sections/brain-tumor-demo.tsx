'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getBrainTumorClassification } from '@/app/actions';
import Image from 'next/image';
import { BrainCircuit, Loader2, UploadCloud, X } from 'lucide-react';
import { Progress } from '../ui/progress';

interface ClassificationResult {
  classification: string;
  confidence: number;
  analysis: string;
}

export default function BrainTumorDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Limit file size to 5MB
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 5MB.',
        });
        return;
      }
      setFile(selectedFile);
      setResult(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file || !preview) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload an MRI image to classify.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await getBrainTumorClassification({ photoDataUri: preview });
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: res.error || 'Could not get a classification.',
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
                <BrainCircuit className="h-8 w-8 text-accent" />
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-glow-accent">Brain Tumor Detection Demo</CardTitle>
                <CardDescription className="pt-2">Upload a brain MRI scan to have the AI classify it. This demo uses the Gemini model to analyze the image.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!preview && (
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-accent/30 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-4 text-accent" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, or JPEG (MAX. 5MB)</p>
                </div>
                <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg" />
            </label>
          </div> 
        )}
        
        {preview && (
            <div className="space-y-4">
                <div className="relative aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border border-accent/30">
                    <Image src={preview} alt="Uploaded MRI scan" fill className="object-contain" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={handleClear}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear image</span>
                    </Button>
                </div>
                <Button onClick={handleSubmit} disabled={isLoading} className="w-full glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <BrainCircuit className="mr-2 h-5 w-5" />}
                    Classify Tumor
                </Button>
            </div>
        )}

        {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="h-12 w-12 text-accent animate-spin" />
                <p className="text-muted-foreground">AI is analyzing the scan... this may take a moment.</p>
            </div>
        )}

        {result && (
            <div className="space-y-4 animate-in fade-in-50">
                 <h3 className="text-xl font-bold text-center">Classification Result</h3>
                 <div className="p-4 bg-muted rounded-lg space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Predicted Classification</p>
                        <p className="text-2xl font-bold capitalize text-accent text-glow-accent">{result.classification}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <div className="flex items-center gap-2">
                             <Progress value={result.confidence * 100} className="w-full bg-accent/20 [&>div]:bg-accent" />
                             <span className="font-mono text-sm text-accent">{(result.confidence * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">AI Analysis</p>
                        <p className="text-sm">{result.analysis}</p>
                    </div>
                 </div>
                 <p className="text-xs text-muted-foreground text-center italic">
                    Disclaimer: This tool is for educational and research purposes only. Always consult a medical professional for accurate diagnosis.
                 </p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
