
'use client';

import withAuth from '@/components/layout/with-auth';
import { useAuth } from '@/hooks/use-auth.tsx';
import { Button } from '@/components/ui/button';

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome, {user?.email}</p>
        <Button onClick={logout} className="mt-8">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
