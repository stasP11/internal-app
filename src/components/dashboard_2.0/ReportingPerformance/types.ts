export type WeeklyCounts = {
  total: number;
  success: number;
  manuallyMapped: number;
};

export type AggregateWeeklyData = {
  [key: string]: WeeklyCounts;
};

export type MonthlyStatistics = {
  submitDate: Date;
  total: number;
  success: number;
  manuallyMapped: number;
};
