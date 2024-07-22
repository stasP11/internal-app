import { DateTime } from "luxon";
import AggregationPerProductChart from "./AggregationPerProductChart";
import {
  filterReports,
  getDueDates,
  getStatArray,
  getWeeklyStats,
} from "./chartUtils";
import { useMemo } from "react";
import { aggregationPerProductLegendConfig } from "./chartConfigs";
import ChartContainer from "../shared/ChartContainer";
import ChartDetailsContainer from "../shared/ChartDetailsContainer";
import CustomLegend from "../shared/CustomLegend";
import { Box } from "@mui/material";
import DownloadButton from "../shared/DownloadButton";

function AggregationPerProduct() {
  const now = DateTime.now();
  const currentMonthStart = now.startOf("month");
  const monthsAgo3 = currentMonthStart.minus({ months: 3 });

  const lastThreeMonthsData = filterReports(monthsAgo3, currentMonthStart);

  const weeklyStats = useMemo(
    () => getWeeklyStats(lastThreeMonthsData, monthsAgo3),
    [lastThreeMonthsData]
  );

  return (
    <>
      <ChartContainer title="Aggregation per product (all countries)">
        <ChartDetailsContainer>
          <CustomLegend legendConfig={aggregationPerProductLegendConfig} />
          <Box display={"flex"} alignItems={"center"}>
            <DownloadButton />
          </Box>
        </ChartDetailsContainer>
        <AggregationPerProductChart
          statArray={getStatArray(weeklyStats, monthsAgo3)}
          dueDates={getDueDates(25)}
        />
      </ChartContainer>
    </>
  );
}

export default AggregationPerProduct;
