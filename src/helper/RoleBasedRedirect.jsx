import React from "react";
import { Navigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType === "Admin") {
    return <Navigate to="admindashboard" replace />;
  }

  return <Navigate to="userdashboard" replace />;
};

export default RoleBasedRedirect;
