import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_LINKS = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-primary/20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8">
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-primary hover:text-glow-primary"
            >
              <Icon className="h-6 w-6" />
            </Link>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pawan Sai Kodali. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
