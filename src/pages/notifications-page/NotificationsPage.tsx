import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationSettings/NotificationPeriods";
import NotificationRules from "components/NotificationSettings/NotificationRules";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./NotificationPage.scss";

import NotificationComponent from "components/NotificationSettings/Notification";
import { updateReportingPeriods } from "../../api/requests";
import useReportingPeriodsData from "../../hooks/swr-hooks/useReportingPeriods";
import { getFromLocalStorage } from "../../services/storageInterection";

interface ReportingData {
  after_due_date: number[];
  before_due_date: number[];
  before_start_date: number[];
  country: string;
  custom_periods: null | any;  // If you know the specific type, replace 'any' with that type
  email_settings: string;
  report_type: string;
  reporting_due_date: number;
  reporting_frequency: string;
  reporting_period_days: number;
  reporting_start_date: number;
  rewarded_period_days: number;
  rule_starting_from: string;  // Assuming this is a date string, you could use a Date type if you convert it
  [key: string]: string | number | number[] | any;
}

const analogyDictionary = {
  reportingFrequency: "reporting_frequency",
  startDay: "reporting_start_date",
  dueDay: "reporting_due_date",
  afterReportingDueDate: "after_due_date",
  beforeReportingDueDate: "before_due_date",
  beforeReportingStartDate: "before_start_date",
  periodsSettings: "custom_periods"
};

const notificationsDataStructure = [
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

console.log(notificationsDataStructure);

type NotificationsDataStructureType = typeof notificationsDataStructure;

function formatDataforUpdate(
  formattableData: any,
  updateData: any,
  analogyDictionary: any
) {
  const result = { ...formattableData };
  console.log(updateData, 'updateData')
  Object.keys(updateData).forEach((key: any) => {
    const updateDataKey = analogyDictionary[key];
    if (updateDataKey) {
      result[updateDataKey] = updateData[key];
    }
  });

  console.log(result, "result");
  return result;
}

// utils
function formatOldData(data: any) {
  if(data){
    const newObj: any = {};
    data.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        newObj[`${key}_old`] = item[key];
      });
    });
  
    return [data[0], newObj];
  }
}

function addOldToKeys2(item: any) {
  const newObj: any = {};
  Object.keys(item).forEach((key) => {
    newObj[`${key}_old`] = item[key];
  });

  return newObj;
}

function extractSelectedValueFromArray(arr: any): any[] {
  if (arr.length === 0) return arr;

  if (typeof arr[0] === "number") {
    return arr;
  }

  return (arr as { selected: boolean; value: any }[])
    .filter((item) => item.selected)
    .map((item) => item.value);
}

function handleObj(obj: any) {
  const newObj: any = {};

  Object.keys(obj).forEach((key: any) => {
    if (Array.isArray(obj[key])) {
      newObj[key] = extractSelectedValueFromArray(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}

function transformReportingData(data: ReportingData, dataStructure: any) {
  if(data && dataStructure){
    const reportingFrequency = data[`${analogyDictionary.reportingFrequency}`];
    const reportingObj = dataStructure.find((obj: any)=> obj[reportingFrequency] === obj.reportingFrequency);
  
    console.log(reportingObj, 'test-001')
  }  
  
  return {};
}

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [reportType, setReportType] = useState("inventory");
  const [notificationData, setNotificationData] = useState<any>({});
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading, error } = useReportingPeriodsData(selectedCountry, reportType);
  const notificationPeriodsData: ReportingData = data?.data[0]


 function handleSetTest(data: any){
    setNotificationData(()=> data);
  }

  transformReportingData(notificationPeriodsData, notificationsDataStructure);
  const testData: any = data?.data;
  const dataForUpdate = formatOldData(testData);



  function handleSave() {
    const formatedData1 = formatDataforUpdate(
      testData[0],
      handleObj(notificationData),
      analogyDictionary
    );

    console.log({...formatedData1, ...addOldToKeys2(testData[0])}, 'test-002')
    updateReportingPeriods({
      data: [
          {
              ...formatedData1,
              ...addOldToKeys2(testData[0])
          }
      ]
  });
  }

  return (
    <div className="notification-page">
      <div className="notification-switcher">
        <div
          className={reportType === "inventory" ? "selected" : ""}
          onClick={() => setReportType("inventory")}
        >
          Inventory report
        </div>
        <div
          className={reportType === "sellout" ? "selected" : ""}
          onClick={() => setReportType("sellout")}
        >
          Sell-out report
        </div>
      </div>

      {reportType === "inventory" ? (
        <NotificationComponent onSaveNotificationData={setNotificationData} />
      ) : (
        <NotificationComponent onSaveNotificationData={setNotificationData} />
      )}

      <div className="notification-control">
        <div className="notification-control__buttons">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </div>

        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Default settings"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ReportDetailsPage;
