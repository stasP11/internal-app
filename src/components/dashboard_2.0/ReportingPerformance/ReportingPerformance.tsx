import { DateTime } from "luxon";
import ReportingPerformanceChart from "./ReportingPerformanceChart";
import {
  getDailyStats,
  getFormattedDueDates,
  getStatArray,
} from "./chartUtils";
import { useMemo, useState } from "react";
import { reportingPerfomanceChartLegendConfig } from "./chartConfigs";
import ChartContainer from "../shared/ChartContainer";
import { Box } from "@mui/material";
import CustomLegend from "../shared/CustomLegend";
import ToggleButtons from "../shared/ToggleButtons";
// import DownloadButton from "../shared/DownloadButton";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";
import useReportingPerformance from "hooks/swr-hooks/useReportingPerformance";
import { ReportPerformance, ReportType } from "./types";

function ReportingPerformance({ country }: { country: string }) {
  const [reportType, setReportType] = useState<ReportType>("SelloutReport");
  const now = DateTime.now();
  const currentMonthStart = now.startOf("month");
  const startOfPastThreeMonths = currentMonthStart.minus({ months: 3 });
  const endOfPastThreeMonths = currentMonthStart.minus({ days: 1 });
  const { reportingPerformance, isLoading, isError } =
    useReportingPerformance(country);

  const data = reportingPerformance?.data || [];
  const dueDatesFromApi = reportingPerformance?.due_dates || [];

  const filteredReportsBySelectedType = useMemo(() => {
    return data.filter(
      (report: ReportPerformance) =>
        report.report_type === reportType &&
        DateTime.fromISO(report.received_date) >= startOfPastThreeMonths &&
        DateTime.fromISO(report.received_date) <= endOfPastThreeMonths
    );
  }, [data, reportType, startOfPastThreeMonths, endOfPastThreeMonths]);

  const dailyStats = useMemo(
    () =>
      getDailyStats(
        filteredReportsBySelectedType,
        startOfPastThreeMonths,
        endOfPastThreeMonths
      ),
    [filteredReportsBySelectedType]
  );

  const dueDates = useMemo(() => {
    return getFormattedDueDates(
      dueDatesFromApi,
      reportType,
      startOfPastThreeMonths,
      endOfPastThreeMonths
    );
  }, [
    dueDatesFromApi,
    reportType,
    startOfPastThreeMonths,
    endOfPastThreeMonths,
  ]);

  return (
    <ChartContainer title="Reporting performance">
      <ChartDetailsContainer>
        <CustomLegend legendConfig={reportingPerfomanceChartLegendConfig} />
        <Box display={"flex"} alignItems={"center"}>
          <ToggleButtons
            reportType={reportType}
            setReportType={setReportType}
          />

          {/* <DownloadButton /> */}
        </Box>
      </ChartDetailsContainer>
      <ReportingPerformanceChart
        statArray={getStatArray(dailyStats)}
        dueDates={dueDates}
      />
    </ChartContainer>
  );
}

export default ReportingPerformance;
