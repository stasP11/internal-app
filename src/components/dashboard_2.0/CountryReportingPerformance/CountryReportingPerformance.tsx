import CountryReportingPerformanceChart, {
  CountryReportingPerformanceStats,
} from "./CountryReportingPerformanceChart";
import { useEffect, useState } from "react";
import { countryPerformanceChartLegendConfig } from "./chartConfigs";
import ChartContainer from "../shared/ChartContainer";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";
import CustomLegend from "../shared/CustomLegend";
import { Box } from "@mui/material";
import ToggleButtons from "../shared/ToggleButtons";
// import DownloadButton from "../shared/DownloadButton";
import { ReportType } from "../ReportingPerformance/types";
import useCountryReportingPerformance from "hooks/swr-hooks/useCountryReportingPerformance";
import { filterAndSortData } from "./chartUtils";

interface ReportData {
  InventoryReport: CountryReportingPerformanceStats[];
  SelloutReport: CountryReportingPerformanceStats[];
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
      setReportData({
        InventoryReport: filterAndSortData(
          countryReportingPerformance.data,
          "InventoryReport"
        ),
        SelloutReport: filterAndSortData(
          countryReportingPerformance.data,
          "SelloutReport"
        ),
      });
    }
  }, [countryReportingPerformance]);

  const stats = reportData[reportType];

  return (
    <ChartContainer title="Country reporting performance">
      <ChartDetailsContainer>
        <CustomLegend legendConfig={countryPerformanceChartLegendConfig} />
        <Box display={"flex"} alignItems={"center"}>
          <ToggleButtons
            reportType={reportType}
            setReportType={setReportType}
          />

          {/* <DownloadButton /> */}
        </Box>
      </ChartDetailsContainer>
      <CountryReportingPerformanceChart stats={stats} />
    </ChartContainer>
  );
}

export default CountryReportingPerformance;
