import React from "react";
import { Outlet } from "react-router";
import Logo from "../modules/Header/components/Logo";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <Logo variant="auth" />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
