import React from "react";
import { ProfileDetails } from "../modules/ProfileDetails";
import { Outlet } from "react-router";
import Container from "../components/Container";

const ProfileLayout = () => {
  return (
    <div>
      <Container>
        <ProfileDetails />
        <Outlet />
      </Container>
    </div>
  );
};

export default ProfileLayout;
