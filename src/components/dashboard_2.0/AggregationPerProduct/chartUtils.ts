import { DateTime } from "luxon";
import reports from "./weeklyProductSales.json";
import { WeeklyProductSales } from "./types";
import { chartColors } from "./chartConfigs";

// Utility function to filter reports based on date
export const filterReports = (start: DateTime, end: DateTime) => {
  return reports.filter((report) => {
    const reportSubmitDate = DateTime.fromISO(report.date);
    return reportSubmitDate >= start && reportSubmitDate < end;
  });
};

// Utility function to aggregate the stats
export const getWeeklyStats = (
  filteredReports: typeof reports,
  startingDate: DateTime
) => {
  return filteredReports.reduce(
    (acc: { [key: string]: { [productId: string]: number } }, report) => {
      let week = DateTime.fromISO(report.date)
        .endOf("week")
        .toFormat("yyyy-LL-dd");

      let startingDateString = startingDate.toFormat("yyyy-LL-dd");

      if (!acc[startingDateString]) {
        acc[startingDateString] = {
          ProductID1: 0,
          ProductID2: 0,
          ProductID3: 0,
          ProductID4: 0,
          ProductID5: 0,
          ProductID6: 0,
        };
      }

      if (!acc[week]) {
        acc[week] = {};
      }

      if (!acc[week][report.productId]) {
        acc[week][report.productId] = 0;
      }

      acc[week][report.productId] += report.units;

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
  weeklyStats: { [key: string]: { [productId: string]: number } },
  startingDate: DateTime
): WeeklyProductSales[] => {
  return Object.keys(weeklyStats)
    .sort()
    .map(
      (week): WeeklyProductSales => ({
        week: DateTime.fromISO(week),
        sales: weeklyStats[week],
      })
    )
    .filter((item) => item.week >= startingDate);
};

//Create config for Line Chart

const commonTickLabelStyles = {
  color: "var(--grey-700)",
  fontSize: 12,
  fontFamily: "Helvetica Neue",
};

export const createXAxis = (statArray: WeeklyProductSales[]) => [
  {
    scaleType: "time" as const,
    data: statArray.map((item) => item.week),
    tickNumber: 4,
    tickLabelStyle: { ...commonTickLabelStyles },
    disableTicks: true,
  },
];

export const createYAxis = () => [
  {
    tickNumber: 6,
    tickLabelStyle: { ...commonTickLabelStyles, transform: "translateX(-1%)" },
    disableTicks: true,
    disableLine: true,
  },
];

export const createSeries = (statArray: WeeklyProductSales[]) => {
  // Obtain unique productId's from statArray
  let productIds: string[] = statArray.reduce((unique, item) => {
    Object.keys(item.sales).forEach((productId) => {
      if (!unique.includes(productId)) {
        unique.push(productId);
      }
    });
    return unique;
  }, [] as string[]);

  // For each productId, create a series object
  let series = productIds.map((productId) => ({
    data: statArray.map((item) => item.sales[productId] ?? 0),
    showMark: false,
    curve: "linear" as const,
    label: productId,
    color: (chartColors as Record<string, string>)[productId],
  }));

  return series;
};
