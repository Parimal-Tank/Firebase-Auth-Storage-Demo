import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log("currentUser: ", currentUser);
  console.log(localStorage.getItem("emailForSignIn"));
  if (currentUser) {
    return <Outlet> {children} </Outlet>;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
