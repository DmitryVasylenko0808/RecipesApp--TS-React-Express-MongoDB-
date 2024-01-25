import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Logo from "../modules/Header/components/Logo";
import Loading from "../components/Loading";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <Logo variant="auth" />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
