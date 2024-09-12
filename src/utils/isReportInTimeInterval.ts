import { DateTime, Interval } from "luxon";

export const isReportInTimeInterval = (
  filename: string,
  interval: Interval
) => {
  const parts = filename.split("_");
  const year = parseInt(parts[parts.length - 1], 10);
  const month = parseInt(parts[parts.length - 2], 10);
  const filenameDate = DateTime.local(year, month).startOf("month");

  return interval.contains(filenameDate);
};
