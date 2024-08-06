export const chartColors = {
  total: "var(--grey-500)",
  success: "var(--bright-blue)",
  manualMapping: "var(--blue)",
  dueDate: "var(--raspberry-10)",
  failed: "var(--red)",
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
    color: chartColors.failed,
    label: "Failed",
    shape: "circle",
  },
  {
    color: chartColors.dueDate,
    label: "Due Day",
    shape: "rectangle",
  },
];

export const reportTypeMapping = {
  SelloutReport: "sellout",
  InventoryReport: "inventory",
};
