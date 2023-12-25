import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

type TextFieldProps = {
  name: React.ComponentProps<"input">["name"];
  type?: React.ComponentProps<"input">["type"];
  label?: React.ReactNode;
  error?: string;
  onChange: React.ComponentProps<"input">["onChange"];
  onBlur: React.ComponentProps<"input">["onBlur"];
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div className="">
        {label && (
          <label className="mb-2 block text-gray-500" htmlFor={inputProps.name}>
            {label}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className="mb-2 block min-w-[200px] w-full outline-0 p-2 text-xl border-2 rounded-lg focus:border-red"
        />
        <span className="text-sm text-red">{error}</span>
      </div>
    );
  }
);

export default TextField;
