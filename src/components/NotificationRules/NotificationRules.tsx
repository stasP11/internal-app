import React from "react";
import "./NotificationRules.scss";

//components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

type Period = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";

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

interface AfterReportingDueDateInterface
  extends FrequencySelectorProps,
    DaySelectorSelectorProps {
  onFrequencyChange: Function;
  onSelectedDaysState: Function;
  period?: any;
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

const DaySelector: React.FC<DaySelectorSelectorProps> = ({
  selectedDaysState,
  onSelectedDaysState,
}): JSX.Element => {
  // const [selectedDaysState, setSelectedDaysState] = React.useState<any>([]);

  const structure = [
    { value: "monday", id: "1", name: "M", editable: true },
    { value: "tuesday", id: "2", name: "T", editable: true },
    { value: "wednesday", id: "3", name: "W", editable: true },
    { value: "thursday", id: "4", name: "T", editable: true },
    { value: "friday", id: "5", name: "F", editable: true },
    { value: "saturday", id: "6", name: "S", editable: false },
    { value: "sunday", id: "7", name: "S", editable: false },
  ];

  function isSelected(id: string) {
    return selectedDaysState.some((dayObj: any) => dayObj.id === id);
  }

  function handleClick(selectedDayObj: any) {
    const isSelected = selectedDaysState.some(
      (dayObj: any) => dayObj.id === selectedDayObj.id
    );
    if (isSelected) {
      onSelectedDaysState((prevState: any) =>
        prevState.filter((dayObj: any) => dayObj.id !== selectedDayObj.id)
      );
    } else {
      if (selectedDayObj?.editable) {
        onSelectedDaysState((prevState: any) => [...prevState, selectedDayObj]);
      }
    }
  }

  return (
    <div className="day-selector">
      {structure.map(({ value, id, name, editable }) => (
        <div
          className={`day-selector__day ${
            isSelected(id) ? "--selected-day" : ""
          }`}
          onClick={() => handleClick({ value, id, name, editable })}
          key={id}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

const AfterReportingDueDate: React.FC<AfterReportingDueDateInterface> = ({
  selectedFrequency,
  onFrequencyChange,
  selectedDaysState,
  onSelectedDaysState,
}): JSX.Element => {
  return (
    <div className="after-due-date">
      <h3 className="after-due-date__title">After reporting Due Date</h3>

      <div className="after-due-date__selector selector-container">
        <CustomizedMUISelector
          selectedOption={selectedFrequency}
          options={["Daily", "Weekly"]}
          onChange={onFrequencyChange}
          label={"Frequency"}
        />
      </div>

      <div className="after-due-date__day-of-week-selector">
        <DaySelector
          selectedDaysState={selectedDaysState}
          onSelectedDaysState={onSelectedDaysState}
        />
      </div>
    </div>
  );
};

const BeforeReportingDueDate: React.FC<any> = (): JSX.Element => {
  return (
    <div className="before-due-date">
      <h3 className="before-due-date__title">After reporting Due Date</h3>

      <div className="before-due-date__checkboxes">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="On Due Date"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="1 day before"
          />
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
      >
        Add rule
      </Button>
    </div>
  );
};

const BeforeReportingStartDate: React.FC<any> = (): JSX.Element => {
  return (
    <div className="before-start-date">
      <h3 className="before-start-date__title">After reporting Due Date</h3>

      <div className="before-start-date__checkboxes">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="On Start Date"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="1 day before"
          />
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
      >
        Add rule
      </Button>
    </div>
  );
};

const NotificationRules: React.FC<AfterReportingDueDateInterface> = ({
  period,
  selectedFrequency,
  onFrequencyChange,
  selectedDaysState,
  onSelectedDaysState,
}): JSX.Element => {
  return (
    <div className="notification-rules">
      <h2 className="notification-rules__title">Notification Rules</h2>

      <div className="content">
        {period === "Daily" ? (
          <AfterReportingDueDate
            selectedFrequency={selectedFrequency}
            onFrequencyChange={onFrequencyChange}
            selectedDaysState={selectedDaysState}
            onSelectedDaysState={onSelectedDaysState}
          />
        ) : null}

        {period === "Weekly" ? (
          <>
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
              selectedDaysState={selectedDaysState}
              onSelectedDaysState={onSelectedDaysState}
            />
          </>
        ) : null}

        {period === "Monthly" ? (
          <>
            <BeforeReportingStartDate />
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
              selectedDaysState={selectedDaysState}
              onSelectedDaysState={onSelectedDaysState}
            />
          </>
        ) : null}

        {period === "Quarterly" ? (
          <>
            <BeforeReportingStartDate />
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
              selectedDaysState={selectedDaysState}
              onSelectedDaysState={onSelectedDaysState}
            />
          </>
        ) : null}

        {period === "Custom" ? (
          <>
            <BeforeReportingStartDate />
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
              selectedDaysState={selectedDaysState}
              onSelectedDaysState={onSelectedDaysState}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationRules;
