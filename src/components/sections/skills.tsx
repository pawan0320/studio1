import { Card } from "@/components/ui/card";
import { BrainCircuit, Code, Database, Server, Wind, Bot, Star, Shield, Cloud, LucideIcon, FileJson, GitCommit, Braces, Smartphone, Globe } from 'lucide-react';

const skills: { name: string; category: string; icon: LucideIcon }[] = [
  { name: 'Python', category: 'Languages', icon: Code },
  { name: 'Java', category: 'Languages', icon: Code },
  { name: 'C++', category: 'Languages', icon: Code },
  { name: 'JavaScript', category: 'Languages', icon: Code },
  { name: 'HTML5', category: 'Web', icon: Globe },
  { name: 'CSS3', category: 'Web', icon: Globe },
  { name: 'React.js', category: 'Web', icon: Smartphone },
  { name: 'Node.js', category: 'Web', icon: Server },
  { name: 'Express.js', category: 'Web', icon: Server },
  { name: 'MySQL', category: 'Databases', icon: Database },
  { name: 'MongoDB', category: 'Databases', icon: Database },
  { name: 'SQLite', category: 'Databases', icon: Database },
  { name: 'Git', category: 'Tools', icon: GitCommit },
  { name: 'Docker', category: 'Tools', icon: Wind },
  { name: 'Jenkins', category: 'Tools', icon: Bot },
  { name: 'GitHub', category: 'Tools', icon: GitCommit },
  { name: 'AWS (EC2)', category: 'Cloud', icon: Cloud },
];

const SkillCard = ({ name, icon: Icon }: { name: string; icon: LucideIcon }) => (
    <div className="group rounded-lg [perspective:1000px]">
        <div className="relative h-full transform-style-3d transition-transform duration-700 group-hover:rotate-y-180">
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-card border border-primary/20 backface-hidden p-4 text-center">
                <Icon className="w-12 h-12 text-primary mb-2" />
                <p className="font-headline text-lg font-medium">{name}</p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-primary/90 text-primary-foreground rotate-y-180 backface-hidden glow-primary p-4 text-center">
                 <Icon className="w-12 h-12 mb-2" />
                <p className="font-headline text-lg font-bold">{name}</p>
            </div>
        </div>
    </div>
);


export default function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">My Tech Arsenal</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of tools and technologies I wield to build powerful and secure applications.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </section>
  );
}
