import React from "react";
import { Header } from "../modules/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
