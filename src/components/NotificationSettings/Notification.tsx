import "./Notification.scss";
import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationSettings/NotificationPeriods";
import NotificationRules from "components/NotificationSettings/NotificationRules";
import { getFromLocalStorage } from "../../services/storageInterection";
import Button from "@mui/material/Button";
import CustomizedSwitches from "../../customized-mui-elements/SwitcherButton/SwitcherButton"

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

// utils
function transformDataForFrontEnd(data: any) {
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
  
  function addID(arr: any){
      const result = arr.map((element: any)=>{
       return { ...element, id: generateRandomId() }
      })
  
  return result;
    }

  function formatDataforCheckButtons(array: any, label: string) {
    console.time("transformDataForFrontEnd");
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

  console.log(rowData, "transformDataForFrontEnd");
  return rowData;
}

type PeriodSettings = any; // Replace 'any' with the actual type if available
type NotificationRules = any; // Replace 'any' with the actual type if available

// Define the type for the data structure
interface FormattedData {
  name: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'custom';
  periodsSettings: PeriodSettings;
  notificationRules: NotificationRules;
}

// Define the type for the setter functions
type PeriodSetter = (settings: PeriodSettings) => void;
type NotificationSetter = (rules: NotificationRules) => void;



const NotificationComponent: React.FC<any> = ({
  onSave,
  data,
  onDefault,
  isDefault,
  onEdit,
  editStatus
}: any): JSX.Element => {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [selectedPeriod, selectPeriod] = useState<Period>(
    data?.reporting_frequency
  );

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
  
  function handleData(transformedForFrontEndData: any){
    if(transformedForFrontEndData){
      applyPeriodAndNotificationSettings(transformedForFrontEndData);
    }
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
    onEdit(true);
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

    onEdit(true);
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
    onEdit(true);
  }

  function handleCustomPeriod(updatedPeriod: any) {
    if(updatedPeriod?.isRemoved){
     console.log('remove value', updatedPeriod.id);
     const updatedPeriods = customPeriods.filter((periodObj: any) => periodObj?.id !== updatedPeriod?.id);
     setCustomPeriods(() => [...updatedPeriods]);
    }
    else if (isExistinArray(customPeriods, "id", updatedPeriod.id) && !updatedPeriod?.isRemoved) {
      const updatedPeriods = customPeriods.map((period: any) =>
        period.id === updatedPeriod.id ? { ...updatedPeriod } : period
      );
      setCustomPeriods(() => [...updatedPeriods]);
    } else {
      setCustomPeriods((prev: any) => [...prev, updatedPeriod]);
    }
    onEdit(true);
  }

  function handleDailyNotificationsUpdate(data: any) {
    const updatedData = { ...dailyNotifications };
    updatedData.afterReportingDueDate = data?.afterReportingDueDate;
    setDailyNotifications(() => updatedData);
    onEdit(true);
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
    onEdit(true);
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

    onEdit(true);
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

    onEdit(true);
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

    onEdit(true);
  }

  function handleSelectedFrequencyDueDate(data: string) {
    setSelectedFrequencyDueDate(data);
    onEdit(true);
  }

  function handleSelectedDaysDueDate(data: any) {
    setSelectedDaysDueDate(data);
    onEdit(true);
  }

  function handlePeriodChange(e: any) {
    selectPeriod(e.target.value);
    onEdit(true);
  }

  function handleSaveUpdatedData() {
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

  function handleCancelUpdatedData(){
    const transformedForFrontEndData = transformDataForFrontEnd(data);
    handleData(transformedForFrontEndData);
    onEdit(true);
    
  }

  useEffect(() => {
    const transformedForFrontEndData = transformDataForFrontEnd(data);
    selectPeriod(data?.reporting_frequency);
    if(transformedForFrontEndData){
      handleData(transformedForFrontEndData);
    }
  }, [data]);

  return (
    <div className="notification-page">
      {true && (
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
                variant="outlined"
                onClick={handleCancelUpdatedData}
                disabled={!editStatus}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSaveUpdatedData}
                disabled={!editStatus}
              >
                Save
              </Button>
            </div>
            <div className="notification-control__switcher">
             <CustomizedSwitches value={isDefault} label={'Default settings'} onChange={onDefault}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationComponent;
