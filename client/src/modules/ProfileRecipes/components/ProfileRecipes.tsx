import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FavoriteRecipes from "./FavoriteRecipes";
import UserRecipes from "./UserRecipes";
import ProfileTabs from "./ProfileTabs";
import ProfileTabItem from "./ProfileTabItem";

const ProfileRecipes = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const content = searchParams.get("content");

  return (
    <div>
      <ProfileTabs>
        <ProfileTabItem
          to={`/profile/${userId}?content=recipes`}
          isActive={content === "recipes" || !content}
          text="Profile Recipes"
        />
        <ProfileTabItem
          to={`/profile/${userId}?content=favorites`}
          isActive={content === "favorites"}
          text="Favorite Recipes"
        />
      </ProfileTabs>
      {content === "favorites" ? <FavoriteRecipes /> : <UserRecipes />}
    </div>
  );
};

export default ProfileRecipes;
