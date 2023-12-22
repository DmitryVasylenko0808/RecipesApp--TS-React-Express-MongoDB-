import React from "react";
import { Header } from "../modules/Header";
import { Outlet } from "react-router";
import Container from "../components/Container";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
