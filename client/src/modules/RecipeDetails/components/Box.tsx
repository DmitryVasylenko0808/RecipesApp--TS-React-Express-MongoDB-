import React from "react";

type BoxProps = {
  children: React.ReactNode;
  title?: string;
};

const Box: React.FC<BoxProps> = ({ children, title }) => {
  return (
    <>
      {title && <h3 className="mb-7 text-xl font-bold">{title}</h3>}
      <div className="mb-7 px-12 py-5 bg-peach/30 flex justify-between">
        {children}
      </div>
    </>
  );
};

export default Box;
