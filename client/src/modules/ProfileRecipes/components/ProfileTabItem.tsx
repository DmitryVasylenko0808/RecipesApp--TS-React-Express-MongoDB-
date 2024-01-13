import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

type ProfileTabItemProps = {
  to: string;
  isActive: boolean;
  text: string;
};

const ProfileTabItem: React.FC<ProfileTabItemProps> = ({
  to,
  isActive,
  text,
}) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(to);

  let btnClassName = "px-7 py-4 text-2xl border-b-4 text-gray-500";
  if (isActive) {
    btnClassName =
      "px-7 py-4 text-2xl border-b-4 border-red text-red font-bold";
  }

  return (
    <button className={btnClassName} onClick={handleClick}>
      {text}
    </button>
  );
};

export default ProfileTabItem;
