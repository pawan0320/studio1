import { Cpu, ShieldCheck, Database, Cloud, BrainCircuit, Code2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiReact, SiJavascript, SiFirebase, SiAmazon, SiNodedotjs, SiPython } from '@icons-pack/react-simple-icons';

const SKILL_ICONS = [
  { Icon: SiReact, className: 'text-cyan-400', style: { animationDelay: '0s' } },
  { Icon: SiJavascript, className: 'text-yellow-400', style: { animationDelay: '-5s' } },
  { Icon: SiFirebase, className: 'text-orange-400', style: { animationDelay: '-10s' } },
  { Icon: SiAmazon, className: 'text-orange-500', style: { animationDelay: '-15s' } },
  { Icon: SiNodedotjs, className: 'text-green-400', style: { animationDelay: '-20s' } },
  { Icon: SiPython, className: 'text-blue-400', style: { animationDelay: '-25s' } },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-40"></div>
      </div>

      {/* Blackhole Video and Orbiting Icons */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        <div 
          className="absolute w-64 h-64 md:w-80 md:h-80 pulse"
          style={{
            boxShadow: '0 0 20px 5px hsl(var(--primary) / 0.6), 0 0 50px 20px hsl(var(--accent) / 0.4)',
          }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            src="/blackhole.webm"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        {SKILL_ICONS.map(({ Icon, className, style }, index) => (
            <div key={index} className="absolute top-1/2 left-1/2 orbit" style={style}>
              <div className="w-12 h-12 bg-card/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon className={`w-7 h-7 ${className}`} />
              </div>
            </div>
        ))}
      </div>


      <div className="absolute z-10 text-center px-4">
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
