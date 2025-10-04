import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/main" replace />;
  return <Outlet />; // renderiza rotas filhas
};

export default PublicRoute;