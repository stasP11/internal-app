import React, { useState, useEffect, useTransition, useContext } from "react";
import "./TimelinesPage.scss";

import NotificationComponent from "components/NotificationSettings/Notification";
import { updateReportingPeriods } from "../../api/requests";
import useReportingPeriodsData from "../../hooks/swr-hooks/useReportingPeriods";
import { getFromLocalStorage } from "../../services/storageInterection";
import CircularProgress from "@mui/material/CircularProgress";
import { TimelinesAlert } from "components/Alerts/Alerts";

import useNotificationsState from "../../fetch/fetch-hooks/notifications-hook/useNotificationsState";
import { PageInfoContext} from '../../contexts/PageInfoContext';

// utils

function isArrayOfNumbers(arr: any[]): boolean {
  return (
    Array.isArray(arr) && arr.every((element) => typeof element === "number")
  );
}

// Function to remove duplicates from an array
function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

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

function formatDataForBackEnd(data: any): any {
  const newObj: any = {};

  // Iterate over each key in the data object
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      newObj[key] = Array.isArray(data[key])
        ? removeDuplicates(data[key])
        : data[key];
      newObj[`${key}_old`] = data[key];
    }
  }

  return newObj;
}

// utils

//move to  utils
function extractUpdateForTimelines(data: any) {
  const handledDataObject: any = {};
  const arrayOfKeys = Object.keys(data);

  function extractSelectedValueFromArray(arr: any): any[] {
    if (arr.length === 0) return arr;
    if (isArrayOfNumbers(arr)) {
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

    if (keyValueIsArray && key !== "periodsSettings") {
      handledDataObject[actualNameForBackEnd] = removeDuplicates(
        extractSelectedValueFromArray(keyValue)
      );
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

//move to  utils
function updateObj(original: any, updates: any) {
  for (let key in updates) {
    if (key in original) {
      original[key] = updates[key];
    }
  }

  return original;
}

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const { setPageInfo } = useContext(PageInfoContext);
  const [reportType, setReportType] = useState("inventory");
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [isDefaultReport, setDefaultReport] = useState(false);
  const { data, isLoading, error, mutate } = useReportingPeriodsData(
    selectedCountry,
    reportType,
    isDefaultReport
  );
  const notificationPeriodsData: ReportingData = data?.data
    ? data?.data[0]
    : undefined;
  const [formatedNotificationData, setFormatedNotificationData] =
    useState<any>();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [alertStatus, setAlertStatus] = useState<any>(null);
  const [editStatus, setEditStatus] = useState(true);
  const [isDefaulrReport, setDefaultReportStatus] = useState(false);
  const [isDefaultToggleOn, setDefaultToggleOn] = useState(false);
  const [isInEditMode, setEditMode] = useState(false);

  const {
    baseState,
    updateState,
    getSavedData,
    applyPeriodAndNotificationSettings,
  } = useNotificationsState(
    handleTurnOnEditMode,
    selectedCountry,
    notificationPeriodsData?.reporting_frequency
  );

  useEffect(()=>{
    setPageInfo({
      headerContent: "Timelines",
    })
  }, [])

  useEffect(() => {
    if (notificationPeriodsData) {
      const hendledData = transformDataForFrontEnd(notificationPeriodsData);
      const selectedPeriod = notificationPeriodsData?.reporting_frequency;
      if (hendledData) {
        setFormatedNotificationData(hendledData);
      }
      if (selectedPeriod) {
        updateState.selectPeriod(selectedPeriod);
      }
    }
  }, [notificationPeriodsData]);

  useEffect(() => {
    if (formatedNotificationData) {
      applyPeriodAndNotificationSettings(formatedNotificationData);
    }
  }, [formatedNotificationData]);

  function handleCancelDataEdit() {
    setDefaultToggleOn(false);
    setDefaultReport(false);
    setEditMode(false);

    if (formatedNotificationData) {
      applyPeriodAndNotificationSettings(formatedNotificationData);
    }
  }

  function handleTurnOnEditMode() {
    // for any changes, the default switch must be deactivated
    setEditMode(true);
    setDefaultToggleOn(false);
  }

  function handleDefaultToggleChange(value: boolean) {
    if (value) {
      setDefaultToggleOn(true);
      setDefaultReport(true);
      setEditMode(true);

      if (formatedNotificationData) {
        applyPeriodAndNotificationSettings(formatedNotificationData);
        updateState.selectPeriod(notificationPeriodsData?.reporting_frequency);
      }
    } else {
      setDefaultToggleOn(false);
      setDefaultReport(false);
    }
  }

  function handleReportTypeSwitch(reportType: "inventory" | "sellout") {
    startTransition(() => {
      setReportType(reportType);
    });
  }

  function handleSaveUpdates() {
    const savedData = getSavedData();
    const formatedDataForBackEnd = formatDataForBackEnd(
      notificationPeriodsData
    );
    const updatedData = extractUpdateForTimelines(savedData);
    const dataForSave = updateObj(formatedDataForBackEnd, updatedData);
    setUpdateStatus(true);

    // utils
    function getSaveRequestStatus(responce: any) {
      if (responce?.ok) {
        setUpdateStatus(false);
        setAlertStatus({
          type: "success",
          message: "The request was completed successfully",
        });
        setDefaultReportStatus(false);
        setEditMode(false);

        // temporary
        setTimeout(() => {
          mutate(
            `${process.env.REACT_APP_API_PYTHON_API}/get_reporting_periods?country=${selectedCountry}&report_type=${reportType}`
          );
        }, 2000);
      } else {
        setAlertStatus({ type: "error", message: "Some issues happened" });
        setUpdateStatus(false);
        setDefaultReportStatus(false);
        setEditMode(false);
      }
    }
    updateReportingPeriods({ data: [dataForSave] }, getSaveRequestStatus);
  }

  return (
    <div className="notification-page">
      <TimelinesAlert
        status={alertStatus}
        onClose={() => setAlertStatus(null)}
      />

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
      {reportType === "inventory" && formatedNotificationData && baseState && (
        <NotificationComponent
          data={formatedNotificationData}
          onSave={handleSaveUpdates}
          onDefault={setDefaultReportStatus}
          isDefault={isDefaulrReport}
          editStatus={editStatus}
          onEdit={setEditStatus}
          baseState={baseState}
          updateState={updateState}
          isInEditMode={isInEditMode}
          isDefaultToggleOn={isDefaultToggleOn}
          onDefaultToggleChange={handleDefaultToggleChange}
          onTurnOnEditMode={handleTurnOnEditMode}
          onCancelDataEdit={handleCancelDataEdit}
        />
      )}

      {reportType === "sellout" && formatedNotificationData && baseState && (
        <NotificationComponent
          data={formatedNotificationData}
          onSave={handleSaveUpdates}
          onDefault={setDefaultReportStatus}
          isDefault={isDefaulrReport}
          editStatus={editStatus}
          onEdit={setEditStatus}
          baseState={baseState}
          updateState={updateState}
          isInEditMode={isInEditMode}
          isDefaultToggleOn={isDefaultToggleOn}
          onDefaultToggleChange={handleDefaultToggleChange}
          onTurnOnEditMode={handleTurnOnEditMode}
          onCancelDataEdit={handleCancelDataEdit}
        />
      )}

      {updateStatus || isLoading ? (
        <CircularProgress
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
    </div>
  );
};

export default ReportDetailsPage;
