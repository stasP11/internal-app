import React, { useState } from "react";
import "./NotificationRules.scss";

//components
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import CustomizedMUISelector from "../../customized-mui-elements/CustomizedMUISelector/CustomizedMUISelector";

//utils
import generateRandomId from "../../utils/genereteRandomId.js";
import textData from "text-constants/text-constants";

const DynamicDaysCheckbox = ({
  selected,
  value,
  id,
  onNewElementChecked,
  label,
}: any) => {
  const [daysBefore, setDaysBefore] = useState(value);
  const [isChecked, setIsChecked] = useState(false);
  const [numberValue, setNumberValue] = useState(1);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const handleNumberChange = (event: any) => {
    setNumberValue(event.target.value);
  };

  const handleDaysChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > -1) {
      setDaysBefore(value);
      onNewElementChecked(id, value, selected);
    }
  };

  function handleSelect(isSelected: boolean) {
    onNewElementChecked(id, value, isSelected);
  }

  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={selected}
            onChange={(e) => handleSelect(e.target.checked)}
          />
        }
        label={``}
      />
      <input
        className="number-input"
        type="number"
        value={daysBefore}
        onChange={handleDaysChange}
      ></input>
      <span>
        {daysBefore === 0
          ? `${label}`
          : ` day${daysBefore > 1 ? "s" : ""} before`}
      </span>
    </Box>
  );
};

const CustomizedMUIDaysCheckbox = ({
  onChange,
  isChecked,
  id,
  value,
  label,
}: any) => {
  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={<Checkbox defaultChecked={isChecked} onChange={onChange} />}
        label={
          value === 0
            ? `${label}`
            : value > 1
            ? `${value} days`
            : `${value} day`
        }
      />
    </Box>
  );
};

type FrequencyType = "Daily" | "Weekly";

type WeekDayType = {
  value:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  id: string;
  name: string;
  editable: boolean;
};

