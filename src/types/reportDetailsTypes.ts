interface AlternativesType {
  material_number: number;
  material_name: string;
}

export type ReportStatusType =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "REVIEW"
  | "PROCESSING"
  | "SUCCESS";

export type ReportDetailsData = {
  alternatives: Array<AlternativesType> | [];
  id: number;
  matched: number | null;
  material_number: number;
  product_name: string;
  uom: string;
  volume: number;
  smart_search: number | null;
};

type initialPproductData = {
  material_number: string;
  product_name: string;
  initially_matched_material_number: string;
  initially_matched_item_name: string;
};

export type ProductDetailsType = {
  id: number;
  uom: any;
  volume: any;
  alternatives: AlternativesType[];
  matched: number;
  material_number: number;
  product_name: string;
  statusUpdate: string;
  smart_search: AlternativesType[];
  initial_product_data: initialPproductData;
}

export interface ReportDetailsProps {
  data: Array<ReportDetailsData>;
  country: string;
  filename: any;
  fileStatus: any;
  onRejectReport: any;
  onApproveReport: any;
  onAlternativeChoose: any;
  isReportStatusUpdated: boolean;
}

export type SameProductsType = {
  isOpenForUse: boolean;
  material_number: number;
  matchedMaterialNumber: number;
  matchedMaterialName: string;
  products: any[];
};