import { ReactNode } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}