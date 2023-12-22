import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-[1440px] m-auto px-5">{children}</div>;
};

export default Container;
