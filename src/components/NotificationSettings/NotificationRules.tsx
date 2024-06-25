import React, { useState } from "react";
import "./NotificationRules.scss";

//components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, TextField } from "@mui/material";

//utils
import generateRandomId from "../../utils/genereteRandomId.js"

const DynamicDaysCheckbox = ({
  selected,
  value,
  id,
  onNewElementChecked,
}: any) => {
  const [daysBefore, setDaysBefore] = useState(0);

  const handleDaysChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
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
        label={`${daysBefore} day${daysBefore > 1 ? "s" : ""} before`}
      />
      <TextField
        type="number"
        value={daysBefore}
        onChange={handleDaysChange}
        inputProps={{ min: 1 }}
        style={{ marginRight: "8px", width: "60px" }}
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

interface FrequencySelectorProps {
  selectedFrequency: FrequencyType;
  frequencyOptions?: Array<FrequencyType>;
  label?: "string";
  onChange?: Function;
}

interface DaySelectorSelectorProps {
  selectedDaysState: Array<WeekDayType>;
  onSelectedDaysState: Function;
}

const CustomizedMUISelector: React.FC<any> = ({
  selectedOption,
  options,
  label,
  onChange,
}): JSX.Element => {
  console.log(selectedOption, "selectedOption");
  return (
    <div>
      <Select
        value={selectedOption}
        label={label}
        fullWidth
        onChange={onChange}
      >
        {options.map((period: any) => (
          <MenuItem key={period} value={period}>
            {period}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
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
      <h3 className="after-due-date__title">After reporting Due Date</h3>

      <div className="after-due-date__selector selector-container">
        <CustomizedMUISelector
          selectedOption={frequency}
          options={["Daily", "Weekly"]}
          onChange={(e: any) => handleFrequency(e.target.value)}
          label={"Frequency"}
        />
      </div>

      <div className="after-due-date__day-of-week-selector">
        <DaySelector
          selectedDays={selectedDailyFrequency}
          onUpdate={onFrequencyChange}
        />
      </div>
    </div>
  );
};

const BeforeReportingDueDate: React.FC<any> = ({
  data,
  onUpdate,
}): JSX.Element => {
  //[{label: 'on start Date', selected: false, value: 0, isEditable: false}, {label: '1 day before', selected: true, value: 1, isEditable: false}]

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
          label: "bla bla bla",
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
      <h3 className="before-due-date__title">Before reporting Due Day</h3>
      <div className="before-due-date__checkboxes">
        <FormGroup>
          {data.map(({ label, selected, value, id, isEditable }: any) =>
            isEditable ? (
              <DynamicDaysCheckbox
                key={id}
                id={id}
                value={value}
                selected={selected}
                onNewElementChecked={handleDaysCheckboxEdit}
              />
            ) : (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    defaultChecked={selected}
                    onChange={(e) => handleSelect(id, e.target.checked)}
                  />
                }
                label={label}
              />
            )
          )}
        </FormGroup>
      </div>

      <Button
        variant="contained"
        sx={{
          color: "grey",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
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
    const id = generateRandomId();
    onUpdate({
      beforeReportingStartDate: [
        ...data,
        {
          id,
          label: "bla bla bla",
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
      <h3 className="before-start-date__title">Before reporting Start Day</h3>
      <div className="before-due-date__checkboxes">
        <FormGroup>
          {data.map(({ label, selected, value, id, isEditable }: any) =>
            isEditable ? (
              <DynamicDaysCheckbox
                key={id}
                id={id}
                value={value}
                selected={selected}
                onNewElementChecked={handleDaysCheckboxEdit}
              />
            ) : (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    defaultChecked={selected}
                    onChange={(e) => handleSelect(id, e.target.checked)}
                  />
                }
                label={label}
              />
            )
          )}
        </FormGroup>
      </div>

      <Button
        variant="contained"
        sx={{
          color: "grey",
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
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
  console.log(
    monthlyNotifications,
    "monthlyNotifications"
  );

  return (
    <div className="notification-rules">
      <h2 className="notification-rules__title">Notification Rules</h2>

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

        {selectedPeriod === "Quarterly" &&  quarterlyNotifications &&  (
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
