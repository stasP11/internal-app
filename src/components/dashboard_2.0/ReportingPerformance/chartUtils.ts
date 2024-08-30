import { DateTime } from "luxon";
import { chartColors, reportTypeMapping } from "./chartConfigs";
import {
  AggregateDailyData,
  DailyStatistics,
  DueDate,
  ReportPerformance,
  ReportType,
} from "./types";

export const getFormattedDueDates = (
  dueDates: DueDate[],
  reportType: ReportType,
  startOfPastThreeMonths: DateTime,
  endOfPastThreeMonths: DateTime
): DateTime[] => {
  const mappedReportType = reportTypeMapping[reportType];

  return dueDates.reduce((result: DateTime[], date) => {
    const dueDate = DateTime.fromISO(date.due_date);
    if (
      date.report_type === mappedReportType &&
      dueDate >= startOfPastThreeMonths &&
      dueDate <= endOfPastThreeMonths
    ) {
      return [...result, dueDate];
    }
    return result;
  }, []);
};

//Create config for Line Chart

const commonTickLabelStyles = {
  color: "var(--grey-700)",
  fontSize: 12,
  fontFamily: "Helvetica Neue",
};

export const createYAxis = () => [
  {
    tickNumber: 3,
    tickLabelStyle: { ...commonTickLabelStyles, transform: "translateX(-1%)" },
    disableTicks: true,
    disableLine: true,
  },
];

function initializeDailyStats(startDate: DateTime, endDate: DateTime) {
  let stats: AggregateDailyData = {};
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const day = currentDate.toFormat("yyyy-LL-dd");
    stats[day] = { total: 0, success: 0, manuallyMapped: 0, failed: 0 };
    currentDate = currentDate.plus({ day: 1 });
  }

  return stats;
}

export const getDailyStats = (
  reports: ReportPerformance[],
  startDate: DateTime,
  endDate: DateTime
) => {
  let initialStats = initializeDailyStats(startDate, endDate);

  return reports.reduce((acc: AggregateDailyData, report) => {
    let day = DateTime.fromISO(report.received_date).toFormat("yyyy-LL-dd");

    acc[day].total += report.total;
    acc[day].success += report.success_count;
    acc[day].manuallyMapped += report.approve_count;
    acc[day].failed += report.failed_count;

    return acc;
  }, initialStats);
};

export const getStatArray = (stats: AggregateDailyData) => {
  return Object.keys(stats).map((item) => ({
    date: DateTime.fromFormat(item, "yyyy-LL-dd"),
    ...stats[item],
  }));
};

export const createXAxis = (statArray: DailyStatistics[]) => [
  {
    scaleType: "time" as const,
    data: statArray.map((item) => item.date?.toJSDate()),
    tickNumber: 4,
    tickLabelInterval: (value: any, index: number) => index !== 3,
    tickLabelStyle: { ...commonTickLabelStyles },
    disableTicks: true,
    disableLine: true,
    valueFormatter: (date: Date, context: any) => {
      if (context.location === "tooltip") {
        return date?.toLocaleDateString();
      }
      return date.toLocaleDateString("en-US", { month: "short" });
    },
  },
];

export const createSeries = (statArray: DailyStatistics[]) => [
  {
    data: statArray.map((item) => item.total),
    curve: "linear" as const,
    label: "Total",
    color: chartColors.total,
  },
  {
    data: statArray.map((item) => item.success),
    curve: "linear" as const,
    label: "Success",
    color: chartColors.success,
  },
  {
    data: statArray.map((item) => item.manuallyMapped),
    curve: "linear" as const,
    label: "Manual mapping",
    color: chartColors.manualMapping,
  },
  {
    data: statArray.map((item) => item.failed),
    curve: "linear" as const,
    label: "Failed",
    color: chartColors.failed,
  },
];
