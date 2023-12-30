import React from "react";
import { Step } from "../typed";

type StepItemProps = {
  number: number;
  isPassed: boolean;
  isCurrent: boolean;
  isLast: boolean;
};

const StepItem: React.FC<StepItemProps> = ({
  number,
  isPassed,
  isCurrent,
  isLast,
}) => {
  let stepClassName =
    "w-[50px] h-[50px] rounded-full flex justify-center items-center text-white text-lg font-bold";
  let delimiterClassName = "flex-auto h-0.5 mx-2";

  if (isPassed) {
    stepClassName += " bg-red";
    delimiterClassName += " bg-red";
  } else if (isCurrent) {
    stepClassName += " bg-red";
    delimiterClassName += " bg-gray-300";
  } else {
    stepClassName += " bg-gray-300";
    delimiterClassName += " bg-gray-300";
  }

  return (
    <>
      <div className={stepClassName}>{number}</div>
      {!isLast && <div className={delimiterClassName} />}
    </>
  );
};

export default StepItem;
