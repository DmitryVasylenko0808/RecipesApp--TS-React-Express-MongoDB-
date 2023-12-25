import React from "react";
import { NavLink } from "react-router-dom";

type ProfileTabsProps = {
  userId?: string;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userId = "" }) => {
  return (
    <div className="mb-7 flex border-b-4">
      <NavLink
        to={`/profile/${userId}/recipes`}
        className={({ isActive }) =>
          isActive
            ? "px-7 py-4 text-2xl border-b-4 border-red text-red font-bold"
            : "px-7 py-4 text-2xl border-b-4 text-gray-500"
        }
      >
        Personal Recipes
      </NavLink>
      <NavLink
        to={`/profile/${userId}/favorites`}
        className={({ isActive }) =>
          isActive
            ? "px-7 py-4 text-2xl border-b-4 border-red text-red font-bold"
            : "px-7 py-4 text-2xl border-b-4 text-gray-500"
        }
      >
        Favorite Recipes
      </NavLink>
    </div>
  );
};

export default ProfileTabs;
