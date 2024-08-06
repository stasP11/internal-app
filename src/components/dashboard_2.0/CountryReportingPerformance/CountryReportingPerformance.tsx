import CountryReportingPerformanceChart from "./CountryReportingPerformanceChart";
import { useState } from "react";
import { countryPerformanceChartLegendConfig } from "./chartConfigs";
import ChartContainer from "../shared/ChartContainer";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";
import CustomLegend from "../shared/CustomLegend";
import { Box } from "@mui/material";
import ToggleButtons from "../shared/ToggleButtons";
import DownloadButton from "../shared/DownloadButton";
import { ReportType } from "../ReportingPerformance/types";
import useCountryReportingPerformance from "hooks/swr-hooks/useCountryReportingPerformance";

function CountryReportingPerformance() {
  const [reportType, setReportType] = useState<ReportType>("SelloutReport");
  const { countryReportingPerformance, isLoading, isError } =
    useCountryReportingPerformance();

  const data = countryReportingPerformance?.data || [];

  const countryPerformanceByReportType = data.filter(
    (item: any) => item.report_type === reportType
  );
  const countryPerformanceChartStats = countryPerformanceByReportType
    .slice(0, 8)
    .map((item: any) => ({
      country_code: item.country_code,
      country: item.country,
      totalExpectedReports:
        item.in_time_report_count +
        item.on_time_report_count +
        item.missing_report_count,
      inTime: item.in_time_report_count,
      onTime: item.on_time_report_count,
      notReported: item.missing_report_count,
    }));

  return (
    <ChartContainer title="Country reporting performance">
      <ChartDetailsContainer>
        <CustomLegend legendConfig={countryPerformanceChartLegendConfig} />
        <Box display={"flex"} alignItems={"center"}>
          <ToggleButtons
            reportType={reportType}
            setReportType={setReportType}
          />

          <DownloadButton />
        </Box>
      </ChartDetailsContainer>
      <CountryReportingPerformanceChart stats={countryPerformanceChartStats} />
    </ChartContainer>
  );
}

export default CountryReportingPerformance;
