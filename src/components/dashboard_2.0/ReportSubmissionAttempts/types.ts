export interface IncomingData {
  distributor_id: number;
  report_type: "SelloutReport" | "InventoryReport";
  success_count: number;
  failed_count: number;
  distributor_name: string;
  total: number;
}

export interface FormattedDataForChart {
  distributor_id: number;
  distributor_name: string;
  selloutAverage: number;
  inventoryAverage: number;
  [x: string]: number | string;
}
