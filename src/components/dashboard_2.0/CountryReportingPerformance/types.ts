export type CountryReportData = {
  country: string;
  report_type: ReportType;
  in_time_report_count: number;
  on_time_report_count: number;
  missing_report_count: number;
  country_code: string;
};

export type GroupedCountryReports = {
  [key: string]: {
    country: string;
    country_code: string;
    InventoryReport: CountryReportData;
    SelloutReport: CountryReportData;
  };
};

export type ReportKey = "inTime" | "onTime" | "notReported";
type ReportType = "InventoryReport" | "SelloutReport";
