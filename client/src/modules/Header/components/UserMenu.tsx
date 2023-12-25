import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../../assets/icons/user.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import LogOutIcon from "../../../assets/icons/logout.svg";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/slices/authSlice";

type User = {
  _id: string;
  login: string;
  token: string;
};

type UserMenuProps = {
  user: User;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [isOpen, setisOpen] = useState<boolean>(false);

  const handleToggleMenu = () => setisOpen(!isOpen);
  const handleLogOut = () => dispatch(logOut());

  return (
    <div className="relative">
      <button
        className="min-w-[70px] min-h-[70px] px-4 flex justify-center items-center gap-x-2 text-lg text-white font-bold hover:bg-transparent/10 duration-300"
        aria-label="theme-button"
        onClick={handleToggleMenu}
      >
        <UserIcon width={30} height={30} />
        {user.login}
      </button>
      {isOpen && (
        <div className="absolute top-full z-10 min-w-full flex flex-col bg-white text-lg font-medium shadow-xl">
          <Link
            to={`/profile/${user._id}/recipes`}
            className="p-2 flex items-center gap-x-2 text-gray-400 hover:bg-gray-100"
          >
            <UserIcon width={20} height={20} />
            My Profile
          </Link>
          <Link
            to={`/profile/${user._id}/edit`}
            className="p-2 flex items-center gap-x-2 text-gray-400 hover:bg-gray-100"
          >
            <EditIcon width={20} height={20} />
            Edit Profile
          </Link>
          <button
            className="p-2 flex items-center gap-x-2 text-gray-400 hover:bg-gray-100"
            onClick={handleLogOut}
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
