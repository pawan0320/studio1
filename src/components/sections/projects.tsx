
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

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
    description: "An AI model that detects and classifies brain tumors from MRI scans with 99.2% accuracy. Click to try the live demo!",
    image: "https://placehold.co/600x400.png",
    hint: "brain mri",
    tags: ["AI", "Machine Learning", "TensorFlow", "Genkit"],
    githubUrl: "https://github.com/pawan0320/Brain-Tumor-Detection",
    demoUrl: "#ai-playground",
  },
  {
    id: "hand-gesture",
    title: "Hand Gesture & Movement Recognition for Human-Computer Interaction",
    description: "A system that recognizes hand gestures and movements to provide a natural way to interact with computers. Click for a live demo!",
    image: "https://placehold.co/600x400.png",
    hint: "hand gesture recognition",
    tags: ["AI", "Computer Vision", "OpenCV", "Python", "Genkit"],
    githubUrl: "#",
    linkedinUrl: "#",
    demoUrl: "#ai-playground",
  },
  {
    id: "crop-recommender",
    title: "AI Crop Recommendation System",
    description: "A rule-based system that recommends the best crop to plant based on soil and environmental factors. Click to try the live demo!",
    image: "https://placehold.co/600x400.png",
    hint: "agriculture farm",
    tags: ["AI", "Client-Side", "React", "Rule-Based"],
    githubUrl: "#",
    demoUrl: "#ai-playground",
  },
  {
    id: "stock-prediction",
    title: "Live Stock Price Prediction",
    description: "An LSTM model to predict stock prices based on historical data. Showcases time-series analysis.",
    image: "https://placehold.co/600x400.png",
    hint: "stock market chart",
    tags: ["AI", "Machine Learning", "LSTM", "TensorFlow"],
    githubUrl: "#",
    demoUrl: "#ai-playground",
  },
  {
    id: "sign-language",
    title: "Sign Language Recognition & Translation",
    description: "A mobile app that translates sign language into text and speech in real-time, built with React Native.",
    image: "https://placehold.co/600x400.png",
    hint: "sign language mobile app",
    tags: ["AI", "Computer Vision", "React Native", "TensorFlow Lite"],
    githubUrl: "#",
    demoUrl: "#ai-playground",
  },
  {
    id: "prosthetic-control",
    title: "AI-Powered Prosthetic Control",
    description: "Developing an intuitive control system for prosthetic limbs using AI to interpret muscle signals, allowing for more natural and fluid movements.",
    image: "https://placehold.co/600x400.png",
    hint: "prosthetic arm robotics",
    tags: ["AI", "Robotics", "Signal Processing", "Machine Learning"],
    githubUrl: "#",
    demoUrl: "#ai-playground",
  },
   {
    id: "drug-discovery",
    title: "Drug Discovery with Deep Learning",
    description: "Utilizing deep learning models to predict molecular properties and identify potential drug candidates, accelerating the discovery process.",
    image: "https://placehold.co/600x400.png",
    hint: "molecule drug discovery",
    tags: ["AI", "Deep Learning", "Bioinformatics", "PyTorch"],
    githubUrl: "#",
    demoUrl: "#ai-playground",
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
    if (project.demoUrl === '#ai-playground') {
        const playground = document.getElementById('ai-playground');
        if (playground) {
          playground.scrollIntoView({ behavior: 'smooth' });
        }
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
      <ScrollArea className="mt-12 h-[70vh]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pr-4">
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
      </ScrollArea>
    </section>
  );
}
