import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useStepper } from "contexts/StepperContext";
import CustomStepIcon from "./CustomStepIcon";
import CustomStepConnector from "./CustomStepConnector";

function CountryOnboardingStepper() {
  const { activeStep, steps } = useStepper();

  return (
    <Box paddingBlock={"16px"}>
      <Stepper
        sx={{
          "& .MuiStepLabel-root": {
            padding: "16px",
          },
          "& .MuiStepLabel-root:has(.Mui-active)": {
            backgroundColor: "rgba(0, 145, 223, 0.08)",
          },
        }}
        activeStep={activeStep}
        orientation="vertical"
        connector={<CustomStepConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  marginLeft: "16px",
                  fontFamily: "Helvetica Neue",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: "400",
                  color: "#10384F",
                  "&.Mui-disabled": {
                    color: "rgba(16, 56, 79, 0.6)",
                  },
                  "&.Mui-active": {
                    fontWeight: "400",
                    color: "#10384F",
                  },
                  "&.Mui-completed": {
                    color: "#10384F",
                    fontWeight: "400",
                  },
                },
              }}
              StepIconComponent={CustomStepIcon}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default CountryOnboardingStepper;
