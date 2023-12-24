import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  type = "button",
  disabled,
  children,
  onClick,
}) => {
  let className =
    "min-w-[150px] h-[50px] px-4 rounded-lg flex justify-center items-center gap-x-2 text-lg font-bold disabled:opacity-20 duration-300";

  if (variant === "primary") {
    className += " bg-red border-2 border-red text-white hover:bg-red/20";
  } else if (variant === "secondary") {
    className += " border-2 border-red text-red hover:bg-pink-light";
  } else if (variant === "outline") {
    className += " text-red hover:text-red/20";
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
