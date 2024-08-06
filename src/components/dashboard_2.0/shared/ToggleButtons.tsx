import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ReportType } from "../ReportingPerformance/types";
type ToggleButtonsProps = {
  reportType: ReportType;
  setReportType: React.Dispatch<React.SetStateAction<ReportType>>;
};

const toggleBtnStyles = {
  fontSize: 12,
  fontFamily: "Helvetica Neue",
  fontWeight: 400,
  padding: "4px 8px",
  textTransform: "none",
  color: "black",
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: "var(--grey-600)",
    "&:hover": {
      color: "#fff",
      backgroundColor: "var(--grey-600)",
    },
  },
  "&:hover": {
    backgroundColor: "var(--grey-300)",
  },
};

function ToggleButtons({ reportType, setReportType }: ToggleButtonsProps) {
  const handleReportTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newReportType: string | null
  ) => {
    if (newReportType) setReportType(newReportType as ReportType);
  };

  const BUTTONS = {
    SelloutReport: "Sell-out",
    InventoryReport: "Inventory",
  };

  return (
    <ToggleButtonGroup
      value={reportType}
      exclusive
      onChange={handleReportTypeChange}
      aria-label="text alignment"
      sx={{
        height: "20px",
      }}
    >
      {Object.entries(BUTTONS).map(([value, label]) => (
        <ToggleButton key={value} value={value} sx={toggleBtnStyles}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
