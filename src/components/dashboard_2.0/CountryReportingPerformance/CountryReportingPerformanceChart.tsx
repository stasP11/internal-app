import { BarChart } from "@mui/x-charts";
import { createSeries, createXAxis, createYAxis } from "./chartUtils";

export interface CountryReportingPerformanceStats {
  country_code: string;
  country: string;
  totalExpectedReports: number;
  inTime: number;
  onTime: number;
  notReported: number;
}

interface CountryReportingPerformanceChartProps {
  stats: CountryReportingPerformanceStats[];
}

function CountryReportingPerformanceChart({
  stats,
}: CountryReportingPerformanceChartProps) {
  return (
    <BarChart
      xAxis={createXAxis()}
      yAxis={createYAxis(stats)}
      layout="horizontal"
      series={createSeries(stats)}
      height={250}
      width={550}
      margin={{ top: 5, left: 40, right: 20, bottom: 30 }}
      slotProps={{ legend: { hidden: true } }}
      grid={{ vertical: true }}
    />
  );
}

export default CountryReportingPerformanceChart;
