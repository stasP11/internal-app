import { DateTime, Interval } from "luxon";

export const getPastThreeMonthsInterval = () => {
  const now = DateTime.now().setZone("local");
  const startOfThreeMonthsAgo = now.minus({ months: 3 }).startOf("month");
  const endOfLastFullMonth = now
    .startOf("month")
    .minus({ days: 1 })
    .endOf("day");
  return Interval.fromDateTimes(startOfThreeMonthsAgo, endOfLastFullMonth);
};
