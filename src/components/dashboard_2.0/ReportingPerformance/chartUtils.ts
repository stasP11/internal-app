import { DateTime } from "luxon";
import reports from "./mockReports.json";
import { chartColors } from "./chartConfigs";
import { AggregateWeeklyData, MonthlyStatistics, WeeklyCounts } from "./types";

// Utility function to filter reports based on date
export const filterReports = (start: DateTime, end: DateTime) => {
  return reports.filter((report) => {
    const reportSubmitDate = DateTime.fromISO(report.submitDate);
    return reportSubmitDate >= start && reportSubmitDate < end;
  });
};

// Utility function to aggregate the stats
export const getWeeklyStats = (filteredReports: typeof reports) => {
  return filteredReports.reduce(
    (acc: { [key: string]: WeeklyCounts }, report) => {
      let week = DateTime.fromISO(report.submitDate)
        .endOf("week")
        .toFormat("yyyy-LL-dd");

      if (!acc[week]) {
        acc[week] = { total: 0, success: 0, manuallyMapped: 0 };
      }

      acc[week].total += 1;
      if (report.status.toUpperCase() === "SUCCESS") acc[week].success += 1;
      if (report.status.toUpperCase() === "REVIEW")
        acc[week].manuallyMapped += 1;

      return acc;
    },
    {}
  );
};

export const getDueDates = (dayOfMonth: number) => {
  const dueDates = [];
  for (let i = 3; i > 0; i--) {
    let dueDate = DateTime.now().minus({ months: i }).set({ day: dayOfMonth });
    dueDates.push(dueDate);
  }
  return dueDates;
};

export const getStatArray = (
  weeklyStats: AggregateWeeklyData,
  startingDate: DateTime
) => {
  const initStatData = {
    submitDate: startingDate.toJSDate(),
    total: 0,
    success: 0,
    manuallyMapped: 0,
  };
  return [
    initStatData,
    ...Object.keys(weeklyStats)
      .sort()
      .map((week) => ({
        submitDate: DateTime.fromFormat(week, "yyyy-LL-dd").toJSDate(),
        ...weeklyStats[week],
      })),
  ];
};

//Create config for Line Chart

const commonTickLabelStyles = {
  color: "var(--grey-700)",
  fontSize: 12,
  fontFamily: "Helvetica Neue",
};

export const createXAxis = (statArray: MonthlyStatistics[]) => [
  {
    scaleType: "time" as const,
    data: statArray.map((item) => item.submitDate),
    tickNumber: 4,
    tickLabelInterval: (value: any, index: number) => index !== 3,
    tickLabelStyle: { ...commonTickLabelStyles },
    disableTicks: true,
    disableLine: true,
  },
];

export const createYAxis = () => [
  {
    tickNumber: 3,
    tickLabelStyle: { ...commonTickLabelStyles, transform: "translateX(-1%)" },
    disableTicks: true,
    disableLine: true,
  },
];

export const createSeries = (statArray: MonthlyStatistics[]) => [
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
];
