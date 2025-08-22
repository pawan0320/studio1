import { cn } from '@/lib/utils';

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
    <section id="security" className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden py-24">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="text-center z-10 mb-16 px-4">
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">Fortified by Design</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Building high-performance systems with security at the core, not as an afterthought.
          </p>
        </div>

        <div className="relative h-[480px] w-full flex items-center justify-center">
          {codeSnippets.map(({ code, style }, index) => (
            <div key={index} className="absolute top-1/2 left-1/2 code-orbit" style={style}>
              <code className="font-code text-sm text-accent text-glow-accent whitespace-nowrap p-2 rounded-md bg-background/50 backdrop-blur-sm">
                {code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
