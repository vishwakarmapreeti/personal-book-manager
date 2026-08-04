import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        {children}
      </div>
    </main>
  );
}