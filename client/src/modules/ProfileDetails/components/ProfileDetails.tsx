import React from "react";
import { useGetProfileQuery } from "../../../api/profiles/profilesApt";
import { useLocation, useParams } from "react-router";
import { BASE_API_URL_AVATARS } from "../../../constants/api";

import nullAvatar from "../../../assets/images/nullavatar.jpg";
import ProfileTabs from "./ProfileTabs";
import BreadCrumbs from "./BreadCrumbs";
import { BreadCrumb } from "../types";

const ProfileDetails = () => {
  const { userId } = useParams();
  const location = useLocation();

  const { data, isLoading, isError } = useGetProfileQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const imgSrc = data?.avatar_file ? data.avatar_file : nullAvatar;

  const pathnameArray = location.pathname.split("/");

  let breadCrumbs: BreadCrumb[] = [];
  let lastCrumbPath = pathnameArray[3];
  let lastCrumbName: BreadCrumb["name"] = "";
  if (lastCrumbPath === "recipes") lastCrumbName = "Personal Recipes";
  else if (lastCrumbPath === "favorites") lastCrumbName = "Favorite Recipes";

  if (data) {
    breadCrumbs = [
      { name: "Home", path: "/" },
      { name: data.login, path: `/profile/${data?._id}/recipes` },
      { name: lastCrumbName, path: location.pathname },
    ];
  }

  return (
    <>
      <div className="py-12 flex items-center">
        <img
          src={imgSrc}
          width="330"
          height="330"
          alt="Avatar"
          className="z-10 shadow-2xl rounded-full"
        />
        <div className="relative right-[19px] flex-auto px-8 py-10 border-4 shadow-2xl flex flex-col justify-center">
          <BreadCrumbs breadCrumbs={breadCrumbs} />
          <h1 className="text-3xl font-bold">{data?.login}</h1>
        </div>
      </div>
      <ProfileTabs userId={data?._id} />
    </>
  );
};

export default ProfileDetails;
