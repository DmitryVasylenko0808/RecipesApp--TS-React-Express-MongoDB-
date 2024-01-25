import React, { Suspense } from "react";
import { Header } from "../modules/Header";
import { Outlet } from "react-router";
import Loading from "../components/Loading";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;
