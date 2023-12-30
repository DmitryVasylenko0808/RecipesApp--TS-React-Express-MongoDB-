import React from "react";
import StepItem from "./StepItem";
import { Step } from "../typed";

type StepperProps = {
  countSteps: number;
  currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ countSteps, currentStep }) => {
  const steps = Array.from(Array(countSteps).keys());

  return (
    <div className="py-9 flex items-center">
      {/* {steps.map((s, i) => (
        <StepItem
          number={s.number}
          isPassed={s.passed}
          isCurrent={s.passed && !steps[i + 1].passed}
          isLast={i === steps.length - 1}
        />
      ))} */}
      {steps.map((s, i) => (
        <StepItem
          number={s + 1}
          isPassed={s + 1 < currentStep}
          isCurrent={s + 1 === currentStep}
          isLast={s + 1 === countSteps}
        />
      ))}
    </div>
  );
};

export default Stepper;
