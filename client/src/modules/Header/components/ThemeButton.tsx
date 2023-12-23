import React from "react";

import SunIcon from "../../../assets/icons/sun.svg";
import MoonIcon from "../../../assets/icons/moon.svg";

const ThemeButton = () => {
  return (
    <button
      className="w-[70px] h-[70px] flex justify-center items-center hover:bg-transparent/10 duration-300"
      aria-label="theme-button"
    >
      {/* <SunIcon width={25} height={25} color="white" /> */}
      <MoonIcon width={30} height={30} color="white" />
    </button>
  );
};

export default ThemeButton;
