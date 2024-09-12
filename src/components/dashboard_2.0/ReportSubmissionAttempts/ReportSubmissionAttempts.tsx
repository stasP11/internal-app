import ChartContainer from "../shared/ChartContainer";
import CustomLegend from "../shared/CustomLegend";
import ReportSubmissionAttempsChart from "./ReportSubmissionAttemptsChart";
import useReportSubmissionAttempts from "hooks/swr-hooks/useReportSubmissionAttempts";
import { formatBarChartData } from "./chartUtils";

export const chartColors = {
  inventory: "var(--blue)",
  sellout: "var(--bright-blue)",
};

export const reportSubmissionAttemptsLegendConfig = [
  {
    color: "var(--red)",
    label: "No successful report submit",
    shape: "circle",
  },
];

function ReportSubmissionAttempts({ country }: { country: string }) {
  const { reportSubmissionAttempts, isLoading, isError } =
    useReportSubmissionAttempts(country);

  const data = reportSubmissionAttempts?.data || [];

  const dataset = formatBarChartData(data);

  return (
    <ChartContainer title="Report submission attempts per 1 success">
      <CustomLegend legendConfig={reportSubmissionAttemptsLegendConfig} />
      <ReportSubmissionAttempsChart dataset={dataset} />
    </ChartContainer>
  );
}

export default ReportSubmissionAttempts;
