import { Box, Button } from "@mui/material";
import { PageInfoContext } from "contexts/PageInfoContext";
import { useStepper } from "contexts/StepperContext";
import { useContext, useEffect } from "react";
import "./OnboardingPage.scss";

function OnboardingPage() {
  const { setPageInfo } = useContext(PageInfoContext);
  const { handleNext, handleBack, activeStep, maxStep, steps, setActiveStep } =
    useStepper();

  useEffect(() => {
    setPageInfo({
      headerContent: "Onboarding",
    });
    setActiveStep(0);
  }, []);
  return (
    <div className="onboarding-page-container">
      <Box width={"100%"}>{steps[activeStep].label}</Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"16px 24px"}
        bgcolor={"white"}
        mt={"auto"}
      >
        <Box>
          <Button
            sx={{
              fontFamily: "inherit",
              color: "#10384F",
            }}
            variant="text"
            size="medium"
          >
            EXIT
          </Button>
          <Button
            sx={{ color: "#0091DF", fontFamily: "inherit" }}
            variant="text"
            size="medium"
          >
            SAVE
          </Button>
        </Box>
        <Box display={"flex"} gap={"8px"}>
          {activeStep > 0 && (
            <Button
              sx={{
                fontFamily: "inherit",
                borderColor: "rgba(0, 0, 0, 0.42)",
                color: "#10384F",
              }}
              variant="outlined"
              color="inherit"
              size="medium"
              onClick={handleBack}
            >
              PREV
            </Button>
          )}

          <Button
            sx={{ fontFamily: "inherit" }}
            variant="contained"
            size="medium"
            onClick={handleNext}
          >
            {activeStep === maxStep - 1 ? "FINISH" : "NEXT STEP"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default OnboardingPage;
