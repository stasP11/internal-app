import React, { useState, useEffect, lazy, memo, useTransition } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { SuccessAlert, ErrorAlert, TimelinesAlert } from "components/Alerts/Alerts"


const MemoizedNotificationComponent = memo(NotificationComponent);


interface ReportingData {
  after_due_date: number[];
  before_due_date: number[];
  before_start_date: number[];
  country: string;
  custom_periods: null | any; // If you know the specific type, replace 'any' with that type
  email_settings: string;
  report_type: string;
  reporting_due_date: number;
  reporting_frequency: string;
  reporting_period_days: number;
  reporting_start_date: number;
  rewarded_period_days: number;
  rule_starting_from: string; // Assuming this is a date string, you could use a Date type if you convert it
  [key: string]: string | number | number[] | any;
}

const analogyDictionary: any = {
  reportingFrequency: "reporting_frequency",
  startDay: "reporting_start_date",
  dueDay: "reporting_due_date",
  afterReportingDueDate: "after_due_date",
  beforeReportingDueDate: "before_due_date",
  beforeReportingStartDate: "before_start_date",
  periodsSettings: "custom_periods",
};

function formatDataForBackEnd(data: any) {
  const newObj: any = {};

  for (let key in data) {
    newObj[key] = data[key];
    newObj[`${key}_old`] = data[key];
  }

  return newObj;
}

// utils
function extractUpdateForTimelines(data: any) {
  const handledDataObject: any = {};
  const arrayOfKeys = Object.keys(data);
  function extractSelectedValueFromArray(arr: any): any[] {
    if (arr.length === 0) return arr;
    if (typeof arr[0] === "number") {
      return arr;
    }
    return (arr as { selected: boolean; value: any }[])
      .filter((item) => item.selected)
      .map((item) => item.value);
  }
  arrayOfKeys.forEach((key: string) => {
    const keyValue = data[key];
    const keyValueIsArray = Array.isArray(keyValue);

    //potential error!!!
    const actualNameForBackEnd =
      key in analogyDictionary ? analogyDictionary[key] : key;
    console.log(actualNameForBackEnd, "actualNameForBackEnd");

    if (keyValueIsArray && key !== "periodsSettings") {
      handledDataObject[actualNameForBackEnd] =
        extractSelectedValueFromArray(keyValue);
    } else if (keyValueIsArray && key == "periodsSettings") {
      handledDataObject[actualNameForBackEnd] = keyValue.map(
        ({ startPeriod, endPeriod, startDay, dueDay }: any) => {
          return { startPeriod, endPeriod, startDay, dueDay };
        }
      );
    } else {
      handledDataObject[actualNameForBackEnd] = String(keyValue);
    }
  });
  return handledDataObject;
}

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [reportType, setReportType] = useState("inventory");
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading, error } = useReportingPeriodsData(
    selectedCountry,
    reportType
  );
  const notificationPeriodsData: ReportingData = data?.data[0];
  const [updateStatus, setUpdateStatus] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [alertStatus, setAlertStatus] = useState<any>(null);

  function handleReportTypeSwitch(reportType: 'inventory'| 'sellout'){
    startTransition(()=>{
      setReportType(reportType);
    })
  }

  function handleSave(data: any) {
    // utils
    function updateObj(original: any, updates: any) {
      for (let key in updates) {
        if (key in original) {
          original[key] = updates[key];
        }
      }

      return original;
    }

    const formatedDataForBackEnd = formatDataForBackEnd(
      notificationPeriodsData
    );
    const updatedData = extractUpdateForTimelines(data);
    const dataForSave = updateObj(formatedDataForBackEnd, updatedData);
    setUpdateStatus(true);

    // utils
    function getSaveRequestStatus(requestStatus: string) {
      setUpdateStatus(false);
      setAlertStatus(requestStatus);
    }
    updateReportingPeriods({ data: [dataForSave] }, getSaveRequestStatus);
  }

  return (
    <div className="notification-page">
      <TimelinesAlert status={alertStatus} onClose={()=>setAlertStatus(null)}/>

      <div className="notification-switcher">
        <div
          className={reportType === "inventory" ? "selected" : ""}
          onClick={() => handleReportTypeSwitch("inventory")}
        >
          Inventory report
        </div>
        <div
          className={reportType === "sellout" ? "selected" : ""}
          onClick={() => handleReportTypeSwitch("sellout")}
        >
          Sell-out report
        </div>
      </div>
      {reportType === "inventory" && notificationPeriodsData  &&(
        <MemoizedNotificationComponent
          data={notificationPeriodsData}
          onSave={handleSave}
        />
      )}

      {reportType === "sellout" && notificationPeriodsData &&(
        <MemoizedNotificationComponent
          data={notificationPeriodsData}
          onSave={handleSave}
        />
      )}

      {updateStatus && (
        <CircularProgress
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default ReportDetailsPage;
