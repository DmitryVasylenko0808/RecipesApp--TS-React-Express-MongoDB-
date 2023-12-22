import React from "react";

type Kind = {
  _id: string;
  title: string;
};

type KindsRecipeProps = {
  kind?: Kind;
  isActive: boolean;
  onClick: () => void;
};

const KindsRecipeButton: React.FC<KindsRecipeProps> = ({
  kind,
  isActive,
  onClick,
}) => {
  const activeClassName = isActive ? "border-peach" : "border-transparent";

  return (
    <button
      className={`min-w-[120px] pb-1 border-b-4 ${activeClassName} flex justify-center`}
      onClick={onClick}
    >
      {kind?.title || "All"}
    </button>
  );
};

export default KindsRecipeButton;
