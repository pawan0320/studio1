'use client';

import { useState, useEffect } from 'react';
import { FileText, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-glow-primary md:text-7xl lg:text-8xl">
            Pawan Sai Kodali
          </h1>
          <p className="mt-4 max-w-2xl mx-auto lg:mx-0 font-body text-lg text-muted-foreground md:text-xl">
            I’m a passionate Full-Stack Developer with experience in the MERN stack, AI-driven systems, and IoT projects. I’ve built real-time chat apps, intelligent robotics, and recognition platforms. Currently, I’m working on an Empowering Teacher Multi-Grade Class App and a Sign Language Recognition & Synthesis Software, focusing on building impactful and inclusive tech solutions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Button asChild size="lg" className="glow-primary">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://drive.google.com/file/d/1V1QLhGdQt3amrdFOTivPQyLaS9lNPNTH/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2"/>
                Resume
              </a>
            </Button>
             <Button asChild size="lg" variant="outline">
              <a href="#contact">
                <Handshake className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
        <div className="h-[400px] lg:h-[600px] w-full flex items-center justify-center">
          {isMounted && <Spline scene="https://prod.spline.design/dsLuDpikyTdypqfx/scene.splinecode" />}
        </div>
      </div>
    </section>
  );
}
