import { Navigate, useLocation } from "react-router";
import { Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If no user, stay on root (login) page
  if (!isAuthenticated) {
    return location.pathname === "/" ? <Outlet /> : <Navigate to="/" replace />;
  }

  // If authenticated but on root path, redirect to dashboard
  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, show the task dashbaord
  return <Outlet />;
};

export default AuthGuard;
