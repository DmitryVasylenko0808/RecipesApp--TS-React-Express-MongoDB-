import React from "react";

type PaperProps = {
  children: React.ReactNode;
};

const Paper: React.FC<PaperProps> = ({ children }) => {
  return (
    <div className="max-w-[500px] w-[500px] px-8 py-7 shadow-2xl">
      {children}
    </div>
  );
};

export default Paper;
