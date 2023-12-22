import React from "react";

import UserIcon from "../../../assets/icons/user.svg";

const UserButton = () => {
  return (
    <button
      className="min-w-[70px] min-h-[70px] px-2 flex justify-center items-center gap-x-2 text-lg text-white font-bold hover:bg-transparent/10"
      aria-label="theme-button"
    >
      <UserIcon width={30} height={30} />
      UserLogin
    </button>
  );
};

export default UserButton;
