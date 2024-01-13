import React from "react";

type ProfileTabsProps = {
  children: React.ReactNode;
};

const ProfileTabs: React.FC<ProfileTabsProps> = ({ children }) => {
  return <div className="mb-7 flex border-b-4">{children}</div>;
};

export default ProfileTabs;
