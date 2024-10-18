import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { signed } = useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
