import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Healthcare Booking",
    description: "A platform for booking healthcare appointments, with features for doctors and patients.",
    image: "https://placehold.co/600x400.png",
    hint: "healthcare doctor",
    tags: ["React", "Firebase", "Node.js"],
    link: "#",
  },
  {
    title: "Brain Tumor Detection",
    description: "An AI model that detects brain tumors from MRI scans with high accuracy.",
    image: "https://placehold.co/600x400.png",
    hint: "brain mri",
    tags: ["Python", "TensorFlow", "Keras"],
    link: "#",
  },
  {
    title: "IoT Smart Home",
    description: "A system to control and monitor home appliances using IoT devices.",
    image: "https://placehold.co/600x400.png",
    hint: "smart home",
    tags: ["Raspberry Pi", "Python", "MQTT"],
    link: "#",
  },
  {
    title: "AI Chess Bot",
    description: "A chess engine that uses reinforcement learning to play against human players.",
    image: "https://placehold.co/600x400.png",
    hint: "chess game",
    tags: ["Python", "Pygame", "AI"],
    link: "#",
  },
  {
    title: "Digital Twins",
    description: "Creating a digital replica of physical assets for real-time monitoring and simulation.",
    image: "https://placehold.co/600x400.png",
    hint: "digital twin",
    tags: ["IoT", "Azure", "Simulation"],
    link: "#",
  },
  {
    title: "Crop Recommendation",
    description: "An AI-powered system that recommends crops based on soil and climate data.",
    image: "https://placehold.co/600x400.png",
    hint: "agriculture farm",
    tags: ["Machine Learning", "Python", "Flask"],
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">My Projects</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A selection of projects where I've turned complex problems into elegant solutions.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={project.link} key={project.title} className="block group">
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
          </Link>
        ))}
      </div>
    </section>
  );
}
