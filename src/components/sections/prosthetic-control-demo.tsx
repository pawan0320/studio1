
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Cpu, Play, Pause } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

// Simplified EMG signal simulator
const simulateEmg = (time: number, nChannels: number) => {
  const signals = Array(nChannels).fill(0).map((_, i) => {
    const freq1 = 0.5 + Math.sin(time * 0.1 + i * 0.5) * 0.2;
    const freq2 = 1.2 + Math.cos(time * 0.2 + i * 1.0) * 0.5;
    const amp1 = 0.5 + Math.sin(time * 0.05 + i) * 0.4;
    const amp2 = 0.3 + Math.cos(time * 0.15 + i * 2) * 0.2;
    const noise = (Math.random() - 0.5) * 0.2;
    return (Math.sin(time * freq1) * amp1 + Math.sin(time * freq2) * amp2) + noise;
  });
  return signals;
};

// Simple moving average to smooth out the data for visualization
const movingAverage = (data: any[], size: number) => {
  const smoothed = data.map((_, i, arr) => {
    const start = Math.max(0, i - size);
    const end = i + 1;
    const subset = arr.slice(start, end);
    const sum = subset.reduce((acc, val) => acc + val.value, 0);
    return { time: val.time, value: sum / subset.length };
  });
  return smoothed;
};

const chartConfig = {
  value: { label: "Signal", color: "hsl(var(--accent))" },
};

const EmgSignalChart = ({ data }: { data: { time: number, value: number }[] }) => {
  const smoothedData = useMemo(() => movingAverage(data, 5), [data]);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart accessibilityLayer data={smoothedData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.2}/>
        <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} hide />
        <YAxis domain={[-1.5, 1.5]} hide />
        <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel indicator="line" />}
        />
        <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
};


const RoboticArm = ({ angle }: { angle: number }) => {
    const armLength = 80;
    const baseCx = 100;
    const baseCy = 100;
    const x2 = baseCx + armLength * Math.cos(angle * Math.PI / 180);
    const y2 = baseCy + armLength * Math.sin(angle * Math.PI / 180);

    return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Base */}
            <circle cx={baseCx} cy={baseCy} r="15" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
            
            {/* Arm */}
            <line x1={baseCx} y1={baseCy} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round" />
            
            {/* Joint */}
            <circle cx={baseCx} cy={baseCy} r="5" fill="hsl(var(--primary-foreground))" />

             {/* End Effector */}
            <circle cx={x2} cy={y2} r="8" fill="hsl(var(--accent))" />
        </svg>
    );
};


export default function ProstheticControlDemo() {
  const [isPaused, setIsPaused] = useState(false);
  const [targetAngle, setTargetAngle] = useState(0);
  const [predictedAngle, setPredictedAngle] = useState(0);
  const [emgData, setEmgData] = useState<any[][]>([[],[],[],[]]);
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(0);
  
  const nChannels = 4;

  const animate = (time: number) => {
    if (isPaused) return;

    timeRef.current += 0.05;
    const t = timeRef.current;

    // Simulate signals
    const newSignals = simulateEmg(t, nChannels);
    
    setEmgData(prevData => {
        const newData = prevData.map((channel, i) => {
            const newPoint = { time: t, value: newSignals[i] };
            const newChannelData = [...channel, newPoint].slice(-100); // Keep last 100 points
            return newChannelData;
        });
        return newData;
    });

    // "Predict" angle based on a combination of signals
    const intention = (newSignals[0] + newSignals[2]) - (newSignals[1] + newSignals[3]);
    const newPredictedAngle = predictedAngle + intention * 2; // Simplified prediction logic
    
    // Simulate PD controller
    const error = targetAngle - newPredictedAngle;
    const command = error * 0.1; // Simplified P controller
    const finalAngle = newPredictedAngle + command;

    setPredictedAngle(finalAngle);
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isPaused, targetAngle]);


  return (
    <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-full">
                <Cpu className="h-8 w-8 text-accent" />
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-glow-accent">AI-Powered Prosthetic Control Demo</CardTitle>
                <CardDescription className="pt-2">A client-side simulation demonstrating how AI could interpret muscle (EMG) signals to control a prosthetic limb in real-time.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        {/* Left Side: Visualization */}
        <div className="space-y-4">
            <Card className="bg-muted/50 p-4">
                <h3 className="text-lg font-semibold text-center mb-2">Prosthetic Arm Control</h3>
                <div className="w-full h-64 mx-auto">
                   <RoboticArm angle={predictedAngle} />
                </div>
            </Card>
            <div>
                <label className="text-sm font-medium">Target Angle: {targetAngle.toFixed(0)}°</label>
                <Slider
                    value={[targetAngle]}
                    onValueChange={(value) => setTargetAngle(value[0])}
                    max={180}
                    min={-180}
                    step={1}
                />
            </div>
            <div className="flex justify-center">
                 <Button onClick={() => setIsPaused(p => !p)}>
                    {isPaused ? <Play className="mr-2" /> : <Pause className="mr-2" />}
                    {isPaused ? 'Resume' : 'Pause'}
                </Button>
            </div>
        </div>

        {/* Right Side: EMG Signals */}
        <div className="space-y-4">
             <h3 className="text-lg font-semibold text-center">Simulated EMG Signals (4-Channel)</h3>
             <div className="grid grid-cols-2 gap-2 h-80">
                {emgData.map((channelData, i) => (
                    <Card key={i} className="bg-muted/50 p-1">
                        <p className="text-xs text-center text-muted-foreground">Channel {i + 1}</p>
                        <div className="h-full w-full">
                            <EmgSignalChart data={channelData} />
                        </div>
                    </Card>
                ))}
            </div>
             <p className="text-xs text-muted-foreground text-center italic">
                Disclaimer: This is a conceptual demo using simulated data. It does not use real a ML model.
             </p>
        </div>
      </CardContent>
    </Card>
  );
}
