import { DateTime } from "luxon";
import {
  AggregateDailyData,
  DailyProductCounts,
  DailyProductSales,
  ProductData,
  ProductMap,
} from "./types";

export function groupByProduct(productData: ProductData[]): ProductMap {
  return productData.reduce((acc, item) => {
    const key = item.material_number.toString();
    if (!acc[key]) {
      acc[key] = [item];
    } else {
      acc[key].push(item);
    }
    return acc;
  }, {} as ProductMap);
}

function getTopEightProducts(groupedProducts: ProductMap): ProductMap {
  const entries = Object.entries(groupedProducts);
  const firstEightEntriesSortedByNrOfSales = entries
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 8);

  const sortedProductMap: ProductMap = {};
  for (let [key, value] of firstEightEntriesSortedByNrOfSales) {
    sortedProductMap[key] = value;
  }

  return sortedProductMap;
}

export function isInDateRange(
  dateStr: string,
  startDate: DateTime,
  endDate: DateTime
): boolean {
  let date = DateTime.fromFormat(dateStr, "dd-MM-yyyy");

  return date >= startDate && date <= endDate;
}

function initializeDailyStats(
  startDate: DateTime,
  endDate: DateTime,
  products: ProductMap
): AggregateDailyData {
  // Get material names of first eight products
  const productNames = Object.keys(products).map(
    (key) =>
      `${products[key][0].material_number} ${products[key][0].material_name}`
  );

  let stats: AggregateDailyData = {};
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const day = currentDate.toFormat("yyyy-LL-dd");
    // Initialize daily product data with zeros for each product
    stats[day] = productNames.reduce((acc, product) => {
      acc[product] = 0;
      return acc;
    }, {} as DailyProductCounts);

    currentDate = currentDate.plus({ day: 1 });
  }

  return stats;
}

export const getDailyStats = (
  productData: ProductData[],
  startDate: DateTime,
  endDate: DateTime
): AggregateDailyData => {
  const groupedProducts = groupByProduct(productData);
  const topEightProducts = getTopEightProducts(groupedProducts);

  const initialStats = initializeDailyStats(
    startDate,
    endDate,
    topEightProducts
  );

  return productData.reduce((acc: AggregateDailyData, item) => {
    const day = DateTime.fromFormat(item.date, "dd-MM-yyyy").toFormat(
      "yyyy-LL-dd"
    );
    const materialName = `${item.material_number} ${item.material_name}`;

    // Ensure the date and product exists in our stats
    if (acc[day] && acc[day][materialName] !== undefined) {
      acc[day][materialName] += item.total || 0;
    }

    return acc;
  }, initialStats);
};

export const getStatArray = (
  dailyStats: { [key: string]: { [materialName: string]: number } },
  startingDate: DateTime
): DailyProductSales[] => {
  return Object.keys(dailyStats)
    .sort()
    .map(
      (day): DailyProductSales => ({
        day: DateTime.fromISO(day),
        sales: dailyStats[day],
      })
    )
    .filter((item) => item.day >= startingDate);
};

//Create config for Line Chart

const commonTickLabelStyles = {
  color: "var(--grey-700)",
  fontSize: 12,
  fontFamily: "Helvetica Neue",
};

export const createXAxis = (statArray: DailyProductSales[]) => [
  {
    scaleType: "time" as const,
    data: statArray.map((item) => item.day.toJSDate()),
    tickNumber: 4,
    tickLabelStyle: { ...commonTickLabelStyles },
    disableTicks: true,
    valueFormatter: (date: Date, context: any) => {
      if (context.location === "tooltip") {
        return date?.toLocaleDateString();
      }
      return date.toLocaleDateString("en-US", { month: "short" });
    },
  },
];

export const createYAxis = () => [
  {
    tickNumber: 6,
    tickLabelStyle: { ...commonTickLabelStyles, transform: "translateX(-1%)" },
    disableTicks: true,
    disableLine: true,
  },
];

export const createSeries = (statArray: DailyProductSales[]) => {
  // Obtain unique material names from statArray
  let materialNames: string[] = statArray.reduce((unique, item) => {
    Object.keys(item.sales).forEach((materialName) => {
      if (!unique.includes(materialName)) {
        unique.push(materialName);
      }
    });
    return unique;
  }, [] as string[]);

  // For each material name, create a series object
  let series = materialNames.map((materialName) =>
    createSeriesObject(materialName, statArray)
  );

  return series;
};

const createSeriesObject = (
  materialName: string,
  statArray: DailyProductSales[]
) => ({
  data: statArray.map((item) => item.sales[materialName] ?? 0),
  showMark: false,
  curve: "linear" as const,
  label: (location: string) => {
    if (location === "legend") {
      // Take the first word of material name for the legend label
      return materialName.split(" ")[1];
    }
    // the original label for other locations
    return materialName;
  },
});
