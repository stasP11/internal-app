import CountryReportingPerformanceChart from "./CountryReportingPerformanceChart";
import { useEffect, useState } from "react";
import { countryPerformanceChartLegendConfig } from "./chartConfigs";
import ChartContainer from "../shared/ChartContainer";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";
import CustomLegend from "../shared/CustomLegend";
import { Box } from "@mui/material";
import ToggleButtons from "../shared/ToggleButtons";
import DownloadButton from "../shared/DownloadButton";
import { ReportType } from "../ReportingPerformance/types";
import useCountryReportingPerformance from "hooks/swr-hooks/useCountryReportingPerformance";
import { CountryReportData, ReportKey } from "./types";
import { groupByCountry } from "./chartUtils";

interface ReportData {
  InventoryReport: CountryReportData[];
  SelloutReport: CountryReportData[];
}

function CountryReportingPerformance() {
  const [reportType, setReportType] = useState<ReportType>("SelloutReport");
  const { countryReportingPerformance, isLoading, isError } =
    useCountryReportingPerformance();
  const [reportData, setReportData] = useState<ReportData>({
    InventoryReport: [],
    SelloutReport: [],
  });

  useEffect(() => {
    if (countryReportingPerformance?.data) {
      const groupedData = groupByCountry(countryReportingPerformance.data);

      const processReportData = (reportKey: ReportType) =>
        Object.values(groupedData)
          .map((country) => country[reportKey])
          .sort((a, b) => a.country_code.localeCompare(b.country_code))
          .slice(0, 8);

      setReportData({
        InventoryReport: processReportData("InventoryReport"),
        SelloutReport: processReportData("SelloutReport"),
      });
    }
  }, [countryReportingPerformance]);

  const sortedData = reportData[reportType].map((item: any) => ({
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
      <CountryReportingPerformanceChart stats={sortedData} />
    </ChartContainer>
  );
}

export default CountryReportingPerformance;
