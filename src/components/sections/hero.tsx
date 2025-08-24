'use client';

import { FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      
      <div className="container mx-auto flex flex-col items-center text-center relative z-10 px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-glow-primary md:text-7xl lg:text-8xl">
            Pawan Sai Kodali
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-muted-foreground md:text-xl">
            I’m a passionate Full-Stack Developer with experience in the MERN stack, AI-driven systems, and IoT projects. I’ve built real-time chat apps, intelligent robotics, and recognition platforms. Currently, I’m working on an Empowering Teacher Multi-Grade Class App and a Sign Language Recognition & Synthesis Software, focusing on building impactful and inclusive tech solutions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                <MessageCircle className="mr-2" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
