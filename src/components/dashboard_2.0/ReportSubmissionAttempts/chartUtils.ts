import { FormattedDataForChart, IncomingData } from "./types";

export function formatBarChartData(
  data: IncomingData[]
): FormattedDataForChart[] {
  const distributorMap = new Map();

  data.forEach((cur) => {
    let distributor = distributorMap.get(cur.distributor_id);
    if (!distributor) {
      distributor = {
        distributor_id: cur.distributor_id,
        distributor_name: cur.distributor_name,
        selloutAverage: 0,
        inventoryAverage: 0,
        selloutSuccessCount: 0,
        inventorySuccessCount: 0,
      };
      distributorMap.set(cur.distributor_id, distributor);
    }

    if (cur.report_type === "SelloutReport") {
      distributor.selloutAverage = cur.total;
      distributor.selloutSuccessCount = cur.success_count === 0 ? cur.total : 0;
    } else if (cur.report_type === "InventoryReport") {
      distributor.inventoryAverage = Number(`-${cur.total}`);
      distributor.inventorySuccessCount = Number(
        `-${cur.success_count === 0 ? cur.total : 0}`
      );
    }
  });

  return Array.from(distributorMap.values());
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
