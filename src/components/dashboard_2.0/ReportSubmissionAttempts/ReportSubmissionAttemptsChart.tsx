import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarSeriesType } from "@mui/x-charts";
import { chartColors } from "./ReportSubmissionAttempts";
import { FormattedDataForChart, IncomingData } from "./types";
import { trimLabelString } from "./chartUtils";

interface ReportSubmissionAttempsChartProps {
  dataset: FormattedDataForChart[];
}

export default function ReportSubmissionAttempsChart({
  dataset,
}: ReportSubmissionAttempsChartProps) {
  const chartSettings: Partial<BarChartProps> = {
    dataset,
    height: 250,
    width: 550,
    margin: { top: 20, left: 130, right: 20, bottom: 20 },
    grid: { vertical: true },
    yAxis: [
      {
        scaleType: "band",
        dataKey: "distributor_name",
        disableTicks: true,
        fill: "#f7f8f9",
        valueFormatter: trimLabelString,
        barGapRatio: -1,
        categoryGapRatio: 0.4,
      } as any,
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
      dataKey: "inventoryAverage",
      label: "Inventory",
      layout: "horizontal",
      stack: "stack",
      valueFormatter: (value: number) => Math.abs(value),
      color: chartColors.inventory,
    },
    {
      dataKey: "selloutAverage",
      label: "Sellout",
      layout: "horizontal",
      stack: "stack",
      color: chartColors.sellout,
    },
    {
      dataKey: "selloutSuccessCount",
      label: "",
      layout: "horizontal",
      stack: "stack1",
      color: "var(--red)",
      valueFormatter: (value: number) => null,
    },
    {
      dataKey: "inventorySuccessCount",
      label: "",
      layout: "horizontal",
      valueFormatter: (value: number) => null,
      stack: "stack1",
      color: "var(--red)",
    },
  ];

  return (
    <>
      <BarChart series={series as BarSeriesType[]} {...chartSettings} />
    </>
  );
}
