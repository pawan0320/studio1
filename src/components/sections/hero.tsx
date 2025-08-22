import { Cpu, ShieldCheck, Database, Cloud, BrainCircuit, Code2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-40"></div>
      </div>

      {/* Blackhole Video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <div 
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full pulse"
          style={{
            boxShadow: '0 0 20px 5px hsl(var(--primary) / 0.6), 0 0 50px 20px hsl(var(--accent) / 0.4)',
          }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover rounded-full"
            src="/blackhole.webm"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-glow-primary md:text-7xl lg:text-8xl">
          Pawan Sai Kodali
        </h1>
        <p className="mt-4 max-w-2xl mx-auto font-body text-lg text-muted-foreground md:text-xl">
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
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent glow-accent">
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
