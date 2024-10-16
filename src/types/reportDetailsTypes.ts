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

export type ProductDetailsData = {
  alternatives: Array<AlternativesType> | [];
  id: number;
  matched: number | null;
  material_number: number;
  product_name: string;
  uom: string;
  volume: number;
};

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
  products: any[];
};