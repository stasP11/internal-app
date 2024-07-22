import ChartContainer from "../shared/ChartContainer";
import CustomLegend from "../shared/CustomLegend";
import ReportSubmissionAttempsChart from "./ReportSubmissionAttemptsChart";

export const chartColors = {
  sellout: "var(--blue)",
  inventory: "var(--bright-blue)",
};

export const reportSubmissionAttemptsLegendConfig = [
  { color: chartColors.sellout, label: "Sellout", shape: "circle" },
  { color: chartColors.inventory, label: "Inventory", shape: "circle" },
];
function ReportSubmissionAttempts() {
  return (
    <ChartContainer title="Report submission attempts per 1 success">
      <CustomLegend legendConfig={reportSubmissionAttemptsLegendConfig} />
      <ReportSubmissionAttempsChart />
    </ChartContainer>
  );
}

export default ReportSubmissionAttempts;
