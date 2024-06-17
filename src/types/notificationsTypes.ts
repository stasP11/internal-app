type CustomPerioud = {
  startPerioud: string;
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
