'use client';

import { useEffect } from 'react';

import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsGrid from '@/components/dashboard/StatsGrid';

import { useDashboardStore } from '@/store/dashboard.store';
import RecentBooks from '@/components/dashboard/RecentBooks';

export default function DashboardPage() {
  const {
    recentBooks,
    statistics,
    loading,
    fetchStatistics,
  } = useDashboardStore();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  if (loading || !statistics) {
    return (
      <p className="text-lg">
        Loading Dashboard...
      </p>
    );
  }

  return (
    <>
      <WelcomeCard />

      <StatsGrid
        statistics={statistics}
      />
      <RecentBooks books={recentBooks} />
    </>
  );
}