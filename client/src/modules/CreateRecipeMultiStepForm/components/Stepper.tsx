import React from "react";
import StepItem from "./StepItem";

type StepperProps = {
  countSteps: number;
  currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ countSteps, currentStep }) => {
  const steps = Array.from(Array(countSteps).keys());

  return (
    <div className="py-9 flex items-center">
      {steps.map((s, i) => (
        <StepItem
          number={s + 1}
          isPassed={s + 1 < currentStep}
          isCurrent={s + 1 === currentStep}
          isLast={s + 1 === countSteps}
          key={i}
        />
      ))}
    </div>
  );
};

export default Stepper;
