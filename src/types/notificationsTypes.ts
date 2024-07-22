export type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
export interface NotificationPeriodsProps {
  selectedPeriod: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
  notificationPeriods: Array<Period>;
  weeklyPeriod: any;
  monthlyPeriod: any;
  quarterlyPeriod: any;
  customPeriod: any;
  onPeriodChange: Function;
  onWeeklyPeriod: Function;
  onMonthlyPeriod: Function;
  onQuarterlyPeriod: Function;
  onCustomPeriod: Function;
}

export type CustomPerioud = {
  startPeriod: string;
  endPerioud: string;
  startDay: number;
  dueDay: number;
}

export type NotificationType = {
    periods: {
            daily: {
                isSelected: boolean;
                notificationRules: {
                    afterReportingDueDate: Array<any>;
                };
            };
            weekly: {
                isSelected: boolean;
                dueDay: string
                notificationRules: {
                    afterReportingDueDate: Array<any>;
                    beforeReportingDueDate: Array<any>;
                };
            };
            monthly: {
                isSelected: boolean;
                startDay: number;
                dueDay: number;
                notificationRules: {
                    afterReportingDueDate: Array<any>;
                    beforeReportingDueDate: Array<any>;
                    beforeReportingStartDate: Array<any>
                };
            };
            quarterly: {
                isSelected: boolean;
                // need clarification
            };
            custom: {
                isSelected: boolean;
                customPeriouds: Array<CustomPerioud>
                notificationRules: {
                    afterReportingDueDate: Array<any>;
                    beforeReportingDueDate: Array<any>;
                    beforeReportingStartDate: Array<any>
                };
            };
        };
};
