import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

const codeSnippets = [
  { code: `import { secure } from 'crypto';`, style: { animationDelay: '0s' } },
  { code: `const token = jwt.sign(user);`, style: { animationDelay: '-2.5s' } },
  { code: `app.use(helmet());`, style: { animationDelay: '-5s' } },
  { code: `bcrypt.hash(password, 10);`, style: { animationDelay: '-7.5s' } },
  { code: `const sanitized = DOMPurify.sanitize(dirty);`, style: { animationDelay: '-10s' } },
  { code: `if (!isAuth) throw new Error();`, style: { animationDelay: '-12.5s' } },
  { code: `ai.detect(threats);`, style: { animationDelay: '-15s' } },
  { code: `// TODO: Enhance encryption`, style: { animationDelay: '-17.5s' } },
];

export default function SecuritySection() {
  return (
    <section id="security" className="relative w-full flex items-center justify-center overflow-hidden py-24">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-[300px] w-full flex items-center justify-center">
           <Lock className="h-24 w-24 text-primary text-glow-primary z-10" />
          {codeSnippets.map(({ code, style }, index) => (
            <div key={index} className="absolute top-1/2 left-1/2 code-orbit z-0" style={style}>
              <code className="font-code text-sm text-accent text-glow-accent whitespace-nowrap p-2 rounded-md bg-background/50 backdrop-blur-sm">
                {code}
              </code>
            </div>
          ))}
        </div>
        <div className="text-center lg:text-left z-20 px-4">
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">Fortified by Design</h2>
          <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg text-muted-foreground">
            Building high-performance systems with security at the core, not as an afterthought.
          </p>
        </div>
      </div>
    </section>
  );
}
