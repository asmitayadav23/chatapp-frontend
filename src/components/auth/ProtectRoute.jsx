import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  if (user === undefined) return null; // or show loader
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectRoute;
