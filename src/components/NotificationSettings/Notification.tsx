import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationSettings/NotificationPeriods";
import NotificationRules from "components/NotificationSettings/NotificationRules";
import {
  getFromLocalStorage,
} from "../../services/storageInterection";
import "./Notification.scss";

// utils
function isExistinArray(array: Array<any>, key: any, value: any) {
  return array.some((obj) => obj[key] === value);
}

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
      dueDay: "Friday",
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
        // DD-MM-YYYY
        id: "2024-01-01_2024-01-31",
        startPerioud: "01-01-2024",
        endPerioud: "22-02-2024",
        startDay: 1,
        dueDay: 31,
      },
      {
        id: "2024-02-01_2024-02-28",
        startPerioud: "02-04-2024",
        endPerioud: "22-06-2024",
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
type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
const notificationPeriods: Array<Period> = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Custom",
];

const NotificationComponent: React.FC<any> = ({
  onSaveNotificationData,
}: any): JSX.Element => {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [selectedPeriod, selectPeriod] = useState<Period>("Daily");

  const [dailyPerioud, setDailyPerioud] = useState<any>();
  const [dailyNotifications, setDailyNotifications] = useState<any>();

  const [weeklyPerioud, setWeeklyPerioud] = useState<any>();
  const [weeklyNotifications, setWeeklyNotifications] = useState<any>();

  const [monthlyPerioud, setMonthlyPerioud] = useState<any>();
  const [monthlyNotifications, setMonthlyNotifications] = useState<any>();

  const [quarterlyPerioud, setQuarterlyPerioud] = useState<any>();
  const [quarterlyNotifications, setQuarterlyNotifications] = useState<any>();

  const [customPeriouds, setCustomPeriouds] = useState<any>();
  const [customNotifications, setCustomNotifications] = useState<any>();

  function handleWeeklyPerioudUpdate(selectedDay: any) {
    setWeeklyPerioud({ dueDay: selectedDay });
  }

  function handleMonthlyPerioudUpdate(selectedData: any) {
    selectedData.startDay
      ? setMonthlyPerioud({
          startDay: selectedData?.startDay,
          dueDay: monthlyPerioud?.dueDay,
        })
      : setMonthlyPerioud({
          startDay: monthlyPerioud?.startDay,
          dueDay: selectedData?.dueDay,
        });
  }

  function handleQuarterlyPerioudUpdate(selectedData: any) {
    selectedData.startDay
      ? setQuarterlyPerioud({
          startDay: selectedData?.startDay,
          dueDay: quarterlyPerioud?.dueDay,
        })
      : setQuarterlyPerioud({
          startDay: quarterlyPerioud?.startDay,
          dueDay: selectedData?.dueDay,
        });
  }

  function handleCustomPerioud(updatedPeriod: any) {
    console.log(updatedPeriod, "updatedPeriod");
    if (isExistinArray(customPeriouds, "id", updatedPeriod.id)) {
      const updatedPeriods = customPeriouds.map((period: any) =>
        period.id === updatedPeriod.id ? { ...updatedPeriod } : period
      );
      setCustomPeriouds(() => [...updatedPeriods]);
    } else {
      setCustomPeriouds((prev: any) => [...prev, updatedPeriod]);
    }
  }

  useEffect(() => {
    exempleData2.forEach(
      ({ name, periodsSettings, notificationRules }: any) => {
        if (name === "daily") {
          setDailyPerioud(periodsSettings);
          setDailyNotifications(notificationRules);
        }
        if (name === "weekly") {
          setWeeklyPerioud(periodsSettings);
          setWeeklyNotifications(notificationRules);
        }

        if (name === "monthly") {
          setMonthlyPerioud(periodsSettings);
          setMonthlyNotifications(notificationRules);
        }

        if (name === "quarterly") {
          setQuarterlyPerioud(periodsSettings);
          setQuarterlyNotifications(notificationRules);
        }

        if (name === "custom") {
          setCustomPeriouds(periodsSettings);
          setCustomNotifications(notificationRules);
        }
      }
    );
  }, []);

  useEffect(() => {
    if(selectedPeriod === 'Daily'){
    onSaveNotificationData({ ...dailyPerioud, ...dailyNotifications, reportingFrequency: selectedPeriod, country: selectedCountry });
    }
  }, [
    selectedPeriod,
    dailyPerioud,
    dailyNotifications,
    onSaveNotificationData,
    selectedCountry
  ]);
  useEffect(() => {
    if(selectedPeriod === 'Weekly'){
    onSaveNotificationData({ ...weeklyPerioud, ...weeklyNotifications, reportingFrequency: selectedPeriod, country: selectedCountry });
    }
  }, [
    selectedPeriod,
    weeklyPerioud,
    weeklyNotifications,
    onSaveNotificationData,
    selectedCountry
  ]);
  useEffect(() => {
    if(selectedPeriod === 'Monthly'){
    onSaveNotificationData({ ...monthlyPerioud, ...monthlyNotifications, reportingFrequency: selectedPeriod, country: selectedCountry });
    }
  }, [
    selectedPeriod,
    monthlyPerioud,
    monthlyNotifications,
    onSaveNotificationData,
    selectedCountry
  ]);
  useEffect(() => {
    if(selectedPeriod === 'Quarterly'){
    onSaveNotificationData({ ...quarterlyPerioud, ...quarterlyNotifications, reportingFrequency: selectedPeriod, country: selectedCountry });
    }
  }, [
    selectedPeriod,
    quarterlyPerioud,
    quarterlyNotifications,
    onSaveNotificationData,
    selectedCountry
  ]);
  useEffect(() => {
    if(selectedPeriod === 'Custom'){
      onSaveNotificationData({ ...customPeriouds, ...customNotifications, reportingFrequency: selectedPeriod, country: selectedCountry });
    }
  }, [
    selectedPeriod,
    customPeriouds,
    customNotifications,
    onSaveNotificationData,
    selectedCountry
  ]);

  function handleDailyNotificationsUpdate(data: any) {
    const updatedData = { ...dailyNotifications };
    updatedData.afterReportingDueDate = data?.afterReportingDueDate;
    setDailyNotifications(() => updatedData);
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
  }

  const [selectedDaysDueDate, setSselectedDaysDueDate] = React.useState<any>(
    []
  );
  const [selectedFrequencyDueDate, setSelectedFrequencyDueDate] =
    React.useState<any>("Weekly");

  function handlePeriodChange(e: any) {
    selectPeriod(e.target.value);
  }

  return (
    <div className="notification-page">
      <NotificationPeriods
        selectedPeriod={selectedPeriod}
        notificationPeriods={notificationPeriods}
        weeklyPerioud={weeklyPerioud}
        monthlyPerioud={monthlyPerioud}
        quarterlyPerioud={quarterlyPerioud}
        customPerioud={customPeriouds}
        onPeriodChange={handlePeriodChange}
        onWeeklyPerioud={handleWeeklyPerioudUpdate}
        onMonthlyPerioud={handleMonthlyPerioudUpdate}
        onQuarterlyPerioud={handleQuarterlyPerioudUpdate}
        onCustomPerioud={handleCustomPerioud}
      />

      <NotificationRules
        selectedPeriod={selectedPeriod}
        dailyNotifications={dailyNotifications}
        weeklyNotifications={weeklyNotifications}
        monthlyNotifications={monthlyNotifications}
        quarterlyNotifications={quarterlyNotifications}
        customNotifications={customNotifications}
        onDailyNotificationsUpdate={handleDailyNotificationsUpdate}
        onWeeklyNotificationsUpdate={handleWeeklyNotifications}
        onMonthlyNotifications={handleMonthlyNotifications}
        onQuarterlyNotifications={handleQuarterlyNotifications}
        onCustomNotifications={handleCustomNotifications}
        selectedDaysState={selectedDaysDueDate}
        onSelectedDaysState={setSselectedDaysDueDate}
        selectedFrequency={selectedFrequencyDueDate}
        onFrequencyChange={(e: any) =>
          setSelectedFrequencyDueDate(e.target.value)
        }
      />
    </div>
  );
};

export default NotificationComponent;
