import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationSettings/NotificationPeriods";
import NotificationRules from "components/NotificationSettings/NotificationRules";
import { getFromLocalStorage } from "../../services/storageInterection";
import Button from "@mui/material/Button";
import "./Notification.scss";

// utils
function isExistinArray(array: Array<any>, key: any, value: any) {
  return array.some((obj) => obj[key] === value);
}

type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
const notificationPeriods: Array<Period> = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Custom",
];

const exempleData2 = [
  {
    name: "daily",
    periodsSettings: {},
    notificationRules: {
      afterReportingDueDate: [0, 1, 2, 3, 4],
    },
  },
  {
    name: "weekly",
    periodsSettings: {
      dueDay: "1",
    },
    notificationRules: {
      afterReportingDueDate: [1, 3],
      beforeReportingDueDate: [
        { label: "on due Date", selected: false, value: 0, id: "02092" },
        { label: "1 day before", selected: true, value: 1, id: "02093" },
      ],
    },
  },
  {
    name: "monthly",
    periodsSettings: {
      startDay: 1,
      dueDay: 30,
    },
    notificationRules: {
      afterReportingDueDate: [1, 3],
      beforeReportingDueDate: [
        { label: "on due Date", selected: false, value: 0, id: "323f2" },
        { label: "1 day before", selected: true, value: 1, id: "0233293" },
      ],
      beforeReportingStartDate: [
        { label: "on start Day", selected: false, value: 0, id: "323w2" },
      ],
    },
  },
  {
    name: "quarterly",
    periodsSettings: {
      startDay: 1,
      dueDay: 30,
    },
    notificationRules: {
      afterReportingDueDate: [1, 2, 4],
      beforeReportingDueDate: [
        { label: "on due Date", selected: false, value: 0, id: "323fee2" },
        { label: "1 day before", selected: true, value: 1, id: "0233293" },
      ],
      beforeReportingStartDate: [
        { label: "on start Day", selected: false, value: 0, id: "323wee2" },
      ],
    },
  },
  {
    name: "custom",
    periodsSettings: [
      {
        id: "21211221",
        startPeriod: "01-02-2024",
        endPeriod: "22-02-2024",
        startDay: 1,
        dueDay: 31,
      },
      {
        id: "21y21812",
        startPeriod: "02-04-2024",
        endPeriod: "22-06-2024",
        startDay: 1,
        dueDay: 28,
      },
    ],
    notificationRules: {
      afterReportingDueDate: [1, 2, 4],
      beforeReportingDueDate: [
        { label: "on due Date", selected: false, value: 0, id: "323fee2" },
        { label: "1 day before", selected: true, value: 1, id: "0233293" },
      ],
      beforeReportingStartDate: [
        { label: "on start Day", selected: false, value: 0, id: "323wee2" },
      ],
    },
  },
];

