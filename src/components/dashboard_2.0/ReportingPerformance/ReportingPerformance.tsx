import { DateTime } from "luxon";
import ReportingPerformanceChart from "./ReportingPerformanceChart";
import {
  filterReports,
  getDueDates,
  getStatArray,
  getWeeklyStats,
} from "./chartUtils";
import { useMemo, useState } from "react";
import { reportingPerfomanceChartLegendConfig } from "./chartConfigs";
import { ReportType } from "../shared/types";
import ChartContainer from "../shared/ChartContainer";
import { Box } from "@mui/material";
import CustomLegend from "../shared/CustomLegend";
import ToggleButtons from "../shared/ToggleButtons";
import DownloadButton from "../shared/DownloadButton";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";

function ReportingPerformance() {
  const [reportType, setReportType] = useState<ReportType>("sellout");
  const now = DateTime.now();
  const currentMonthStart = now.startOf("month");
  const monthsAgo3 = currentMonthStart.minus({ months: 3 });

  const filteredReportsBySelectedType = useMemo(
    () =>
      filterReports(monthsAgo3, currentMonthStart).filter(
        (report) => report.type === reportType
      ),
    [monthsAgo3, currentMonthStart, reportType]
  );

  const weeklyStats = useMemo(
    () => getWeeklyStats(filteredReportsBySelectedType),
    [filteredReportsBySelectedType]
  );

  return (
    <ChartContainer title="Reporting performance">
      <ChartDetailsContainer>
        <CustomLegend legendConfig={reportingPerfomanceChartLegendConfig} />
        <Box display={"flex"} alignItems={"center"}>
          <ToggleButtons
            reportType={reportType}
            setReportType={setReportType}
          />

          <DownloadButton />
        </Box>
      </ChartDetailsContainer>
      <ReportingPerformanceChart
        statArray={getStatArray(weeklyStats, monthsAgo3)}
        dueDates={getDueDates(25)}
      />
    </ChartContainer>
  );
}

export default ReportingPerformance;
