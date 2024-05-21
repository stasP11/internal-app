import "./Notifications.scss";
import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Switch,
  IconButton,
} from "@mui/material";
import CircleInfo from "../../icons/circle-info/CircleInfo.svg";
import Plus from "../../icons/notifications/Plus.svg";
import { TextField, Button } from "@mui/material";
import { Input } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AddNew({ text, onUserClick }: any) {
  return (
    <div onClick={onUserClick} className="add-new">
      <img src={Plus}></img>
      <span>{text}</span>
    </div>
  );
}

function CheckboxGroup({ checkboxOptions }: any) {
  const [selectedValues, setSelectedValues] = useState<any>([]); // State to store selected checkbox values

  const handleCheckboxChange = (event: any) => {
    const value = event.target.value;
    setSelectedValues((prevSelectedValues: any) => {
      if (prevSelectedValues.includes(value)) {
        // Remove if already selected
        return prevSelectedValues.filter((item: any) => item !== value);
      } else {
        // Add if not selected
        return [...prevSelectedValues, value];
      }
    });
  };
  return (
    <FormGroup>
      {checkboxOptions.map((option: any) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={selectedValues.includes(option.value)}
              onChange={handleCheckboxChange}
              value={option.value}
            />
          }
          label={option.label}
        />
      ))}
    </FormGroup>
  );
}

function DefaultSettings({ isChecked, onChange }: any) {
  return (
    <div className="default-settings">
      <FormControlLabel
        control={
          <Switch checked={isChecked} onChange={onChange} name="jason" />
        }
        label="Default Settings"
      />
      <img src={CircleInfo} alt="info-icon" />
    </div>
  );
}

function ReportPeriod({ selectedValue, onChange }: any) {
  return (
    <div className="report-period-list">
      <h2>Set reporting period</h2>
      <FormControl component="fieldset" sx={{marginLeft: '-50px'}}>
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={selectedValue}
          onChange={onChange}
        >
          <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
          <FormControlLabel
            value="Monthly"
            control={<Radio />}
            label="Monthly"
          />
          <FormControlLabel
            value="Quarterly"
            control={<Radio />}
            label="Quarterly"
          />
          <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

function MonthlyReportingPeriod() {
  return (
    <>
      <div className="period-details start-period">
        <h2>Choose reporting start date</h2>
        <div className="period-details__time">
          <FormControlLabel
            value="Day of month"
            control={<Radio />}
            label="Day of month"
          />

          <div className="manual-selection">
            <Input
              type="number"
              className="input-number"
              sx={{ width: "68px" }}
            />
            <span>day of month</span>
          </div>
        </div>

        <div className="period-details__time datepiker-section">
          <FormControlLabel value="Date" control={<Radio />} label="Date" />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Choose date"
              slotProps={{
                inputAdornment: {
                  position: "start",
                },
                textField: { size: "small" },
              }}
              sx={{ width: "167px" }}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={<Checkbox />}
            label={"Repeat monthly"}
          ></FormControlLabel>
        </div>
      </div>
      <div className="period-details start-period">
        <h2>Choose reporting start date</h2>
        <div className="period-details__time">
          <FormControlLabel
            value="Day of month"
            control={<Radio />}
            label="Day of month"
          />

          <div className="manual-selection">
            <Input
              type="number"
              className="input-number"
              sx={{ width: "68px" }}
            />
            <span>day of month</span>
          </div>
        </div>

        <div className="period-details__time datepiker-section">
          <FormControlLabel value="Date" control={<Radio />} label="Date" />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Choose date"
              slotProps={{
                inputAdornment: {
                  position: "start",
                },
                textField: { size: "small" },
              }}
              sx={{ width: "167px" }}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={<Checkbox />}
            label={"Repeat monthly"}
          ></FormControlLabel>
        </div>
      </div>
    </>
  );
}

function CustomReportingPeriod() {
  return (
    <div className="custom-report-period">
      <h2>Choose the reporting period</h2>
      <div className="custom-report-period__periods">
        <span>Reporting Period 1</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Choose date"
            slotProps={{
              inputAdornment: {
                position: "start",
              },
              textField: { size: "small" },
            }}
            sx={{ width: "167px" }}
          />
        </LocalizationProvider>
      </div>
      <AddNew text={"Add reporting period"} />
    </div>
  );
}

function SetNotificationRules() {
  return (
    <>
      <h2>Set notification rules</h2>
      <div className="notifications-details">
        <h3>Before reporting start date</h3>
        <CheckboxGroup
          checkboxOptions={[
            { value: "On start date", label: "On start date" },
            { value: "1 day before", label: "1 day before" },
          ]}
        />
        <AddNew text={"Add more"} onUserClick={() => console.log("")} />
      </div>

      <div className="notifications-details">
        <h3>Before reporting due date</h3>
        <CheckboxGroup
          checkboxOptions={[
            { value: "On due date", label: "On due date" },
            { value: "1 day before", label: "1 day before" },
          ]}
        />

        <AddNew text={"Add more"} onUserClick={() => console.log("")} />
      </div>

      <div className="notifications-details">
        <h3>After reporting due date</h3>
        <RadioGroup aria-label="gender" name="controlled-radio-buttons-group">
          <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
          <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
          <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
        </RadioGroup>
      </div>
    </>
  );
}

function SetDailyNotificationRules() {
  return (
    <>
      <div className="notifications-details">
        <h3>After reporting due date</h3>
        <RadioGroup aria-label="gender" name="controlled-radio-buttons-group">
          <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
          <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
        </RadioGroup>
      </div>
    </>
  );
}

function Notifications() {
  const [selectedValue, setSelectedValue] = useState(""); // State to store the selected radio button value

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <section>
        <div className="report-period">
          <ReportPeriod selectedValue={selectedValue} onChange={handleChange} />
          <DefaultSettings />
        </div>
        {(selectedValue === "Monthly" && <MonthlyReportingPeriod />) ||
          (selectedValue === "Quarterly" && <MonthlyReportingPeriod />) ||
          (selectedValue === "Custom" && <CustomReportingPeriod />)}
      </section>

      <section className="notifications">
        {(selectedValue === "Daily" && (
          <>
            <div className="notifications-separator" />
            <SetDailyNotificationRules />
          </>
        )) ||
          (selectedValue === "Monthly" && (
            <>
              <div className="notifications-separator" />
              <SetNotificationRules />
            </>
          )) ||
          (selectedValue === "Quarterly" && (
            <>
              <div className="notifications-separator" />
              <SetNotificationRules />
            </>
          )) ||
          (selectedValue === "Custom" && (
            <>
              <div className="notifications-separator" />
              <SetNotificationRules />
            </>
          ))}
      </section>

      <section className="buttons">
        {!!selectedValue && (
          <>
            <Button variant="contained" sx={{ width: "90px" }}>
              Save
            </Button>
            <Button variant="outlined" sx={{ width: "90px" }}>
              Cancel
            </Button>
          </>
        )}
      </section>
    </>
  );
}

export default Notifications;
