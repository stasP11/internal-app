import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarSeriesType } from "@mui/x-charts";
import mockData from "./mockData.json";
import { chartColors } from "./ReportSubmissionAttempts";

export default function ReportSubmissionAttempsChart() {
  const chartSettings: Partial<BarChartProps> = {
    dataset: mockData.map((distributor) => ({
      ...distributor,
      selloutAverage: Number(`-${distributor.selloutAverage}`),
    })),
    height: 250,
    width: 550,
    margin: { top: 20, left: 140, right: 20, bottom: 20 },
    grid: { vertical: true },
    yAxis: [
      {
        scaleType: "band",
        dataKey: "distributorName",
        disableTicks: true,
        fill: "#f7f8f9",
      },
    ],
    xAxis: [
      {
        tickNumber: 6,
        disableTicks: true,
        valueFormatter: (value) => `${Math.abs(value)}`,
      },
    ],
    sx: {
      [`& .${axisClasses.line}`]: {
        stroke: "var(--grey-300)",
      },
    },
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  const series = [
    {
      dataKey: "selloutAverage",
      label: "Sellout",
      layout: "horizontal",
      stack: "stack",
      valueFormatter: (value: number) => Math.abs(value),
      color: chartColors.sellout,
    },
    {
      dataKey: "inventoryAverage",
      label: "Inventory",
      layout: "horizontal",
      stack: "stack",
      color: chartColors.inventory,
    },
  ];

  return <BarChart series={series as BarSeriesType[]} {...chartSettings} />;
}
