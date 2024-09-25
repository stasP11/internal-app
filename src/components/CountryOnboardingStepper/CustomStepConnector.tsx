import { StepConnector } from "@mui/material";

function CustomStepConnector() {
  return (
    <StepConnector
      sx={{
        transform: "translateX(15px)",
        "& .MuiStepConnector-line": {
          height: "40px",
          borderLeftWidth: "2px",
          borderColor: "#ECEFF1",
          marginTop: "-16px",
          marginBottom: "-20px",
        },
        "&.Mui-completed .MuiStepConnector-line": {
          marginTop: "-20px",
          borderColor: "#0091DF",
        },
        "&.Mui-active .MuiStepConnector-line": {
          marginTop: "-20px",
          borderColor: "#0091DF",
        },
      }}
    />
  );
}
export default CustomStepConnector;
