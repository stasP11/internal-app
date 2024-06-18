import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationPeriods/NotificationPeriods";
import NotificationRules from "components/NotificationRules/NotificationRules";
import Button from "@mui/material/Button";
import "./NotificationsPage.scss";


// utils
function isExistinArray(array: Array<any>, key: any, value: any) {
  return array.some(obj => obj[key] === value);
}

const exempleData2 = [
  {
    name: "daily",
    periodsSettings: {},
    notificationRules: {
      afterReportingDueDate: [1, 2, 3, 4, 5],
    },
  },
  {
    name: "weekly",
    periodsSettings: {
      dueDay: "Friday",
    },
    notificationRules: {
      afterReportingDueDate: [1,3,5],
      beforeReportingDueDate: [{label: 'on due Date', selected: false, value: 0, id: '02092'}, {label: '1 day before', selected: true, value: 1, id: '02093'}],
    },
  },
  {
    name: "monthly",
    periodsSettings: {
      startDay: 1,
      dueDay: 30,
    },
    notificationRules: {
      afterReportingDueDate: ["Rule1"],
      beforeReportingDueDate: ["Rule2", "Rule3"],
      beforeReportingStartDate: ["Rule4"],
    },
  },
  {
    name: "quarterly",
    periodsSettings: {
      startDay: 1,
      dueDay: 30,
    },
    notificationRules: {
      afterReportingDueDate: [1, 2, 3, 4, 5],
    },
  },
  {
    name: "custom",
    periodsSettings: [
      {
        id: '2024-01-01_2024-01-31',
        startPerioud: "01-01-2024",
        endPerioud: "22-01-2024",
        startDay: 1,
        dueDay: 31,
      },
      {
        id: '2024-02-01_2024-02-28',
        startPerioud: "02-04-2024",
        endPerioud: "22-06-2024",
        startDay: 1,
        dueDay: 28,
      },
    ],
    notificationRules: {
      afterReportingDueDate: ["Rule1"],
      beforeReportingDueDate: ["Rule2"],
      beforeReportingStartDate: ["Rule3"],
    },
  },
];
type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
const notificationPeriods:Array<Period> = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Custom",
];

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [selectedPeriod, selectPeriod] = useState<any>("Daily");

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


  function handleWeeklyPerioudUpdate(selectedDay: any){
    setWeeklyPerioud({dueDay: selectedDay});
  }

  function handleMonthlyPerioudUpdate(selectedData: any){
    selectedData.startDay ? setMonthlyPerioud({ startDay: selectedData?.startDay, dueDay: monthlyPerioud?.dueDay}):
    setMonthlyPerioud({ startDay: monthlyPerioud?.startDay, dueDay: selectedData?.dueDay})
  }

  function handleQuarterlyPerioudUpdate(selectedData: any){
    selectedData.startDay ? setQuarterlyPerioud({ startDay: selectedData?.startDay, dueDay: quarterlyPerioud?.dueDay}):
    setQuarterlyPerioud({ startDay: quarterlyPerioud?.startDay, dueDay: selectedData?.dueDay})
  }

  function handleCustomPerioud(updatedPeriod: any){
    console.log(updatedPeriod, 'updatedPeriod')
   if(isExistinArray(customPeriouds, 'id', updatedPeriod.id)){
      const updatedPeriods = customPeriouds.map((period: any)=>
        period.id === updatedPeriod.id ? {...updatedPeriod} : period
      )
      setCustomPeriouds(()=> [...updatedPeriods]);
   } else {
    setCustomPeriouds((prev:any)=> [...prev, updatedPeriod]);
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



function handleDailyNotificationsUpdate(data: any){
  const updatedData = {...dailyNotifications};
  updatedData.afterReportingDueDate = data?.afterReportingDueDate;
  setDailyNotifications(()=> updatedData)
}
  
function handleWeeklyNotifications(data: any){
  
  const updatedData = {...weeklyNotifications};
  if(data.afterReportingDueDate ){
  updatedData.afterReportingDueDate = data?.afterReportingDueDate;
  setWeeklyNotifications(()=> updatedData)
  }

  if(data.beforeReportingDueDate ){
    updatedData.beforeReportingDueDate = data?.beforeReportingDueDate;
    setWeeklyNotifications(()=> updatedData)
  }
  
}

  console.log(
    dailyPerioud,
    dailyNotifications,
    weeklyPerioud,
    weeklyNotifications,
    monthlyPerioud,
    monthlyNotifications,
    quarterlyPerioud,
    quarterlyNotifications,
    customPeriouds,
    customNotifications,
  );

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
      <div className="button-panel">
        <div className="button-panel__buttons">
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Save</Button>
        </div>
      </div>
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

        onDailyNotificationsUpdate={handleDailyNotificationsUpdate}
        onWeeklyNotificationsUpdate={handleWeeklyNotifications}




        selectedDaysState={selectedDaysDueDate}
        onSelectedDaysState={setSselectedDaysDueDate}
        selectedFrequency={selectedFrequencyDueDate}
        onFrequencyChange={(e: any) =>
          setSelectedFrequencyDueDate(e.target.value)
        }
      />

      <div onClick={()=>console.log(weeklyNotifications, 'weeklyNotifications')}>Test</div>
    </div>
  );
};

export default ReportDetailsPage;
