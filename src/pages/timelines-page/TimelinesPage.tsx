import React, { useState, useEffect, useTransition, useContext } from "react";
import "./TimelinesPage.scss";
import NotificationComponent from "components/NotificationSettings/Notification";
import { updateReportingPeriods } from "../../api/requests";
import useReportingPeriodsData from "../../hooks/swr-hooks/useReportingPeriods";
import { getFromLocalStorage } from "../../services/storageInterection";
import CircularProgress from "@mui/material/CircularProgress";
import useNotificationsState from "../../hooks/notifications-hook/useNotificationsState";
import { PageInfoContext } from "../../contexts/PageInfoContext";
import transformNotificationsDataForFrontEnd from "../../utils/transformNotificationsDataForFrontEnd";
import extractUpdateForTimelines from "../../utils/extractUpdateForTimelines";
import updateObj from "../../utils/updateObj";
import formatDataForBackEnd from "utils/formatDataForBackEnd";
import { AlertsContext } from "contexts/AlertsContext";

const scrollToTop = () => {
  document.documentElement.scrollTop = 0;
  setTimeout(() => {
    window.scrollTo(10, 200);
  }, 0);
};
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

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const { setPageInfo } = useContext(PageInfoContext);
  const { setNewAlert } = useContext(AlertsContext);
  const [reportType, setReportType] = useState("inventory");
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [isDefaultReport, setDefaultReportStatus] = useState(false);
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

  useEffect(() => {
    setPageInfo({
      headerContent: "Timelines",
    });
  }, []);

  useEffect(() => {
    if (notificationPeriodsData) {
      const hendledData = transformNotificationsDataForFrontEnd(
        notificationPeriodsData
      );
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
    setDefaultReportStatus(false);
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
      setDefaultReportStatus(true);
      setEditMode(true);

      if (formatedNotificationData) {
        applyPeriodAndNotificationSettings(formatedNotificationData);
        updateState.selectPeriod(notificationPeriodsData?.reporting_frequency);
      }
    } else {
      setDefaultToggleOn(false);
      setDefaultReportStatus(false);
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
    const updatedData = extractUpdateForTimelines(savedData, analogyDictionary);
    const dataForSave = updateObj(formatedDataForBackEnd, updatedData);
    setUpdateStatus(true);

    async function getSaveRequestStatus(responce: any) {
      if (responce?.ok) {
        // setTimeout is temporary solution until the backend is fixed;
        setTimeout(async () => {
          await mutate();
          scrollToTop();
          setUpdateStatus(false);
          setNewAlert({
            alertType: "success",
            text: "The update was completed successfully",
          });
          setDefaultReportStatus(false);
          setDefaultReportStatus(false);
          setEditMode(false);
        }, 2000);
      } else {
        setNewAlert({
          alertType: "error",
          text: "Some issue happened",
        });
        scrollToTop();
        setUpdateStatus(false);
        setDefaultReportStatus(false);
        setEditMode(false);
      }
    }

    // temporary solution until the backend is fixed;
    if (dataForSave.country && dataForSave) {
      dataForSave.country_old = dataForSave.country;
    }

    updateReportingPeriods({ data: [dataForSave] }, getSaveRequestStatus);
  }

  return (
    <>
      <div className="notification-page">
        <div>
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
          {reportType === "inventory" &&
            formatedNotificationData &&
            baseState && (
              <NotificationComponent
                data={formatedNotificationData}
                onSave={handleSaveUpdates}
                onDefault={setDefaultReportStatus}
                isDefault={isDefaultReport}
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

          {reportType === "sellout" &&
            formatedNotificationData &&
            baseState && (
              <NotificationComponent
                data={formatedNotificationData}
                onSave={handleSaveUpdates}
                onDefault={setDefaultReportStatus}
                isDefault={isDefaultReport}
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
      </div>
    </>
  );
};

export default ReportDetailsPage;