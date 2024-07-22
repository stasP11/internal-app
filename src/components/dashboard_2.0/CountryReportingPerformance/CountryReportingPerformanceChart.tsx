import { BarChart } from "@mui/x-charts";
import { createSeries, createXAxis, createYAxis } from "./chartUtils";

export interface CountryReportingPerformanceStats {
  country: string;
  totalExpectedReports: number;
  inTime: number;
  onTime: number;
  notReported: number;
}

interface Props {
  stats: CountryReportingPerformanceStats[];
}

function CountryReportingPerformanceChart({ stats }: Props) {
  return (
    <BarChart
      xAxis={createXAxis()}
      yAxis={createYAxis(stats)}
      layout="horizontal"
      series={createSeries(stats)}
      height={250}
      width={550}
      margin={{ top: 5, left: 50, right: 20, bottom: 30 }}
      slotProps={{ legend: { hidden: true } }}
      grid={{ vertical: true }}
    />
  );
}

export default CountryReportingPerformanceChart;
