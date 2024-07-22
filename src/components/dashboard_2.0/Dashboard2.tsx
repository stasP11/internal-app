import { Box } from "@mui/material";
import AggregationPerProduct from "./AggregationPerProduct/AggregationPerProduct";
import CountryReportingPerformance from "./CountryReportingPerformance/CountryReportingPerformance";
import ReportingPerformance from "./ReportingPerformance/ReportingPerformance";
import ReportSubmissionAttempts from "./ReportSubmissionAttempts/ReportSubmissionAttempts";

function Dashboard2() {
  return (
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={4}>
      <ReportingPerformance />
      <CountryReportingPerformance />
      <ReportSubmissionAttempts />
      <AggregationPerProduct />
    </Box>
  );
}

export default Dashboard2;
