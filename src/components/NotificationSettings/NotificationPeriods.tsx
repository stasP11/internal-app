import "./NotificationPeriods.scss";
import React from "react";
import dayjs from "dayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { Button } from "@mui/material";
import CustomizedMUISelector from "../../customized-mui-elements/CustomizedMUISelector/CustomizedMUISelector";
import generateRandomId from "../../utils/genereteRandomId.js";
import { dateFormat, dayNumbers } from "../../constants/notificationConstants";
import {
  Period,
  NotificationPeriodsProps,
} from "../../types/notificationsTypes";
import { DateValidationError } from "@mui/x-date-pickers/models";
import RemoveIcon from "../../icons/bucket-icon-light/bucketIconLight.svg";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import textData from "text-constants/text-constants";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const WeeklyPeriods: React.FC<any> = ({ data, onUpdate }: any): JSX.Element => {
  return (
    <div className="weekly-container">
      <div className="selector-container">
        <TextField
          variant="outlined"
          value={1 + Number(data?.startDay)}
          label={textData.Notifications.Inputs.StartDay}
          fullWidth
          disabled
        />

        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
      <div className="selector-container">
        <CustomizedMUISelector
          label={textData.Notifications.Inputs.DueDay}
          value={Number(data?.dueDay) + 1}
          data={[1, 2, 3, 4, 5]}
          onUpdate={(e: any) =>
            onUpdate({ dueDay: Number(e.target.value) - 1 })
          }
          isDisabled={false}
        />
        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
    </div>
  );
};

const MonthlyPeriods: React.FC<any> = ({
  data,
  onUpdate,
}: any): JSX.Element => {
  return (
    <div className="monthly-periods">
      <div className="selector-container">
        <TextField
          variant="outlined"
          value={data?.startDay}
          label={textData.Notifications.Inputs.StartDay}
          fullWidth
          disabled
        />
        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
      <div className="selector-container">
        <CustomizedMUISelector
          label={textData.Notifications.Inputs.DueDay}
          value={data?.dueDay}
          data={dayNumbers}
          onUpdate={(e: any) => onUpdate({ dueDay: e.target.value })}
          isDisabled={false}
        />
        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
    </div>
  );
};

const QuarterlyPeriods: React.FC<any> = ({
  data,
  onUpdate,
}: any): JSX.Element => {
  return (
    <div className="monthly-periods">
      <div className="selector-container">
        <TextField
          variant="outlined"
          value={data?.startDay}
          label={textData.Notifications.Inputs.StartDay}
          fullWidth
          disabled
        />

        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
      <div className="selector-container">
        <CustomizedMUISelector
          label={textData.Notifications.Inputs.DueDay}
          data={dayNumbers}
          value={data?.dueDay}
          onUpdate={(e: any) => onUpdate({ dueDay: e.target.value })}
          isDisabled={false}
        />
        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
    </div>
  );
};

