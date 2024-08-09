export default function transformNotificationsDataForFrontEnd(data: any) {
  const rowData = [
    {
      name: "daily",
      periodsSettings: {},
      notificationRules: {
        afterReportingDueDate: [],
      },
    },
    {
      name: "weekly",
      periodsSettings: {
        startDay: 0,
        dueDay: 5,
      },
      notificationRules: {
        afterReportingDueDate: [],
        beforeReportingDueDate: [],
      },
    },
    {
      name: "monthly",
      periodsSettings: {
        startDay: 1,
        dueDay: 30,
      },
      notificationRules: {
        afterReportingDueDate: [],
        beforeReportingDueDate: [],
        beforeReportingStartDate: [],
      },
    },
    {
      name: "quarterly",
      periodsSettings: {
        startDay: 1,
        dueDay: 30,
      },
      notificationRules: {
        afterReportingDueDate: [],
        beforeReportingDueDate: [],
        beforeReportingStartDate: [],
      },
    },
    {
      name: "custom",
      periodsSettings: [],
      notificationRules: {
        afterReportingDueDate: [],
        beforeReportingDueDate: [],
        beforeReportingStartDate: [],
      },
    },
  ];

  function generateRandomId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  function addID(arr: any) {
    const result = arr.map((element: any) => {
      return { ...element, id: generateRandomId() };
    });

    return result;
  }

  function formatDataforCheckButtons(array: any, label: string) {
    let result: any = [];
    array.forEach((element: number) => {
      result.push({
        label: `${element} ${label}`,
        selected: true,
        value: element,
        id: element,
      });
    });

    const soretedResult = result.sort(
      (prev: any, next: any) => prev.value - next.value
    );
    return soretedResult;
  }

  const reportingFrequency = (data?.reporting_frequency).toLowerCase();
  if (reportingFrequency === "daily") {
    rowData.forEach((obj) => {
      if (obj.name === "daily") {
        obj.notificationRules.afterReportingDueDate =
          data?.after_due_date || [];
      }
    });
  }

  if (reportingFrequency === "weekly") {
    rowData.forEach((obj: any) => {
      if (obj.name === "weekly") {
        obj.periodsSettings.startDay = 0;
        obj.periodsSettings.dueDay = data?.reporting_due_date || 0;
        obj.notificationRules.afterReportingDueDate =
          data?.after_due_date || [];
        obj.notificationRules.beforeReportingDueDate =
          formatDataforCheckButtons(data?.before_due_date, "day before") || [];
      }
    });
  }

  if (reportingFrequency === "monthly") {
    rowData.forEach((obj: any) => {
      if (obj.name === "monthly") {
        obj.periodsSettings.startDay = data?.reporting_start_date || 0;
        obj.periodsSettings.dueDay = data?.reporting_due_date || 0;
        obj.notificationRules.afterReportingDueDate =
          data?.after_due_date || [];
        obj.notificationRules.beforeReportingDueDate =
          formatDataforCheckButtons(data?.before_due_date, "day before") || [];
        obj.notificationRules.beforeReportingStartDate =
          formatDataforCheckButtons(data?.before_start_date, "day before") ||
          [];
      }
    });
  }

  if (reportingFrequency === "quarterly") {
    rowData.forEach((obj: any) => {
      if (obj.name === "quarterly") {
        obj.periodsSettings.startDay = data?.reporting_start_date || 0;
        obj.periodsSettings.dueDay = data?.reporting_due_date || 0;
        obj.notificationRules.afterReportingDueDate =
          data?.after_due_date || [];
        obj.notificationRules.beforeReportingDueDate =
          formatDataforCheckButtons(data?.before_due_date, "day before") || [];
        obj.notificationRules.beforeReportingStartDate =
          formatDataforCheckButtons(data?.before_start_date, "day before") ||
          [];
      }
    });
  }

  if (reportingFrequency === "custom") {
    rowData.forEach((obj: any) => {
      if (obj.name === "custom") {
        obj.periodsSettings = addID(data?.custom_periods);
        obj.notificationRules.afterReportingDueDate =
          data?.after_due_date || [];
        obj.notificationRules.beforeReportingDueDate =
          formatDataforCheckButtons(data?.before_due_date, "day before") || [];
        obj.notificationRules.beforeReportingStartDate =
          formatDataforCheckButtons(data?.before_start_date, "day before") ||
          [];
      }
    });
  }

  return rowData;
}
