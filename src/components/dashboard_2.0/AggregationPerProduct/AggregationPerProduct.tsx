import { DateTime } from "luxon";
import AggregationPerProductChart from "./AggregationPerProductChart";
import {
  getDailyStats,
  getStatArray,
  groupByProduct,
  isInDateRange,
} from "./chartUtils";
import { useMemo } from "react";
import ChartContainer from "../shared/ChartContainer";
import useAggregationPerProduct from "hooks/swr-hooks/useAggregationPerProduct";
import DownloadButton from "../shared/DownloadButton";
import { Box } from "@mui/material";
import { ProductData } from "./types";

function AggregationPerProduct({ country }: { country: string }) {
  const { aggregationPerProduct, isLoading, isError } =
    useAggregationPerProduct(country);
  const now = DateTime.now();

  const currentMonthStart = now.startOf("month");
  const startOfPastFourMonths = currentMonthStart.minus({ months: 4 });
  const endOfPastFourMonths = currentMonthStart.minus({ days: 1 });

  const dailyStats = useMemo(() => {
    const data =
      aggregationPerProduct?.data.filter((product: ProductData) =>
        isInDateRange(product.date, startOfPastFourMonths, endOfPastFourMonths)
      ) || [];

    return getDailyStats(data, startOfPastFourMonths, endOfPastFourMonths);
  }, [aggregationPerProduct, startOfPastFourMonths, endOfPastFourMonths]);

  return (
    <>
      <ChartContainer title="Aggregation per product">
        <Box
          sx={{ width: "fit-content", marginLeft: "auto", marginBottom: "8px" }}
        >
          <DownloadButton />
        </Box>
        <AggregationPerProductChart
          statArray={getStatArray(dailyStats, startOfPastFourMonths)}
        />
      </ChartContainer>
    </>
  );
}

export default AggregationPerProduct;
