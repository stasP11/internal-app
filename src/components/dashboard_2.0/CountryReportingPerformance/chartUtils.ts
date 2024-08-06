import { ReportKey } from "./types";
import { seriesConfig } from "./chartConfigs";
import { CountryReportingPerformanceStats } from "./CountryReportingPerformanceChart";

export const calculatePercentage = (
  item: CountryReportingPerformanceStats,
  key: ReportKey
) => {
  const totalReports = item.totalExpectedReports;
  return totalReports ? (item[key] / totalReports) * 100 : 0;
};

export const formatter = (value: number | null) =>
  value ? `${value.toFixed(1)}%` : "0%";

const makeSeriesItem = (
  performanceData: CountryReportingPerformanceStats[],
  key: ReportKey,
  { label, color }: { label: string; color: string }
) => {
  const data = performanceData.map((item) => calculatePercentage(item, key));
  return {
    data,
    label,
    color,
    stack: "reports",
    valueFormatter: formatter,
  };
};

export const createSeries = (
  performanceData: CountryReportingPerformanceStats[]
) => {
  return Object.entries(seriesConfig).map(([key, config]) =>
    makeSeriesItem(performanceData, key as ReportKey, config)
  );
};

export const createXAxis = () => [
  {
    scaleType: "linear" as const,
    tickNumber: 4,
    max: 100,
    disableTicks: true,
    disableLine: true,
    valueFormatter: (value: number) =>
      value === 0 ? `${value}%` : value.toString(),
    tickLabelStyle: {
      fontSize: 12,
      fontFamily: "Helvetica Neue",
      transform: "translateY(2%)",
    },
  },
];

export const createYAxis = (
  performanceData: CountryReportingPerformanceStats[]
) => [
  {
    scaleType: "band" as const,
    data: performanceData.map((item) => item.country_code),
    disableTicks: true,
    disableLine: true,
    tickLabelStyle: {
      fontSize: 14,
      fontFamily: "Helvetica Neue",
      transform: "translateX(-2%)",
    },
  },
];
