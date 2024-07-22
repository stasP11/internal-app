import CountryReportingPerformanceChart from "./CountryReportingPerformanceChart";
import { useMemo, useState } from "react";
import { countryPerformanceChartLegendConfig } from "./chartConfigs";
import { ReportType } from "../shared/types";
import ChartContainer from "../shared/ChartContainer";
import mockData from "./mockCountryReportsData.json";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";
import CustomLegend from "../shared/CustomLegend";
import { Box } from "@mui/material";
import ToggleButtons from "../shared/ToggleButtons";
import DownloadButton from "../shared/DownloadButton";

function CountryReportingPerformance() {
  const [reportType, setReportType] = useState<ReportType>("sellout");

  const filteredStats = useMemo(() => {
    return mockData.map((data) => ({
      country: data.country,
      ...data[reportType],
    }));
  }, [reportType]);

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
      <CountryReportingPerformanceChart stats={filteredStats} />
    </ChartContainer>
  );
}

export default CountryReportingPerformance;
