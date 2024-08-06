import {
  ChartsReferenceLine,
  LineChart,
  markElementClasses,
} from "@mui/x-charts";
import { DateTime } from "luxon";
import { chartColors } from "./chartConfigs";
import { createSeries, createXAxis, createYAxis } from "./chartUtils";
import { DailyStatistics } from "./types";

type PerformanceLineChartProps = {
  statArray: DailyStatistics[];
  dueDates: DateTime[];
};

function ReportingPerformanceChart({
  statArray,
  dueDates,
}: PerformanceLineChartProps) {
  const referenceLines = dueDates.map((date, idx) => (
    <ChartsReferenceLine
      key={idx}
      x={date.toJSDate()}
      lineStyle={{ stroke: chartColors.dueDate, strokeWidth: "2px" }}
    />
  ));

  return (
    <>
      <LineChart
        sx={{
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            transform: "translate(13%, 2%)",
          },
          [`& .${markElementClasses.root}`]: {
            display: "none",
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        xAxis={createXAxis(statArray)}
        margin={{ top: 5, left: 50, right: 20, bottom: 30 }}
        yAxis={createYAxis()}
        series={createSeries(statArray)}
        height={250}
        width={550}
        grid={{ horizontal: true, vertical: true }}
      >
        {referenceLines}
      </LineChart>
    </>
  );
}

export default ReportingPerformanceChart;
