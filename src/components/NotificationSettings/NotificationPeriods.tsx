import React, { useState } from "react";
import "./NotificationPeriods.scss";
import dayjs from "dayjs";

//components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { Button } from "@mui/material";

//utils
import generateRandomId from "../../utils/genereteRandomId.js"

type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";

const dateFormat ='DD-MM-YYYY';

const dayNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

interface NotificationPeriodsProps {
  selectedPeriod: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
  notificationPeriods: Array<Period>;
  weeklyPerioud: any;
  monthlyPerioud: any;
  quarterlyPerioud: any;
  customPerioud: any;
  onPeriodChange: Function;
  onWeeklyPerioud: Function;
  onMonthlyPerioud: Function;
  onQuarterlyPerioud: Function;
  onCustomPerioud: Function;
}

const CustomizedMUISelector: React.FC<any> = ({
  selectedPeriod,
  notificationPeriods,
  label,
  onPeriodChange,
}): JSX.Element => {
  return (
    <div>
      <Select
        value={selectedPeriod}
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

const WeeklyPeriods: React.FC<any> = ({ data, onUpdate }: any): JSX.Element => {
  const daysOfweek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <div className="selector-container">
      <Select
        value={daysOfweek[data?.dueDay]}
        label={"Due date"}
        fullWidth
        onChange={(e: any) => onUpdate(daysOfweek.indexOf(e.target.value))}
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

const MonthlyPeriods: React.FC<any> = ({
  data,
  onUpdate,
}: any): JSX.Element => {
  console.log(data, "data-test");
  return (
    <div className="monthly-periods">
      <div className="selector-container">
        <Select
          value={data?.startDay}
          label={"Due date"}
          fullWidth
          onChange={(e) => onUpdate({ startDay: e.target.value })}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ].map((period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
        <span className="selector-container__desciption">
          Start Day of the Next Period
        </span>
      </div>
      <div className="selector-container">
        <Select
          value={data?.dueDay}
          label={"Due date"}
          fullWidth
          onChange={(e) => onUpdate({ dueDay: e.target.value })}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ].map((period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
        <span className="selector-container__desciption">
          Due Day of the Next Period
        </span>
      </div>
    </div>
  );
};

const QuarterlyPeriods: React.FC<any> = ({
  data,
  onUpdate,
}: any): JSX.Element => {
  console.log(data, "data-test");
  return (
    <div className="monthly-periods">
      <div className="selector-container">
        <Select
          value={data?.startDay}
          label={"Due date"}
          fullWidth
          onChange={(e) => onUpdate({ startDay: e.target.value })}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ].map((period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
        <span className="selector-container__desciption">
          Start Day of the Next Period
        </span>
      </div>
      <div className="selector-container">
        <Select
          value={data?.dueDay}
          label={"Due date"}
          fullWidth
          onChange={(e) => onUpdate({ dueDay: e.target.value })}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ].map((period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
        <span className="selector-container__desciption">
          Due Day of the Next Period
        </span>
      </div>
    </div>
  );
};

const CustomPeriod: React.FC<any> = ({
  id,
  startPerioud,
  endPerioud,
  startDay,
  dueDay,
  onUpdate,
}: any): JSX.Element => {
  console.log(startPerioud, endPerioud, 'endPerioud');
  function handleDatePikerData(value: any) {
    const [start, end] = value;
    if (start) {
      const startPerioud = dayjs(start).format(dateFormat);
      onUpdate({
        id,
        startPerioud,
        endPerioud,
        startDay,
        dueDay,
      });
    }
    if (end) {
      const endPerioud = dayjs(end).format(dateFormat);
      onUpdate({
        id,
        startPerioud,
        endPerioud,
        startDay,
        dueDay,
      });
    }
  }

  const result  = dayjs(`${startPerioud}`, dateFormat);
  const result2  = dayjs(`${startPerioud}`, dateFormat);

  return (
    <div className="custom-period">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["SingleInputDateRangeField"]}>
          <DateRangePicker
            defaultValue={[result, result2]}
            onChange={(e) => handleDatePikerData(e)}
            format={dateFormat}
            slots={{ field: SingleInputDateRangeField }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <div className="selector-container">
        <Select
          value={startDay}
          label={"Due date"}
          fullWidth
          onChange={(e) =>
            onUpdate({
              id,
              startPerioud,
              endPerioud,
              startDay: e.target.value,
              dueDay,
            })
          }
        >
          {dayNumbers.map((period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
        <span className="selector-container__desciption">
          Start Day of the Next Period
        </span>
      </div>
      <div className="selector-container">
        <Select
          value={dueDay}
          label={"Due date"}
          fullWidth
          onChange={(e) =>
            onUpdate({
              id,
              startPerioud,
              endPerioud,
              startDay,
              dueDay: e.target.value,
            })
          }
        >
          {dayNumbers.map((period: any) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
        <span className="selector-container__desciption">
          Due Day of the Next Period
        </span>
      </div>
    </div>
  );
};

const CustomPeriods: React.FC<any> = ({ data, onUpdate }: any): JSX.Element => {
  function addNewPeriod() {
    onUpdate({
      startPerioud: null,
      endPerioud: null,
      startDay: "1",
      dueDay: "15",
      id: `${generateRandomId()}`,
    });
  }

  return (
    <div className="custom-periods">
      {data.map(({ startPerioud, endPerioud, startDay, dueDay, id }: any) => (
        <CustomPeriod
          key={id}
          id={id}
          startPerioud={startPerioud}
          endPerioud={endPerioud}
          startDay={startDay}
          dueDay={dueDay}
          onUpdate={onUpdate}
        />
      ))}

      <Button
        variant="contained"
        sx={{
          color: "grey",
          width: "125px",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
        onClick={addNewPeriod}
      >
        Add period
      </Button>
    </div>
  );
};

const NotificationPeriods: React.FC<NotificationPeriodsProps> = ({
  selectedPeriod,
  notificationPeriods,
  weeklyPerioud,
  monthlyPerioud,
  quarterlyPerioud,
  customPerioud,
  onPeriodChange,
  onWeeklyPerioud,
  onMonthlyPerioud,
  onQuarterlyPerioud,
  onCustomPerioud,
}): JSX.Element => {
  return (
    <div className="notification-periods">
      <h2 className="notification-periods__title">Reporting period</h2>

      <div className="notification-periods__periods">
        <CustomizedMUISelector
          selectedPeriod={selectedPeriod}
          notificationPeriods={notificationPeriods}
          onPeriodChange={onPeriodChange}
        />
      </div>

      <div className="notification-periods-content">
        {selectedPeriod === "Weekly" && (
          <WeeklyPeriods data={weeklyPerioud} onUpdate={onWeeklyPerioud} />
        )}
        {selectedPeriod === "Monthly" && (
          <MonthlyPeriods data={monthlyPerioud} onUpdate={onMonthlyPerioud} />
        )}
        {selectedPeriod === "Quarterly" && (
          <QuarterlyPeriods
            data={quarterlyPerioud}
            onUpdate={onQuarterlyPerioud}
          />
        )}
        {selectedPeriod === "Custom" && (
          <CustomPeriods data={customPerioud} onUpdate={onCustomPerioud} />
        )}
      </div>
    </div>
  );
};

export default NotificationPeriods;
