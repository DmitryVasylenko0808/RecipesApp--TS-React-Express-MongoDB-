import React from "react";

type RecipeStepsProps = {
  steps: string[];
};

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <div className="mb-7">
      <h3 className="mb-5 text-xl font-bold">Steps</h3>
      <ul className="pl-2 space-y-4">
        {steps.map((s, i) => (
          <li className="">
            <h4 className="mb-3 font-bold">Step {i + 1}</h4>
            <p className="text-gray-500">{s}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSteps;
