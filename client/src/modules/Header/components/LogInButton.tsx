import React from "react";

import KeyIcon from "../../../assets/icons/key.svg";
import { Link } from "react-router-dom";

const LogInButton = () => {
  return (
    <Link
      to="/auth/sign-in"
      className="min-w-[70px] min-h-[70px] px-4 flex justify-center items-center gap-x-2 text-lg text-white font-bold hover:bg-transparent/10 duration-300"
      aria-label="theme-button"
    >
      <KeyIcon width={30} height={30} />
      Log In
    </Link>
  );
};

export default LogInButton;
