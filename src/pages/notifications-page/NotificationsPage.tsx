import React from "react";
import NotificationPeriods from "components/NotificationPeriods/NotificationPeriods";
import NotificationRules from "components/NotificationRules/NotificationRules";
import Button from "@mui/material/Button";
import "./NotificationsPage.scss";

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [selectedPeriod, selectPeriod] = React.useState<any>("Daily");
  const [selectedDaysDueDate, setSselectedDaysDueDate] = React.useState<any>(
    []
  );
  const [selectedFrequencyDueDate, setSelectedFrequencyDueDate] =
    React.useState<any>("Weekly");

  function handleFrequencyDueDate(e: any) {
    console.log(e.target.value);
  }

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
        period={selectedPeriod}
        notificationPeriods={[
          "Daily",
          "Weekly",
          "Monthly",
          "Quarterly",
          "Custom",
        ]}
        onPeriodChange={handlePeriodChange}
      />
      <NotificationRules
        period={selectedPeriod}
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

export default ReportDetailsPage;
