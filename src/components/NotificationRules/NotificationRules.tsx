import React, {useState} from "react";
import "./NotificationRules.scss";

//components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, TextField } from '@mui/material';

// {label: 'on due Date', selected: false, value: 0, id: '02092'}

//utils
function generateRandomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

const DynamicDaysCheckbox = ({selected, value, id, onNewElementChecked}: any) => {
  const [daysBefore, setDaysBefore] = useState(0);


  const handleDaysChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setDaysBefore(value);
      onNewElementChecked(id, value, selected);
    }
  };

  function handleSelect(isSelected: boolean){
    onNewElementChecked(id, value, isSelected);
  }

  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={<Checkbox  defaultChecked={selected}
          onChange={(e) => handleSelect(e.target.checked)}
          
          />}
        label={`${daysBefore} day${daysBefore > 1 ? 's' : ''} before`}
      />
        <TextField
        type="number"
        value={daysBefore}
        onChange={handleDaysChange}
        inputProps={{ min: 1 }}
        style={{ marginRight: '8px', width: '60px' }}
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
    { value: "monday", id: 1, name: "M", editable: true },
    { value: "tuesday", id: 2, name: "T", editable: true },
    { value: "wednesday", id: 3, name: "W", editable: true },
    { value: "thursday", id: 4, name: "T", editable: true },
    { value: "friday", id: 5, name: "F", editable: true },
    { value: "saturday", id: 6, name: "S", editable: false },
    { value: "sunday", id: 7, name: "S", editable: false },
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
    } else if (id !== 6 && id !== 7) {
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
      onFrequencyChange({ afterReportingDueDate: [1, 2, 3, 4, 5] });
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

  function handleSelect(id: any, isSelected: any){
    const updatedData = data;
    
    updatedData.forEach((obj: any)=>{
         if(obj.id=== id){
          obj.selected = isSelected
         }
    });

    onUpdate({beforeReportingDueDate: updatedData})


  }

  function handleAddNewDaysCheckbox(){
    const id = generateRandomId();
    onUpdate({beforeReportingDueDate:[...data, {
      id,
      label: 'bla bla bla',
      selected: false,
      value: 0,
      isEditable: true,
    } ]})
  }

  function handleDaysCheckboxEdit(id: any, value: number, selected: boolean){
    const updatedData= [...data];
      updatedData.forEach((obj)=>{
        if(obj.id === id) {
          obj.value = value;
          obj.selected = selected
        }
      })
      onUpdate({beforeReportingDueDate: [...data]})
  }

  return (
    <div className="before-due-date">
      <h3 className="before-due-date__title">Before reporting Start Date</h3>
      <div className="before-due-date__checkboxes">
        <FormGroup>
          {data.map(({ label, selected, value, id, isEditable }: any) => (
            isEditable? 
              <DynamicDaysCheckbox key={id} id={id} value={value} selected={selected} onNewElementChecked={handleDaysCheckboxEdit}/>: (
              <FormControlLabel
              key={id}
              control={
                <Checkbox
                  defaultChecked={selected}
                  onChange={(e) => handleSelect(id, e.target.checked)
                  }
                />
              }
              label={label}
            />)
          ))}
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

const NotificationRules: React.FC<any> = ({
  selectedPeriod,
  dailyNotifications,
  selectedFrequency,
  weeklyNotifications,

  onDailyNotificationsUpdate,
  onWeeklyNotificationsUpdate,

  onFrequencyChange,
  selectedDaysState,
  onSelectedDaysState,
}): JSX.Element => {
  console.log(
    dailyNotifications,
    dailyNotifications?.afterReportingDueDate,
    "dailyNotifications"
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

        {selectedPeriod === "Monthly" && (
          <>
            <BeforeReportingStartDate />
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedDailyFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
            />
          </>
        )}

        {selectedPeriod === "Quarterly" && (
          <>
            <BeforeReportingStartDate />
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedDailyFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
            />
          </>
        )}

        {selectedPeriod === "Custom" && (
          <>
            <BeforeReportingStartDate />
            <BeforeReportingDueDate />
            <AfterReportingDueDate
              selectedDailyFrequency={selectedFrequency}
              onFrequencyChange={onFrequencyChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationRules;
