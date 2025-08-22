import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Brewed Awakening Coffee Shop Website",
    description: "A modern and responsive website for a local coffee shop, featuring a menu, gallery, and contact information.",
    image: "https://placehold.co/600x400.png",
    hint: "coffee shop",
    tags: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    link: "#",
  },
  {
    title: "IoT Smart Home Automation",
    description: "A system to control and monitor home appliances remotely using IoT devices, built on Raspberry Pi.",
    image: "https://placehold.co/600x400.png",
    hint: "smart home",
    tags: ["IoT", "Raspberry Pi", "Python", "MQTT"],
    link: "#",
  },
  {
    title: "Digital Twin Simulation",
    description: "Developed a digital replica of physical assets for real-time monitoring, analysis, and simulation.",
    image: "https://placehold.co/600x400.png",
    hint: "digital twin",
    tags: ["IoT", "Azure", "Simulation", "Data Analytics"],
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">My Past Work</h2>
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