const DaySelector: React.FC<any> = ({
  selectedDays,
  onUpdate,
}): JSX.Element => {
  const structure = [
    { value: "monday", id: 0, name: "M", editable: true },
    { value: "tuesday", id: 1, name: "T", editable: true },
    { value: "wednesday", id: 2, name: "W", editable: true },
    { value: "thursday", id: 3, name: "T", editable: true },
    { value: "friday", id: 4, name: "F", editable: true },
    { value: "saturday", id: 5, name: "S", editable: false },
    { value: "sunday", id: 6, name: "S", editable: false },
  ];

  function isSelected(id: number) {
    return selectedDays.includes(id);
  }

  function handleClick(id: number) {
    if (selectedDays.includes(id)) {
      const newState = selectedDays.filter(
        (dayNumber: number) => dayNumber !== id
      );
      onUpdate({ afterReportingDueDate: newState });
    } else if (id !== 5 && id !== 6) {
      onUpdate({ afterReportingDueDate: [...selectedDays, id] });
    }
  }

  return (
    <div className="day-selector">
      {structure.map(({ value, id, name, editable }) => (
        <div
          className={`day-selector__day ${
            isSelected(id) ? "--selected-day" : ""
          }`}
          onClick={() => handleClick(id)}
          key={id}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

const AfterReportingDueDate: React.FC<any> = ({
  selectedDailyFrequency,
  onFrequencyChange,
}): JSX.Element => {
  const [frequency, setFrequency] = React.useState<any>("Daily");

  function handleFrequency(option: string) {
    if (option === "Weekly") {
      setFrequency("Weekly");
      onFrequencyChange({ afterReportingDueDate: [0, 1, 2, 3, 4] });
    } else {
      setFrequency("Daily");
    }
  }

  return (
    <div className="after-due-date">
      <h3 className="after-due-date__title">
        {textData.Notifications.Title.AfterReportingDueDay}
      </h3>
      <div className="after-due-date__day-of-week-selector">
        <DaySelector
          selectedDays={selectedDailyFrequency}
          onUpdate={onFrequencyChange}
        />
      </div>
      <div className="after-due-date__selector selector-container">
        <CustomizedMUISelector
          value={frequency}
          data={["Daily", "Weekly"]}
          onUpdate={(e: any) => handleFrequency(e.target.value)}
          label={"Frequency"}
        />
      </div>
    </div>
  );
};

const BeforeReportingDueDate: React.FC<any> = ({
  data,
  onUpdate,
  label = "On Due Day",
}): JSX.Element => {
  function handleSelect(id: any, isSelected: any) {
    const updatedData = data;

    updatedData.forEach((obj: any) => {
      if (obj.id === id) {
        obj.selected = isSelected;
      }
    });

    onUpdate({ beforeReportingDueDate: updatedData });
  }

  function handleAddNewDaysCheckbox() {
    const id = generateRandomId();
    onUpdate({
      beforeReportingDueDate: [
        ...data,
        {
          id,
          label: label,
          selected: false,
          value: 0,
          isEditable: true,
        },
      ],
    });
  }

  function handleDaysCheckboxEdit(id: any, value: number, selected: boolean) {
    const updatedData = [...data];
    updatedData.forEach((obj) => {
      if (obj.id === id) {
        obj.value = value;
        obj.selected = selected;
      }
    });
    onUpdate({ beforeReportingDueDate: [...data] });
  }

  return (
    <div className="before-due-date">
      <h3 className="before-due-date__title">
        {textData.Notifications.Title.BeforeReportingDueDay}
      </h3>
      <div className="before-due-date__checkboxes">
        <FormGroup>
          {data.map(({ selected, value, id, isEditable }: any) =>
            isEditable ? (
              <DynamicDaysCheckbox
                key={id}
                id={id}
                value={value}
                selected={selected}
                onNewElementChecked={handleDaysCheckboxEdit}
                label={label}
              />
            ) : (
              <CustomizedMUIDaysCheckbox
                key={id}
                id={id}
                isChecked={selected}
                value={value}
                label={label}
                onChange={(e: any) => handleSelect(id, e.target.checked)}
              />
            )
          )}
        </FormGroup>
      </div>

      <Button
        variant="outlined"
        sx={{
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          backgroundColor: "#EEEEEE",
          border: "none",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            border: "none",
          },
        }}
        onClick={handleAddNewDaysCheckbox}
      >
        Add rule
      </Button>
    </div>
  );
};

const BeforeReportingStartDate: React.FC<any> = ({
  data,
  onUpdate,
  label = "On Start Day",
}): JSX.Element => {
  function handleSelect(id: any, isSelected: any) {
    const updatedData = data;

    updatedData.forEach((obj: any) => {
      if (obj.id === id) {
        obj.selected = isSelected;
      }
    });

    onUpdate({ beforeReportingStartDate: updatedData });
  }

  function handleAddNewDaysCheckbox() {
    onUpdate({
      beforeReportingStartDate: [
        ...data,
        {
          id: generateRandomId(),
          label: label,
          selected: false,
          value: 0,
          isEditable: true,
        },
      ],
    });
  }

  function handleDaysCheckboxEdit(id: any, value: number, selected: boolean) {
    const updatedData = [...data];
    updatedData.forEach((obj) => {
      if (obj.id === id) {
        obj.value = value;
        obj.selected = selected;
      }
    });
    onUpdate({ beforeReportingStartDate: [...data] });
  }

  return (
    <div className="before-start-date">
      <h3 className="before-start-date__title">
        {textData.Notifications.Title.BeforeReportingStartDay}
      </h3>
      <div className="before-due-date__checkboxes">
        <FormGroup>
          {data.map(({ selected, value, id, isEditable }: any) =>
            isEditable ? (
              <DynamicDaysCheckbox
                key={id}
                id={id}
                value={value}
                selected={selected}
                onNewElementChecked={handleDaysCheckboxEdit}
                label={label}
              />
            ) : (
              <CustomizedMUIDaysCheckbox
                key={id}
                id={id}
                isChecked={selected}
                value={value}
                label={label}
                onChange={(e: any) => handleSelect(id, e.target.checked)}
              />
            )
          )}
        </FormGroup>
      </div>

      <Button
        variant="outlined"
        sx={{
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          backgroundColor: "#EEEEEE",
          border: "none",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            border: "none",
          },
        }}
        onClick={handleAddNewDaysCheckbox}
      >
        Add rule
      </Button>
    </div>
  );
};

const NotificationRules: React.FC<any> = ({
  selectedPeriod,
  dailyNotifications,
  weeklyNotifications,
  monthlyNotifications,
  quarterlyNotifications,
  customNotifications,

  onDailyNotificationsUpdate,
  onWeeklyNotificationsUpdate,
  onMonthlyNotifications,
  onQuarterlyNotifications,
  onCustomNotifications,
}): JSX.Element => {
  return (
    <div className="notification-rules">
      <h2 className="notification-rules__title">
        {textData.Notifications.Title.NotificationRules}
      </h2>

      <div className="content">
        {selectedPeriod === "Daily" && dailyNotifications && (
          <AfterReportingDueDate
            selectedDailyFrequency={dailyNotifications?.afterReportingDueDate}
            onFrequencyChange={onDailyNotificationsUpdate}
          />
        )}

        {selectedPeriod === "Weekly" && weeklyNotifications && (
          <>
            <BeforeReportingDueDate
              data={weeklyNotifications?.beforeReportingDueDate}
              onUpdate={onWeeklyNotificationsUpdate}
            />
            <AfterReportingDueDate
              selectedDailyFrequency={
                weeklyNotifications?.afterReportingDueDate
              }
              onFrequencyChange={onWeeklyNotificationsUpdate}
            />
          </>
        )}

        {selectedPeriod === "Monthly" && monthlyNotifications && (
          <>
            <BeforeReportingStartDate
              data={monthlyNotifications?.beforeReportingStartDate}
              onUpdate={onMonthlyNotifications}
            />
            <BeforeReportingDueDate
              data={monthlyNotifications?.beforeReportingDueDate}
              onUpdate={onMonthlyNotifications}
            />
            <AfterReportingDueDate
              selectedDailyFrequency={
                monthlyNotifications?.afterReportingDueDate
              }
              onFrequencyChange={onMonthlyNotifications}
            />
          </>
        )}

        {selectedPeriod === "Quarterly" && quarterlyNotifications && (
          <>
            <BeforeReportingStartDate
              data={quarterlyNotifications?.beforeReportingStartDate}
              onUpdate={onQuarterlyNotifications}
            />
            <BeforeReportingDueDate
              data={quarterlyNotifications?.beforeReportingDueDate}
              onUpdate={onQuarterlyNotifications}
            />
            <AfterReportingDueDate
              selectedDailyFrequency={
                quarterlyNotifications?.afterReportingDueDate
              }
              onFrequencyChange={onQuarterlyNotifications}
            />
          </>
        )}

        {selectedPeriod === "Custom" && customNotifications && (
          <>
            <BeforeReportingStartDate
              data={customNotifications?.beforeReportingStartDate}
              onUpdate={onCustomNotifications}
            />
            <BeforeReportingDueDate
              data={customNotifications?.beforeReportingDueDate}
              onUpdate={onCustomNotifications}
            />
            <AfterReportingDueDate
              selectedDailyFrequency={
                customNotifications?.afterReportingDueDate
              }
              onFrequencyChange={onCustomNotifications}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationRules;
