export const chartColors = {
  inTime: "var(--blue)",
  onTime: "var(--bright-blue)",
  notReported: "var(--grey-200)",
};

export const countryPerformanceChartLegendConfig = [
  { color: chartColors.inTime, label: "In time", shape: "circle" },
  { color: chartColors.onTime, label: "On time", shape: "circle" },
  {
    color: chartColors.notReported,
    label: "Not reported",
    shape: "circle",
  },
];

export const seriesConfig = {
  inTime: { label: "In Time", color: chartColors.inTime },
  onTime: { label: "On Time", color: chartColors.onTime },
  notReported: { label: "Not Reported", color: chartColors.notReported },
};
