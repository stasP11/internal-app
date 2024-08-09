import "./Notification.scss";
import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationSettings/NotificationPeriods";
import NotificationRules from "components/NotificationSettings/NotificationRules";
import { getFromLocalStorage } from "../../services/storageInterection";
import Button from "@mui/material/Button";
import CustomizedSwitches from "../../customized-mui-elements/SwitcherButton/SwitcherButton";

type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
const notificationPeriods: Array<Period> = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Custom",
];

type NotificationRules = any; // Replace 'any' with the actual type if available

const NotificationComponent: React.FC<any> = ({
  onSave,
  baseState,
  updateState,
  isDefaultToggleOn,
  isInEditMode,
  onDefaultToggleChange,
  onCancelDataEdit,
}: any): JSX.Element => {

  return (
    <div className="notification-page">
      {true && (
        <>
          <NotificationPeriods
            selectedPeriod={baseState.selectedPeriod}
            notificationPeriods={notificationPeriods}
            weeklyPeriod={baseState.weeklyPeriod}
            monthlyPeriod={baseState.monthlyPeriod}
            quarterlyPeriod={baseState.quarterlyPeriod}
            customPeriod={baseState.customPeriods}
            onPeriodChange={updateState.handlePeriodUpdate}
            onWeeklyPeriod={updateState.handleWeeklyPeriodUpdate}
            onMonthlyPeriod={updateState.handleMonthlyPeriodUpdate}
            onQuarterlyPeriod={updateState.handleQuarterlyPeriodUpdate}
            onCustomPeriod={updateState.handleCustomPeriodUpdate}
          />

          <NotificationRules
            selectedPeriod={baseState.selectedPeriod}
            dailyNotifications={baseState.dailyNotifications}
            weeklyNotifications={baseState.weeklyNotifications}
            monthlyNotifications={baseState.monthlyNotifications}
            quarterlyNotifications={baseState.quarterlyNotifications}
            customNotifications={baseState.customNotifications}
            selectedDaysState={baseState.selectedDaysDueDate}
            selectedFrequency={baseState.selectedFrequencyDueDate}
            onDailyNotificationsUpdate={
              updateState.handleDailyNotificationsUpdate
            }
            onWeeklyNotificationsUpdate={
              updateState.handleWeeklyNotificationsUpdate
            }
            onMonthlyNotifications={
              updateState.handleMonthlyNotificationsUpdate
            }
            onQuarterlyNotifications={
              updateState.handleQuarterlyNotificationsUpdate
            }
            onCustomNotifications={updateState.handleCustomNotificationsUpdate}
            onSelectedDaysState={updateState.handleSelectedDaysDueDateUpdate}
            onFrequencyChange={(e: any) =>
              updateState.handleSelectedFrequencyDueDateUpdate(e.target.value)
            }
          />

          <div className="notification-control">
            <div className="notification-control__buttons">
              <Button
                variant="outlined"
                onClick={onCancelDataEdit}
                disabled={!isInEditMode}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={onSave}
                disabled={!isInEditMode}
              >
                Save
              </Button>
            </div>
            <div className="notification-control__switcher">
              <CustomizedSwitches
                value={isDefaultToggleOn}
                label={"Default settings"}
                onChange={(e: any) => onDefaultToggleChange(e)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationComponent;
