import React, { createContext, useState, useContext } from "react";
type Step = {
  label: string;
};

interface StepperContextType {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  steps: Step[];
  maxStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepperContext = createContext<StepperContextType>({
  activeStep: 0,
  handleNext: () => {},
  handleBack: () => {},
  handleReset: () => {},
  setActiveStep: () => {},
  steps: [],
  maxStep: 0,
});

export const useStepper = () => useContext(StepperContext);

export const StepperProvider = ({ children }: any) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Initial information",
    },
    {
      label: "Distributors",
    },
    {
      label: "Products",
    },
    {
      label: "Data Stewards",
    },
    {
      label: "Timelines",
    },
    {
      label: "Inventory Report",
    },
    {
      label: "Sell-out Report",
    },
    {
      label: "Notification Emails",
    },
  ];

  const maxStep = steps.length;

  const handleNext = () => {
    if (activeStep === maxStep - 1) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        handleNext,
        handleBack,
        handleReset,
        steps,
        maxStep,
        setActiveStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
