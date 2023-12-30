import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
  const { isAuthenticate } = useAuth();

  if (!isAuthenticate) return <Navigate to="/auth/sign-in" />;

  return <Outlet />;
};

export default RequireAuth;
