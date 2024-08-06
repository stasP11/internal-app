import { Box } from "@mui/material";
import AggregationPerProduct from "./AggregationPerProduct/AggregationPerProduct";
import CountryReportingPerformance from "./CountryReportingPerformance/CountryReportingPerformance";
import ReportingPerformance from "./ReportingPerformance/ReportingPerformance";
import ReportSubmissionAttempts from "./ReportSubmissionAttempts/ReportSubmissionAttempts";
import { getFromLocalStorage } from "services/storageInterection";

function Dashboard2() {
  const country = getFromLocalStorage("selectedCountry");
  return (
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={4}>
      <ReportingPerformance country={country} />
      <CountryReportingPerformance />
      <ReportSubmissionAttempts country={country} />
      <AggregationPerProduct country={country} />
    </Box>
  );
}

export default Dashboard2;
