export type CountryReportData = {
  country: string;
  totalExpectedReports: number;
  inTime: number;
  onTime: number;
  notReported: number;
};

export type ReportKey = "inTime" | "onTime" | "notReported";
