import React, { useState } from "react";
import { Option } from "../types";

import ChevronDownIcon from "../assets/icons/chevron_down.svg";

type SelectProps = {
  options: Option[];
  label?: string;
  onSelect: (val: string) => void;
};

const Select: React.FC<SelectProps> = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedOption = options.find((o) => o.selected === true);
  const selectedOptionClassName = "bg-red text-white";
  const chevronClassName = isOpen ? "rotate-180" : "";

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (val: string) => {
    onSelect(val);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && <label className="mb-2 block text-gray-500">{label}</label>}
      <div
        className="min-w-[170px] w-full px-3 py-2 flex justify-between items-center text-gray-500 border-2 text-xl rounded-lg cursor-pointer"
        onClick={handleToggle}
      >
        {selectedOption?.name}
        <ChevronDownIcon
          width={20}
          height={20}
          className={`text-gray-500 duration-150 ${chevronClassName}`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-[52px] z-10 w-full shadow-xl bg-white rounded-lg cursor-pointer text-gray-500">
          {options.map((o) => (
            <div
              className={`px-3 py-3 hover:bg-red hover:text-white duration-300 
              first-of-type:rounded-t-lg last-of-type:rounded-b-lg 
              ${
                o.value === selectedOption?.value ? selectedOptionClassName : ""
              }`}
              onClick={() => handleSelect(o.value)}
            >
              {o.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
