import React, { useState } from "react";

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

type PeriodSettings = any; // Replace 'any' with the actual type if available
type NotificationRules = any; // Replace 'any' with the actual type if available

// Define the type for the data structure
interface FormattedData {
  name: "daily" | "weekly" | "monthly" | "quarterly" | "custom";
  periodsSettings: PeriodSettings;
  notificationRules: NotificationRules;
}

// Define the type for the setter functions
type PeriodSetter = (settings: PeriodSettings) => void;
type NotificationSetter = (rules: NotificationRules) => void;

export default function useNotificationsState(
  onTurnOnEditMode: any,
  selectedCountry: string,
  originalSelectedPeriod: string
) {
  const [selectedPeriod, selectPeriod] = useState<any>(originalSelectedPeriod);
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
  const [selectedDaysDueDate, setSelectedDaysDueDate] = React.useState<any>([]);
  const [selectedFrequencyDueDate, setSelectedFrequencyDueDate] =
    React.useState<any>("Weekly");

  const periodSetters: Record<string, PeriodSetter> = {
    daily: setDailyPeriod,
    weekly: setWeeklyPeriod,
    monthly: setMonthlyPeriod,
    quarterly: setQuarterlyPeriod,
    custom: setCustomPeriods,
  };

  const notificationSetters: Record<string, NotificationSetter> = {
    daily: setDailyNotifications,
    weekly: setWeeklyNotifications,
    monthly: setMonthlyNotifications,
    quarterly: setQuarterlyNotifications,
    custom: setCustomNotifications,
  };

  function applyPeriodAndNotificationSettings(data: FormattedData[] | any) {
    data.forEach(({ name, periodsSettings, notificationRules }: any) => {
      const periodSetter = periodSetters[name];
      const notificationSetter = notificationSetters[name];

      if (periodSetter) {
        periodSetter(periodsSettings);
      }
      if (notificationSetter) {
        notificationSetter(notificationRules);
      }
    });
  }

  function handleWeeklyPeriodUpdate(selectedData: any) {
    selectedData.startDay
      ? setWeeklyPeriod({
          startDay: selectedData?.startDay,
          dueDay: weeklyPeriod?.dueDay,
        })
      : setWeeklyPeriod({
          startDay: weeklyPeriod?.startDay,
          dueDay: selectedData?.dueDay,
        });
    onTurnOnEditMode();
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

    onTurnOnEditMode();
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
    onTurnOnEditMode();
  }

  function handleCustomPeriodUpdate(updatedPeriod: any) {
    if (updatedPeriod?.isRemoved) {
      const updatedPeriods = customPeriods.filter(
        (periodObj: any) => periodObj?.id !== updatedPeriod?.id
      );
      setCustomPeriods(() => [...updatedPeriods]);
    } else if (
      isExistinArray(customPeriods, "id", updatedPeriod.id) &&
      !updatedPeriod?.isRemoved
    ) {
      const updatedPeriods = customPeriods.map((period: any) =>
        period.id === updatedPeriod.id ? { ...updatedPeriod } : period
      );
      setCustomPeriods(() => [...updatedPeriods]);
    } else {
      setCustomPeriods((prev: any) => [...prev, updatedPeriod]);
    }
    onTurnOnEditMode();
  }

  function handleDailyNotificationsUpdate(data: any) {
    const updatedData = { ...dailyNotifications };
    updatedData.afterReportingDueDate = data?.afterReportingDueDate;
    setDailyNotifications(() => updatedData);
    onTurnOnEditMode();
  }

  function handleWeeklyNotificationsUpdate(data: any) {
    const updatedData = { ...weeklyNotifications };
    if (data.afterReportingDueDate) {
      updatedData.afterReportingDueDate = data?.afterReportingDueDate;
      setWeeklyNotifications(() => updatedData);
    }

    if (data.beforeReportingDueDate) {
      updatedData.beforeReportingDueDate = data?.beforeReportingDueDate;
      setWeeklyNotifications(() => updatedData);
    }
    onTurnOnEditMode();
  }

  function handleMonthlyNotificationsUpdate(data: any) {
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

    onTurnOnEditMode();
  }

  function handleQuarterlyNotificationsUpdate(data: any) {
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

    onTurnOnEditMode();
  }

  function handleCustomNotificationsUpdate(data: any) {
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

    onTurnOnEditMode();
  }

  function handleSelectedFrequencyDueDateUpdate(data: string) {
    setSelectedFrequencyDueDate(data);
    onTurnOnEditMode();
  }

  function handleSelectedDaysDueDateUpdate(data: any) {
    setSelectedDaysDueDate(data);
    onTurnOnEditMode();
  }

  function handlePeriodUpdate(e: any) {
    selectPeriod(e.target.value);
    onTurnOnEditMode();
  }

  function getSavedData() {
    if (selectedPeriod === "Daily") {
      return {
        ...dailyPeriod,
        ...dailyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      };
    }
    if (selectedPeriod === "Weekly") {
      return {
        ...weeklyPeriod,
        ...weeklyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      };
    }
    if (selectedPeriod === "Monthly") {
      return {
        ...monthlyPeriod,
        ...monthlyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      };
    }
    if (selectedPeriod === "Quarterly") {
      return {
        ...quarterlyPeriod,
        ...quarterlyNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      };
    }
    if (selectedPeriod === "Custom") {
      return {
        periodsSettings: customPeriods,
        ...customNotifications,
        reportingFrequency: selectedPeriod,
        country: selectedCountry,
      };
    }
  }

  return {
    applyPeriodAndNotificationSettings,
    getSavedData,
    updateState: {
      handleWeeklyPeriodUpdate,
      handleMonthlyPeriodUpdate,
      handleQuarterlyPeriodUpdate,
      handleCustomPeriodUpdate,
      handleDailyNotificationsUpdate,
      handleWeeklyNotificationsUpdate,
      handleMonthlyNotificationsUpdate,
      handleQuarterlyNotificationsUpdate,
      handleCustomNotificationsUpdate,
      handleSelectedFrequencyDueDateUpdate,
      handleSelectedDaysDueDateUpdate,
      selectPeriod,
      handlePeriodUpdate,
    },
    baseState: {
      selectedPeriod,
      dailyPeriod,
      dailyNotifications,
      weeklyPeriod,
      weeklyNotifications,
      monthlyPeriod,
      monthlyNotifications,
      quarterlyPeriod,
      quarterlyNotifications,
      customPeriods,
      customNotifications,
      selectedDaysDueDate,
      selectedFrequencyDueDate,
    },
  };
}
