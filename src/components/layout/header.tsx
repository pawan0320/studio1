
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BotIcon, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { href: '/#skills', label: 'Skills' },
  { href: '/#security', label: 'Security' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-sm border-b border-primary/20' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BotIcon className="h-8 w-8 text-primary text-glow-primary" />
          <span className="text-lg font-bold text-glow-primary">PSK</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
           {user ? (
             <Button variant="ghost" onClick={logout}><LogOut className="mr-2"/> Logout</Button>
           ) : (
             <Button variant="ghost" asChild><Link href="/login"><LogIn className="mr-2"/> Admin</Link></Button>
           )}
        </nav>
      </div>
    </header>
  );
}
