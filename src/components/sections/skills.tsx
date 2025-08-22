import { Card } from "@/components/ui/card";
import { BrainCircuit, Code, Database, Server, Wind, Bot, Star, Shield, Cloud, LucideIcon, FileJson, GitCommit, Braces, Smartphone, Globe, Award } from 'lucide-react';

const skillsByCategory: { category: string; skills: { name: string; icon: LucideIcon }[] }[] = [
    {
        category: 'Cloud',
        skills: [
            { name: 'AWS (EC2)', icon: Cloud },
        ]
    },
    {
        category: 'Tools',
        skills: [
            { name: 'Git', icon: GitCommit },
            { name: 'Docker', icon: Wind },
            { name: 'Jenkins', icon: Bot },
            { name: 'GitHub', icon: GitCommit },
        ]
    },
    {
        category: 'Languages',
        skills: [
            { name: 'Python', icon: Code },
            { name: 'Java', icon: Code },
            { name: 'C++', icon: Code },
            { name: 'JavaScript', icon: Code },
        ]
    },
    {
        category: 'Web',
        skills: [
            { name: 'HTML5', icon: Globe },
            { name: 'CSS3', icon: Globe },
            { name: 'React.js', icon: Smartphone },
            { name: 'Node.js', icon: Server },
            { name: 'Express.js', icon: Server },
        ]
    },
    {
        category: 'Databases',
        skills: [
            { name: 'MySQL', icon: Database },
            { name: 'MongoDB', icon: Database },
            { name: 'SQLite', icon: Database },
        ]
    },
];

const pyramidSkills = skillsByCategory.flatMap(category => category.skills);

const pyramidStructure = [
    pyramidSkills.slice(0, 1), 
    pyramidSkills.slice(1, 5),
    pyramidSkills.slice(5, 12),
    pyramidSkills.slice(12, 17),
];


const SkillCard = ({ name, icon: Icon }: { name: string; icon: LucideIcon }) => (
    <div className="group rounded-lg [perspective:1000px]">
        <div className="relative h-28 w-28 transform-style-3d transition-transform duration-700 group-hover:rotate-y-180 group-hover:[transform:rotateY(180deg)] group-hover:shadow-[0_0_25px_hsl(var(--primary)),0_0_10px_hsl(var(--primary))]">
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-card border border-primary/20 backface-hidden p-4 text-center">
                <Icon className="w-10 h-10 text-primary mb-2" />
                <p className="font-headline text-sm font-medium">{name}</p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-primary/90 text-primary-foreground rotate-y-180 backface-hidden glow-primary p-4 text-center">
                 <Icon className="w-10 h-10 mb-2" />
                <p className="font-headline text-sm font-bold">{name}</p>
            </div>
        </div>
    </div>
);


export default function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">Making apps with modern technologies</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Never miss a task, deadline, or idea.
        </p>
      </div>
       <div className="mt-16 flex flex-col items-center space-y-8">
        {pyramidStructure.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center gap-6">
            {row.map((skill) => (
                <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
