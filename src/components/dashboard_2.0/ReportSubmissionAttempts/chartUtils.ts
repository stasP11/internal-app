import { FormattedDataForChart, IncomingData } from "./types";

export function formatBarChartData(
  data: IncomingData[]
): FormattedDataForChart[] {
  const distributorMap = new Map();

  data.forEach((cur) => {
    if (!cur.distributor_id || !cur.distributor_name) return;
    let distributor = distributorMap.get(cur.distributor_id);
    if (!distributor) {
      distributor = {
        distributor_id: cur.distributor_id,
        distributor_name: cur.distributor_name.toUpperCase(),
        selloutAverage: 0,
        inventoryAverage: 0,
        selloutSuccessCount: 0,
        inventorySuccessCount: 0,
      };
      distributorMap.set(cur.distributor_id, distributor);
    }

    if (cur.report_type === "SelloutReport") {
      distributor.selloutAverage = distributor.selloutAverage + cur.total;
      distributor.selloutSuccessCount =
        distributor.selloutSuccessCount + cur.success_count;
    } else if (cur.report_type === "InventoryReport") {
      distributor.inventoryAverage = distributor.inventoryAverage + cur.total;
      distributor.inventorySuccessCount =
        distributor.inventorySuccessCount + cur.success_count;
    }
  });

  return Array.from(distributorMap.values())
    .slice(0, 8)
    .map((distributor) => {
      if (distributor.selloutSuccessCount !== 0) {
        distributor.selloutSuccessCount = 0;
      } else {
        distributor.selloutSuccessCount = distributor.selloutAverage;
      }

      if (distributor.inventorySuccessCount !== 0) {
        distributor.inventorySuccessCount = 0;
      } else {
        distributor.inventorySuccessCount = distributor.inventoryAverage;
      }

      return {
        ...distributor,
        inventoryAverage: Math.abs(distributor.inventoryAverage) * -1,
        inventorySuccessCount: Math.abs(distributor.inventorySuccessCount) * -1,
      };
    });
}

export function trimLabelString(value: string, context: any) {
  if (!value) return value;
  const maxLength = 15;
  if (context.location === "tick") {
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
  } else {
    return value;
  }
}

// Utility function to find the maximum absolute value
export function findMaxValue(dataset: FormattedDataForChart[]): number {
  return dataset.reduce((acc, curr) => {
    const maxCurr = Math.max(
      Math.abs(curr.selloutAverage),
      Math.abs(curr.inventoryAverage)
    );
    return Math.max(acc, maxCurr);
  }, 0);
}
export function roundUpToNiceNumber(value: number): number {
  const decimals = Math.pow(10, Math.floor(Math.log10(value)));
  const fraction = value / decimals;

  let niceFraction;

  if (fraction < 2) {
    niceFraction = 2;
  } else if (fraction < 4) {
    niceFraction = 4;
  } else if (fraction < 5) {
    niceFraction = 5;
  } else if (fraction < 10) {
    niceFraction = 10;
  } else {
    niceFraction = 10;
  }

  return Math.ceil(niceFraction * decimals);
}
