import { DateTime } from "luxon";

export interface ProductData {
  material_number: number;
  date: string;
  total: number;
  uom: string;
  material_name: string;
  count: number;
}
export type ProductMap = Record<string, ProductData[]>;

export type MaterialName = string;
export type DailyProductCounts = { [product in MaterialName]: number };
export type AggregateDailyData = { [date: string]: DailyProductCounts };

export type DailyProductData = { [materialName: string]: number };
export type DailyProductSales = { day: DateTime; sales: DailyProductCounts };
