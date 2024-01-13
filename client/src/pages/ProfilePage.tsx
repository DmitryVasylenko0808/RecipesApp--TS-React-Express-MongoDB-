import React from "react";
import Container from "../components/Container";
import { ProfileDetails } from "../modules/ProfileDetails";
import { ProfileRecipes } from "../modules/ProfileRecipes";

const ProfilePage = () => {
  return (
    <div>
      <Container>
        <ProfileDetails />
        <ProfileRecipes />
      </Container>
    </div>
  );
};

export default ProfilePage;
