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
}

const dayOfWeeksDictionary = {
  Monday: 0,
}

const analogyDictionary = {
  reportingFrequency: "reporting_frequency",
  startDay: "reporting_start_date",
  dueDay: "reporting_due_date",
  afterReportingDueDate: "after_due_date",
  beforeReportingDueDate: "before_due_date",
  beforeReportingStartDate: "before_start_date",
};

function formatDataforUpdate(
  formattableData: any,
  updateData: any,
  analogyDictionary: any
) {
  const result = { ...formattableData };
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
function addOldToKeys(data: any) {
  const newObj: any = {};
  data.forEach((item: any) => {
    Object.keys(item).forEach((key) => {
      newObj[`${key}_old`] = item[key];
    });
  });

  return [data[0], newObj];
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

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [reportType, setReportType] = useState("inventory");
  const [notificationData, setNotificationData] = useState({});
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading, error } = useReportingPeriodsData(selectedCountry, reportType);

  const notificationPeriodsData: ReportingData = data?.data[0]

  console.log(data?.data[0], "data!!!");

  const testData: any = [
    {
      country: "Ukraine",
      rewarded_period_days: 15,
      reporting_period_days: 90,
      rule_starting_from: "2020-01-01",
      reporting_frequency: "Monthly",
      before_start_date: "1,2,3",
      before_due_date: "2,3",
      after_due_date: "2,3",
      reporting_start_date: 0,
      email_settings: "",
      reporting_due_date: 2,
      report_type: "inventory",
      custom_periods:
        "01.07.2024-01.08.2024,01.08.2024-01.10.2024,01.10.2024-01.12.2024",
    },
  ];

  const dataForUpdate = addOldToKeys(testData);

  console.log(dataForUpdate, "dataForUpdate");

  function handleSave() {
    console.log(notificationData, "notificationData");
    console.log(handleObj(notificationData), "notificationData");
    const formatedData1 = formatDataforUpdate(
      testData[0],
      handleObj(notificationData),
      analogyDictionary
    );

    updateReportingPeriods([formatedData1, addOldToKeys2(testData[0])]);
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
