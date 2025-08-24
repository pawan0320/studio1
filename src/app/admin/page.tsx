'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-20 max-w-lg px-4">
      <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <h1 className="mb-4 text-center text-2xl font-bold">Admin Dashboard</h1>
        <p className="mb-6 text-center text-muted-foreground">
          Welcome!
        </p>
        <p className="mb-6 text-center">
          This is a protected area. You can add portfolio management tools here.
        </p>
        <Button onClick={() => router.push('/')} className="w-full">
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
