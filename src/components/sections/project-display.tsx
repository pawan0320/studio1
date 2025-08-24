
import type { Project } from "./projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, ExternalLink } from "lucide-react";

interface ProjectDisplayProps {
  project: Project;
}

export default function ProjectDisplay({ project }: ProjectDisplayProps) {
  return (
    <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10 flex flex-col lg:flex-row">
      <div className="lg:w-1/2">
        <div className="aspect-video relative overflow-hidden lg:rounded-l-lg lg:h-full">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.hint}
          />
        </div>
      </div>
      <div className="lg:w-1/2 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-glow-accent">{project.title}</CardTitle>
          <CardDescription className="pt-2 text-base">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" />
                        View on GitHub
                    </Link>
                </Button>
                {project.linkedinUrl && project.linkedinUrl !== "#" ? (
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent">
                        <Link href={project.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-5 w-5" />
                            View on LinkedIn
                        </Link>
                    </Button>
                ) : (
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent">
                        <Link href={project.demoUrl!} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5" />
                            View Live Demo
                        </Link>
                    </Button>
                )}
            </div>
        </CardContent>
      </div>
    </Card>
  );
}
