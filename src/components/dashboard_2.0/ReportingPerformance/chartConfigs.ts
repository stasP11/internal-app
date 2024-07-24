export const chartColors = {
  total: "var(--grey-500)",
  success: "var(--bright-blue)",
  manualMapping: "var(--blue)",
  dueDate: "var(--raspberry-10)",
};

export const reportingPerfomanceChartLegendConfig = [
  { color: chartColors.total, label: "Total", shape: "circle" },
  { color: chartColors.success, label: "Success", shape: "circle" },
  {
    color: chartColors.manualMapping,
    label: "Manual Mapping",
    shape: "circle",
  },
  {
    color: chartColors.dueDate,
    label: "Due Day",
    shape: "rectangle",
  },
];
