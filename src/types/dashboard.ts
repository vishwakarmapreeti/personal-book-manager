export interface DashboardStatistics {
  totalBooks: number;
  wantToRead: number;
  reading: number;
  completed: number;
}

export interface DashboardStatisticsResponse {
  success: boolean;
  message: string;
  statistics: DashboardStatistics;
}