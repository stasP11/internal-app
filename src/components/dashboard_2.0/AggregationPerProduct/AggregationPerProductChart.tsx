import { axisClasses, LineChart } from "@mui/x-charts";
import { createSeries, createXAxis, createYAxis } from "./chartUtils";
import { DailyProductSales } from "./types";

type PerformanceLineChartProps = {
  statArray: DailyProductSales[];
};

function AggregationPerProductChart({ statArray }: PerformanceLineChartProps) {
  return (
    <>
      <LineChart
        sx={{
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            transform: "translate(13%, 2%)",
          },
          [`& .${axisClasses.line}`]: {
            stroke: "var(--grey-300)",
          },
        }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
            padding: 0,
            labelStyle: { fontSize: 12 },
            itemMarkWidth: 8,
            itemMarkHeight: 8,
            markGap: 5,
            itemGap: 10,
          },
        }}
        xAxis={createXAxis(statArray)}
        margin={{ top: 65, left: 100, right: 20, bottom: 25 }}
        yAxis={createYAxis()}
        series={createSeries(statArray)}
        height={250}
        width={550}
        grid={{ vertical: true }}
      ></LineChart>
    </>
  );
}

export default AggregationPerProductChart;