const CustomPeriod: React.FC<any> = ({
  id,
  startPeriod,
  endPeriod,
  startDay,
  dueDay,
  onUpdate,
  prevEndPeriod,
  index,
}: any): JSX.Element => {
  const [error, setError] = React.useState<DateValidationError | any>(null);
  const dateFormatForBackEnd = "YYYY-MM-DD";
  const dateFormatForFrontEnd = "DD/MM/YYYY";

  const errorMessage = React.useMemo(() => {
    const errorCase = error ? error[0] : null;
    if (errorCase === "minDate") {
      return "Please select a date that does not overlap with the previous value";
    }
    switch (errorCase) {
      case "maxDate":
      case "minDate": {
        return "Please select a date that does not overlap with the previous value";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  function handleDatePikerData(value: any) {
    const [start, end] = value;
    if (start) {
      const startPeriod = dayjs(start, dateFormatForFrontEnd).format(
        dateFormatForBackEnd
      );
      onUpdate({
        id,
        startPeriod,
        endPeriod,
        startDay,
        dueDay,
      });
    }
    if (end) {
      const startPeriod = dayjs(start, dateFormatForFrontEnd).format(
        dateFormatForBackEnd
      );
      const endPeriod = dayjs(end, dateFormatForFrontEnd).format(
        dateFormatForBackEnd
      );
      onUpdate({
        id,
        startPeriod,
        endPeriod,
        startDay,
        dueDay,
      });
    }
  }

  const result = dayjs(startPeriod, dateFormatForBackEnd).format(
    dateFormatForFrontEnd
  );
  const result2 = dayjs(endPeriod, dateFormatForBackEnd).format(
    dateFormatForFrontEnd
  );
  const handledPrevEndPeriod = prevEndPeriod
    ? dayjs(
        dayjs(`${prevEndPeriod}`, dateFormatForBackEnd).format(
          dateFormatForFrontEnd
        ),
        dateFormatForFrontEnd
      )
    : undefined;
  const isDisabled = prevEndPeriod || index === 0 ? false : true;

  return (
    <div className="custom-period">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["SingleInputDateRangeField"]}>
          <DateRangePicker
            sx={{ maxWidth: "300px" }}
            defaultValue={[
              dayjs(result, dateFormatForFrontEnd),
              dayjs(result2, dateFormatForFrontEnd),
            ]}
            onChange={(e) => handleDatePikerData(e)}
            format={dateFormatForFrontEnd}
            slots={{ field: SingleInputDateRangeField }}
            minDate={handledPrevEndPeriod}
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
            disabled={isDisabled}
          />
        </DemoContainer>
      </LocalizationProvider>

      <div className="selector-container">
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            value={startDay}
            label={textData.Notifications.Inputs.StartDay}
            fullWidth
            disabled
            onChange={(e) =>
              onUpdate({
                id,
                startPeriod,
                endPeriod,
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
          </TextField>
        </FormControl>
        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
      <div className="selector-container">
        <FormControl fullWidth>
          <InputLabel>{"Due Day"}</InputLabel>
          <Select
            sx={{ textAlign: "start" }}
            value={dueDay}
            label={textData.Notifications.Inputs.DueDay}
            fullWidth
            onChange={(e) =>
              onUpdate({
                id,
                startPeriod,
                endPeriod,
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
        </FormControl>
        <span className="selector-container__desciption">
          {textData.Notifications.Inputs.NextPeriod}
        </span>
      </div>
      <div className="remove-button">
        <IconButton
          aria-label="delete"
          onClick={() => onUpdate({ id, isRemoved: true })}
        >
          <img src={RemoveIcon} />
        </IconButton>
      </div>
    </div>
  );
};

const CustomPeriods: React.FC<any> = ({
  data,
  onUpdate,
  onRemove,
}: any): JSX.Element => {
  function addNewPeriod() {
    onUpdate({
      startPeriod: null,
      endPeriod: null,
      startDay: "1",
      dueDay: "15",
      id: `${generateRandomId()}`,
    });
  }

  return (
    <div className="custom-periods">
      {data &&
        data.map((value: any, index: number) => (
          <CustomPeriod
            key={value?.id}
            id={value?.id}
            startPeriod={value?.startPeriod}
            endPeriod={value?.endPeriod}
            startDay={value?.startDay}
            dueDay={value?.dueDay}
            prevEndPeriod={data[index - 1]?.endPeriod}
            onUpdate={onUpdate}
            onRemove={onRemove}
            index={index}
          />
        ))}

      <Button
        variant="outlined"
        sx={{
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          width: "125px",
          backgroundColor: "#EEEEEE",
          border: "none",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            border: "none",
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
  weeklyPeriod,
  monthlyPeriod,
  quarterlyPeriod,
  customPeriod,
  onPeriodChange,
  onWeeklyPeriod,
  onMonthlyPeriod,
  onQuarterlyPeriod,
  onCustomPeriod,
}): JSX.Element => {
  return (
    <div className="notification-periods">
      <h2 className="notification-periods__title">
        {textData.Notifications.Title.ReportingPeriod}
      </h2>

      <div className="notification-periods__periods">
        <CustomizedMUISelector
          data={notificationPeriods}
          value={selectedPeriod}
          onUpdate={onPeriodChange}
          label={"Period type"}
        />
      </div>

      <div className="notification-periods-content">
        {selectedPeriod === "Weekly" && weeklyPeriod && (
          <WeeklyPeriods data={weeklyPeriod} onUpdate={onWeeklyPeriod} />
        )}
        {selectedPeriod === "Monthly" && monthlyPeriod && (
          <MonthlyPeriods data={monthlyPeriod} onUpdate={onMonthlyPeriod} />
        )}
        {selectedPeriod === "Quarterly" && quarterlyPeriod && (
          <QuarterlyPeriods
            data={quarterlyPeriod}
            onUpdate={onQuarterlyPeriod}
          />
        )}
        {selectedPeriod === "Custom" && customPeriod && (
          <CustomPeriods data={customPeriod} onUpdate={onCustomPeriod} />
        )}
      </div>
    </div>
  );
};

export default NotificationPeriods;
