import React, { useState } from "react";
import { Option } from "../types";

import ChevronDownIcon from "../assets/icons/chevron_down.svg";

type SelectProps = {
  options: Option[];
  onSelect: (val: string) => void;
};

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
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
      <div
        className="min-w-[170px] px-3 py-2 flex justify-between items-center text-gray-500 border-2 border-pink-default rounded-lg cursor-pointer"
        onClick={handleToggle}
      >
        {selectedOption?.name}
        <ChevronDownIcon
          width={20}
          height={20}
          className={`text-red duration-150 ${chevronClassName}`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full z-10 w-full shadow-xl bg-white rounded-lg cursor-pointer text-gray-500">
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
