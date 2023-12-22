import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../../assets/icons/user.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import LogOutIcon from "../../../assets/icons/logout.svg";

const UserMenu = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);

  const handleToggleMenu = () => setisOpen(!isOpen);

  return (
    <div className="relative">
      <button
        className="min-w-[70px] min-h-[70px] px-2 flex justify-center items-center gap-x-2 text-lg text-white font-bold hover:bg-transparent/10"
        aria-label="theme-button"
        onClick={handleToggleMenu}
      >
        <UserIcon width={30} height={30} />
        UserLogin
      </button>
      {isOpen && (
        <div className="absolute top-full z-10 min-w-full flex flex-col bg-white text-lg font-medium shadow-xl">
          <Link
            to={`/profile/${1}`}
            className="p-2 flex items-center gap-x-2 text-gray-400 hover:bg-gray-100"
          >
            <UserIcon width={20} height={20} />
            My Profile
          </Link>
          <Link
            to={`/profile/${1}/edit`}
            className="p-2 flex items-center gap-x-2 text-gray-400 hover:bg-gray-100"
          >
            <EditIcon width={20} height={20} />
            Edit Profile
          </Link>
          <button
            className="p-2 flex items-center gap-x-2 text-gray-400 hover:bg-gray-100"
            onClick={() => {}}
          >
            <LogOutIcon width={20} height={20} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
