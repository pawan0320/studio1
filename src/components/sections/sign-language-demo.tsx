'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getSignLanguageAnalysis } from '@/app/actions';
import { Hand, CameraOff, Loader2, Play, Pause } from 'lucide-react';

interface SignResult {
  sign: string;
  description: string;
}

export default function SignLanguageDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<SignResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
      // Cleanup: stop video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const captureAndAnalyze = useCallback(async () => {
    if (isLoading || isPaused || !videoRef.current || !canvasRef.current) return;
    
    setIsLoading(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUri = canvas.toDataURL('image/jpeg');

    try {
      const res = await getSignLanguageAnalysis({ photoDataUri: dataUri });

      if (res.success && res.data) {
        setResult(res.data);
      } else {
         toast({
          variant: 'destructive',
          title: 'AI Error',
          description: res.error || 'Could not analyze the gesture.',
        });
      }
    } catch (error) {
        toast({
        variant: 'destructive',
        title: 'Analysis Error',
        description: 'Failed to connect to the AI model.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isPaused, toast]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused && hasCameraPermission) {
        captureAndAnalyze();
      }
    }, 1500); // Analyze every 1.5 seconds

    return () => clearInterval(intervalId);
  }, [isPaused, hasCameraPermission, captureAndAnalyze]);


  return (
    <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="bg-accent/20 p-3 rounded-full">
            <Hand className="h-8 w-8 text-accent" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline text-glow-accent">Sign Language Recognition Demo</CardTitle>
            <CardDescription className="pt-2">Allow camera access to have the AI recognize basic hand gestures. This is a conceptual demo.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative aspect-video max-w-full mx-auto rounded-lg overflow-hidden border border-accent/30 bg-muted">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
             {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                   <CameraOff className="h-16 w-16 text-destructive" />
                   <p className="mt-4 text-center text-lg font-semibold">Camera Access Denied</p>
                   <p className="text-sm text-muted-foreground">Please enable camera permissions to use this demo.</p>
                </div>
             )}
             {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                   <Loader2 className="h-16 w-16 text-accent animate-spin" />
                   <p className="mt-4 text-center text-lg font-semibold">Waiting for Camera...</p>
                </div>
             )}
             {isLoading && (
                <div className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full">
                    <Loader2 className="h-5 w-5 text-accent animate-spin" />
                </div>
             )}
        </div>
        <div className="flex justify-center gap-4">
            <Button onClick={() => setIsPaused(p => !p)} disabled={hasCameraPermission !== true}>
                {isPaused ? <Play className="mr-2" /> : <Pause className="mr-2" />}
                {isPaused ? 'Resume' : 'Pause'}
            </Button>
        </div>

        {result ? (
            <div className="p-4 bg-muted rounded-lg space-y-4 text-center animate-in fade-in-50">
                <div>
                    <p className="text-sm text-muted-foreground">Recognized Sign</p>
                    <p className="text-2xl font-bold capitalize text-accent text-glow-accent">{result.sign}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{result.description}</p>
                </div>
            </div>
        ) : (
            <div className="text-center text-muted-foreground italic p-4">
                Position your hand in the frame to begin recognition.
            </div>
        )}
         <p className="text-xs text-muted-foreground text-center italic">
            Disclaimer: This AI demo is for educational purposes and recognizes a limited set of signs. Analysis may not be 100% accurate.
         </p>
      </CardContent>
    </Card>
  );
}
