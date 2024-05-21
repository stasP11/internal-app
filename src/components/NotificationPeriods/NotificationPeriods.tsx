import React from "react";
import "./NotificationPeriods.scss";

//components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";

interface NotificationPeriodsProps {
  period: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
  notificationPeriods: Array<Period>;
  onPeriodChange: Function;
}

const CustomizedMUISelector: React.FC<any> = ({
  selectedNotificationPeriods,
  notificationPeriods,
  label,
  onPeriodChange,
}): JSX.Element => {
  return (
    <div>
      <Select
        value={selectedNotificationPeriods}
        label={label}
        fullWidth
        onChange={onPeriodChange}
      >
        {notificationPeriods.map((period: Period) => (
          <MenuItem key={period} value={period}>
            {period}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

const WeeklyPeriods: React.FC<any> = (): JSX.Element => {
  return (
    <div className="selector-container">
      <Select
        value={"Monday"}
        label={"Due date"}
        fullWidth
        onChange={(e) => console.log(e)}
      >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
          (period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          )
        )}
      </Select>
      <span className="selector-container__desciption">Day of the week</span>
    </div>
  );
};


const MonthlyPeriods: React.FC<any> = (): JSX.Element => {
  return (
    <div className="monthly-periods">
    <div className="selector-container">
      <Select
        value={1}
        label={"Due date"}
        fullWidth
        onChange={(e) => console.log(e)}
      >
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(
          (period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          )
        )}
      </Select>
      <span className="selector-container__desciption">Start Day of the Next Period</span>
    </div>
        <div className="selector-container">
        <Select
          value={15}
          label={"Due date"}
          fullWidth
          onChange={(e) => console.log(e)}
        >
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(
            (period: any) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            )
          )}
        </Select>
        <span className="selector-container__desciption">Due Day of the Next Period</span>
      </div>
      </div>
  );
};

const NotificationPeriods: React.FC<NotificationPeriodsProps> = ({
  period,
  notificationPeriods,
  onPeriodChange,
}): JSX.Element => {
  return (
    <div className="notification-periods">
      <h2 className="notification-periods__title">Reporting period</h2>

      <div className="notification-periods__periods">
        <CustomizedMUISelector
          selectedNotificationPeriods={period}
          notificationPeriods={notificationPeriods}
          onPeriodChange={onPeriodChange}
        />
      </div>

      <div className="notification-periods-content">
        {period === "Weekly" ? <WeeklyPeriods /> : null}
        {period === "Monthly" ? <MonthlyPeriods /> : null}
      </div>
    </div>
  );
};

export default NotificationPeriods;
