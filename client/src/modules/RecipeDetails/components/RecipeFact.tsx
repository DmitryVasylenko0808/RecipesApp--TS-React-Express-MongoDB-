import React from "react";

type RecipeFactProps = {
  label: string;
  value: string;
};

const RecipeFact: React.FC<RecipeFactProps> = ({ label, value }) => {
  return (
    <div className="font-bold text-xl flex item-center gap-x-3">
      <span>{label}: </span>
      <span className="text-[18px] font-medium">{value}</span>
    </div>
  );
};

export default RecipeFact;
