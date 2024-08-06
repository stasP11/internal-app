import { DateTime } from "luxon";

export type AggregateDailyData = {
  [key: string]: DailyStatistics;
};
export interface DailyStatistics {
  date?: DateTime;
  total: number;
  success: number;
  manuallyMapped: number;
  failed: number;
}
export type ReportType = "SelloutReport" | "InventoryReport";

export type ReportPerformance = {
  report_type: ReportType;
  received_date: string;
  failed_count: number;
  success_count: number;
  approve_count: number;
  total: 1;
};

export interface DueDate {
  reporting_period_start: string;
  report_type: string;
  due_date: string;
}
