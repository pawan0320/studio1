'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 max-w-lg px-4">
      <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <h1 className="mb-4 text-center text-2xl font-bold">Admin Dashboard</h1>
        <p className="mb-6 text-center text-muted-foreground">
          Welcome, {user.email}!
        </p>
        <p className="mb-6 text-center">
          This is a protected area. You can add portfolio management tools here.
        </p>
        <Button onClick={logout} className="w-full">
          Log Out
        </Button>
      </div>
    </div>
  );
}
