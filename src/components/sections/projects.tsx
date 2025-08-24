
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  hint: string;
  tags: string[];
  githubUrl: string;
  linkedinUrl?: string; // Optional for projects without a LinkedIn post
  demoUrl?: string;
}

const projects: Project[] = [
   {
    id: "brain-tumor",
    title: "Brain Tumor Detection using DenseNet",
    description: "An AI model that detects and classifies brain tumors from MRI scans with 99.2% accuracy using the DenseNet architecture. Click to try the live demo!",
    image: "https://placehold.co/600x400.png",
    hint: "brain mri",
    tags: ["AI", "Machine Learning", "DenseNet", "TensorFlow", "Genkit"],
    githubUrl: "https://github.com/pawan0320/Brain-Tumor-Detection",
    demoUrl: "#", // The demo is shown in the AI playground
  },
  {
    id: "hand-gesture",
    title: "Hand Gesture & Movement Recognition for Human-Computer Interaction",
    description: "A system that recognizes hand gestures and movements to provide a natural and intuitive way to interact with computers.",
    image: "https://placehold.co/600x400.png",
    hint: "hand gesture recognition",
    tags: ["AI", "Computer Vision", "OpenCV", "Python"],
    githubUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: "coffee-shop",
    title: "Brewed Awakening Coffee Shop Website",
    description: "A modern and responsive website for a local coffee shop, featuring a menu, gallery, and contact information.",
    image: "https://placehold.co/600x400.png",
    hint: "coffee shop",
    tags: ["HTML", "CSS"],
    githubUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: "smart-home",
    title: "IoT Smart Home Automation",
    description: "A system to control and monitor home appliances remotely using IoT devices, built on Raspberry Pi.",
    image: "https://placehold.co/600x400.png",
    hint: "smart home",
    tags: ["IoT", "Raspberry Pi", "Python", "MQTT"],
    githubUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: "digital-twin",
    title: "Digital Twin Simulation",
    description: "Developed a digital replica of physical assets for real-time monitoring, analysis, and simulation.",
    image: "https://placehold.co/600x400.png",
    hint: "digital twin",
    tags: ["IoT", "Azure", "Simulation", "Data Analytics"],
    githubUrl: "#",
    linkedinUrl: "#",
  },
];

interface ProjectsSectionProps {
  setSelectedProject: (project: Project | null) => void;
}

export default function ProjectsSection({ setSelectedProject }: ProjectsSectionProps) {
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    const playground = document.getElementById('ai-playground');
    if (playground) {
      playground.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">My Past Work</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A selection of projects where I've turned complex problems into elegant solutions. Click a project to learn more and try the demos.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="block group cursor-pointer" onClick={() => handleProjectClick(project)}>
            <Card className="h-full bg-card border-primary/20 overflow-hidden tilt-card">
              <CardHeader>
                <div className="aspect-video relative overflow-hidden rounded-t-lg -mt-6 -mx-6">
                   <Image 
                     src={project.image} 
                     alt={project.title}
                     fill
                     className="object-cover transition-transform duration-300 group-hover:scale-105"
                     data-ai-hint={project.hint}
                    />
                </div>
                <CardTitle className="mt-6 text-2xl font-headline group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">{tag}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
