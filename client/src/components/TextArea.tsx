import React, { forwardRef } from "react";

type TextAreaProps = {
  name: React.ComponentProps<"textarea">["name"];
  label?: React.ReactNode;
  rows?: number;
  error?: string;
  onChange: React.ComponentProps<"textarea">["onChange"];
  onBlur: React.ComponentProps<"textarea">["onBlur"];
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, rows, error, ...textAreaProps }, ref) => {
    return (
      <div>
        {label && (
          <label
            className="mb-2 block text-gray-500"
            htmlFor={textAreaProps.name}
          >
            {label}
          </label>
        )}
        <textarea
          {...textAreaProps}
          ref={ref}
          rows={rows}
          className="mb-2 block min-w-[200px] w-full outline-0 p-2 text-xl border-2 rounded-lg focus:border-red resize-none"
        />
        <span className="text-sm text-red">{error}</span>
      </div>
    );
  }
);

export default TextArea;
