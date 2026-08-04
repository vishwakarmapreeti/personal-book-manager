import api from './api';

import { DashboardStatisticsResponse } from '@/types/dashboard';

export async function getDashboardStatistics() {
  const response =
    await api.get<DashboardStatisticsResponse>(
      '/dashboard/stats'
    );

  return response.data;
}