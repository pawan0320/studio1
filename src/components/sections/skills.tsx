import { Card } from "@/components/ui/card";
import { BrainCircuit, Code, Database, Server, Wind, Bot } from 'lucide-react';

const skills = [
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'HTML5', category: 'Web' },
  { name: 'CSS3', category: 'Web' },
  { name: 'React.js', category: 'Web' },
  { name: 'Node.js', category: 'Web' },
  { name: 'Express.js', category: 'Web' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },
  { name: 'SQLite', category: 'Databases' },
  { name: 'Git', category: 'Tools' },
  { name: 'Docker', category: 'Tools' },
  { name: 'Jenkins', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'AWS (EC2)', category: 'Cloud' },
];

const SkillCard = ({ name }: { name: string }) => (
    <div className="group rounded-lg [perspective:1000px]">
        <div className="relative h-full transform-style-3d transition-transform duration-700 group-hover:rotate-y-180">
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-card border border-primary/20 backface-hidden">
                <p className="font-headline text-lg font-medium">{name}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary/90 text-primary-foreground rotate-y-180 backface-hidden glow-primary">
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
          <SkillCard key={skill.name} name={skill.name} />
        ))}
      </div>
    </section>
  );
}
