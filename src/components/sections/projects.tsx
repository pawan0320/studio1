import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Threat Detection",
    description: "A real-time system that uses machine learning models to detect and mitigate cybersecurity threats.",
    image: "https://placehold.co/600x400.png",
    hint: "security server",
    tags: ["Python", "TensorFlow", "Scikit-learn", "Flask"],
    link: "#",
  },
  {
    title: "Secure Code Assistant",
    description: "An intelligent chatbot that helps developers write more secure code by identifying vulnerabilities.",
    image: "https://placehold.co/600x400.png",
    hint: "code laptop",
    tags: ["Next.js", "GenAI", "LangChain", "VectorDB"],
    link: "#",
  },
  {
    title: "Cloud Infrastructure Orchestrator",
    description: "Automated provisioning and management of secure cloud environments using Infrastructure as Code.",
    image: "https://placehold.co/600x400.png",
    hint: "cloud infrastructure",
    tags: ["Terraform", "Ansible", "AWS", "Docker"],
    link: "#",
  },
  {
    title: "Encrypted File Sharing Platform",
    description: "A web application for sharing files with end-to-end encryption, ensuring data privacy and integrity.",
    image: "https://placehold.co/600x400.png",
    hint: "file sharing",
    tags: ["React", "Node.js", "Cryptography", "MongoDB"],
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">My Creations</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A selection of projects where I've turned complex problems into elegant solutions.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
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