// utils
function formatBackendDataToFrontend(data: any) {
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
        dueDay: 0,
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

  function formatDataforCheckButtons(array: any, label: string) {
    const result: any = [];
    array.forEach((element: number) => {
      result.push({
        label: `${element} ${label}`,
        selected: true,
        value: element,
        id: element,
      });
    });
    return result;
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
        obj.periodsSettings = data?.custom_periods;
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

const NotificationComponent: React.FC<any> = ({
  onSave,
  data,
}: any): JSX.Element => {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [formatedData, setFormatedData] = useState<any>();
  const [selectedPeriod, selectPeriod] = useState<Period>(
    data?.reporting_frequency
  );
  const [editStatus, setEditStatus] = useState(true);

  const [dailyPeriod, setDailyPeriod] = useState<any>();
  const [dailyNotifications, setDailyNotifications] = useState<any>();

  const [weeklyPeriod, setWeeklyPeriod] = useState<any>();
  const [weeklyNotifications, setWeeklyNotifications] = useState<any>();

  const [monthlyPeriod, setMonthlyPeriod] = useState<any>();
  const [monthlyNotifications, setMonthlyNotifications] = useState<any>();

  const [quarterlyPeriod, setQuarterlyPeriod] = useState<any>();
  const [quarterlyNotifications, setQuarterlyNotifications] = useState<any>();

  const [customPeriods, setCustomPeriods] = useState<any>();
  const [customNotifications, setCustomNotifications] = useState<any>();

  function hendleTest(data: any) {
    if (data) {
      const transformedData = formatBackendDataToFrontend(data);
      setFormatedData(transformedData);
    }
  }

  useEffect(() => {
    hendleTest(data);
  }, [data]);

  function handleWeeklyPeriodUpdate(selectedDay: any) {
    setWeeklyPeriod({ dueDay: selectedDay });
    setEditStatus(false);
  }

  function handleMonthlyPeriodUpdate(selectedData: any) {
    selectedData.startDay
      ? setMonthlyPeriod({
          startDay: selectedData?.startDay,
          dueDay: monthlyPeriod?.dueDay,
        })
      : setMonthlyPeriod({
          startDay: monthlyPeriod?.startDay,
          dueDay: selectedData?.dueDay,
        });

    setEditStatus(false);
  }

  function handleQuarterlyPeriodUpdate(selectedData: any) {
    selectedData.startDay
      ? setQuarterlyPeriod({
          startDay: selectedData?.startDay,
          dueDay: quarterlyPeriod?.dueDay,
        })
      : setQuarterlyPeriod({
          startDay: quarterlyPeriod?.startDay,
          dueDay: selectedData?.dueDay,
        });
    setEditStatus(false);
  }

  function handleCustomPeriod(updatedPeriod: any) {
    if (isExistinArray(customPeriods, "id", updatedPeriod.id)) {
      const updatedPeriods = customPeriods.map((period: any) =>
        period.id === updatedPeriod.id ? { ...updatedPeriod } : period
      );
      setCustomPeriods(() => [...updatedPeriods]);
    } else {
      setCustomPeriods((prev: any) => [...prev, updatedPeriod]);
    }
    setEditStatus(false);
  }

  useEffect(() => {
    if (formatedData) {
      formatedData.forEach(
        ({ name, periodsSettings, notificationRules }: any) => {
          if (name === "daily") {
            setDailyPeriod(periodsSettings);
            setDailyNotifications(notificationRules);
          }
          if (name === "weekly") {
            setWeeklyPeriod(periodsSettings);
            setWeeklyNotifications(notificationRules);
          }

          if (name === "monthly") {
            setMonthlyPeriod(periodsSettings);
            setMonthlyNotifications(notificationRules);
          }

          if (name === "quarterly") {
            setQuarterlyPeriod(periodsSettings);
            setQuarterlyNotifications(notificationRules);
          }

          if (name === "custom") {
            setCustomPeriods(periodsSettings);
            setCustomNotifications(notificationRules);
          }
        }
      );
    }
  }, [formatedData]);

  function handleDailyNotificationsUpdate(data: any) {
    const updatedData = { ...dailyNotifications };
    updatedData.afterReportingDueDate = data?.afterReportingDueDate;
    setDailyNotifications(() => updatedData);
    setEditStatus(false);
  }

  function handleWeeklyNotifications(data: any) {
    const updatedData = { ...weeklyNotifications };
    if (data.afterReportingDueDate) {
      updatedData.afterReportingDueDate = data?.afterReportingDueDate;
      setWeeklyNotifications(() => updatedData);
    }

    if (data.beforeReportingDueDate) {
      updatedData.beforeReportingDueDate = data?.beforeReportingDueDate;
      setWeeklyNotifications(() => updatedData);
    }
    setEditStatus(false);
  }

  function handleMonthlyNotifications(data: any) {
    const updatedData = { ...monthlyNotifications };
    if (data.afterReportingDueDate) {
      updatedData.afterReportingDueDate = data?.afterReportingDueDate;
      setMonthlyNotifications(() => updatedData);
    }

    if (data.beforeReportingDueDate) {
      updatedData.beforeReportingDueDate = data?.beforeReportingDueDate;
      setMonthlyNotifications(() => updatedData);
    }

    if (data.beforeReportingStartDate) {
      updatedData.beforeReportingStartDate = data?.beforeReportingStartDate;
      setMonthlyNotifications(() => updatedData);
    }

    setEditStatus(false);
  }

  function handleQuarterlyNotifications(data: any) {
    const updatedData = { ...quarterlyNotifications };
    if (data.afterReportingDueDate) {
      updatedData.afterReportingDueDate = data?.afterReportingDueDate;
      setQuarterlyNotifications(() => updatedData);
    }

    if (data.beforeReportingDueDate) {
      updatedData.beforeReportingDueDate = data?.beforeReportingDueDate;
      setQuarterlyNotifications(() => updatedData);
    }

    if (data.beforeReportingStartDate) {
      updatedData.beforeReportingStartDate = data?.beforeReportingStartDate;
      setQuarterlyNotifications(() => updatedData);
    }

    setEditStatus(false);
  }

  function handleCustomNotifications(data: any) {
    const updatedData = { ...customNotifications };
    if (data.afterReportingDueDate) {
      updatedData.afterReportingDueDate = data?.afterReportingDueDate;
      setCustomNotifications(() => updatedData);
    }

    if (data.beforeReportingDueDate) {
      updatedData.beforeReportingDueDate = data?.beforeReportingDueDate;
      setCustomNotifications(() => updatedData);
    }

    if (data.beforeReportingStartDate) {
      updatedData.beforeReportingStartDate = data?.beforeReportingStartDate;
      setCustomNotifications(() => updatedData);
    }

    setEditStatus(false);
  }

  const [selectedDaysDueDate, setSelectedDaysDueDate] = React.useState<any>([]);
  const [selectedFrequencyDueDate, setSelectedFrequencyDueDate] =
    React.useState<any>("Weekly");

  function handleSelectedFrequencyDueDate(data: string) {
    setSelectedFrequencyDueDate(data);
    setEditStatus(false);
  }

  function handleSelectedDaysDueDate(data: any) {
    setSelectedDaysDueDate(data);
    setEditStatus(false);
  }

  function handlePeriodChange(e: any) {
    selectPeriod(e.target.value);
    setEditStatus(false);
  }

  function handleSaveSelectedData() {
    if (selectedPeriod === "Daily") {
      onSave({
        ...dailyPeriod,
        ...dailyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      });
    }
    if (selectedPeriod === "Weekly") {
      onSave({
        ...weeklyPeriod,
        ...weeklyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      });
    }
    if (selectedPeriod === "Monthly") {
      onSave({
        ...monthlyPeriod,
        ...monthlyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      });
    }
    if (selectedPeriod === "Quarterly") {
      onSave({
        ...quarterlyPeriod,
        ...quarterlyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      });
    }
    if (selectedPeriod === "Custom") {
      onSave({
        periodsSettings: customPeriods,
        ...customNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      });
    }
  }

  return (
    <div className="notification-page">
      {formatedData && (
        <>
          <NotificationPeriods
            selectedPeriod={selectedPeriod}
            notificationPeriods={notificationPeriods}
            weeklyPeriod={weeklyPeriod}
            monthlyPeriod={monthlyPeriod}
            quarterlyPeriod={quarterlyPeriod}
            customPeriod={customPeriods}
            onPeriodChange={handlePeriodChange}
            onWeeklyPeriod={handleWeeklyPeriodUpdate}
            onMonthlyPeriod={handleMonthlyPeriodUpdate}
            onQuarterlyPeriod={handleQuarterlyPeriodUpdate}
            onCustomPeriod={handleCustomPeriod}
          />

          <NotificationRules
            selectedPeriod={selectedPeriod}
            dailyNotifications={dailyNotifications}
            weeklyNotifications={weeklyNotifications}
            monthlyNotifications={monthlyNotifications}
            quarterlyNotifications={quarterlyNotifications}
            customNotifications={customNotifications}
            selectedDaysState={selectedDaysDueDate}
            selectedFrequency={selectedFrequencyDueDate}
            onDailyNotificationsUpdate={handleDailyNotificationsUpdate}
            onWeeklyNotificationsUpdate={handleWeeklyNotifications}
            onMonthlyNotifications={handleMonthlyNotifications}
            onQuarterlyNotifications={handleQuarterlyNotifications}
            onCustomNotifications={handleCustomNotifications}
            onSelectedDaysState={handleSelectedDaysDueDate}
            onFrequencyChange={(e: any) =>
              handleSelectedFrequencyDueDate(e.target.value)
            }
          />

          <div className="notification-control">
            <div className="notification-control__buttons">
              <Button
                variant="contained"
                onClick={handleSaveSelectedData}
                disabled={editStatus}
              >
                Save
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationComponent;
