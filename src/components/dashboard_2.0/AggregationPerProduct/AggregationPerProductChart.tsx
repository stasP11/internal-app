import { axisClasses, LineChart } from "@mui/x-charts";
import { DateTime } from "luxon";
import { createSeries, createXAxis, createYAxis } from "./chartUtils";
import { WeeklyProductSales } from "./types";

type PerformanceLineChartProps = {
  statArray: WeeklyProductSales[];
  dueDates: DateTime[];
};

function AggregationPerProductChart({ statArray }: PerformanceLineChartProps) {
  return (
    <LineChart
      sx={{
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
          transform: "translate(13%, 2%)",
        },
        [`& .${axisClasses.line}`]: {
          stroke: "var(--grey-300)",
        },
      }}
      slotProps={{ legend: { hidden: true } }}
      xAxis={createXAxis(statArray)}
      margin={{ top: 5, left: 50, right: 20, bottom: 30 }}
      yAxis={createYAxis()}
      series={createSeries(statArray)}
      height={250}
      width={550}
      grid={{ vertical: true }}
    ></LineChart>
  );
}

export default AggregationPerProductChart;
