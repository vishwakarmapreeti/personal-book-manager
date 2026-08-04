import {
  FiBookOpen,
  FiBookmark,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';

import StatsCard from './StatsCard';

import { DashboardStatistics } from '@/types/dashboard';

interface StatsGridProps {
  statistics: DashboardStatistics;
}

export default function StatsGrid({
  statistics,
}: StatsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Books"
        value={statistics.totalBooks}
        icon={
          <FiBookOpen
            size={28}
            className="text-white"
          />
        }
        iconBgColor="bg-blue-600"
      />

      <StatsCard
        title="Want to Read"
        value={statistics.wantToRead}
        icon={
          <FiBookmark
            size={28}
            className="text-white"
          />
        }
        iconBgColor="bg-amber-500"
      />

      <StatsCard
        title="Reading"
        value={statistics.reading}
        icon={
          <FiClock
            size={28}
            className="text-white"
          />
        }
        iconBgColor="bg-violet-600"
      />

      <StatsCard
        title="Completed"
        value={statistics.completed}
        icon={
          <FiCheckCircle
            size={28}
            className="text-white"
          />
        }
        iconBgColor="bg-green-600"
      />
    </div>
  );
}