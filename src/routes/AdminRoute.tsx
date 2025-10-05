import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
    const { isAuthenticated, user } = useAuth();
    const roles = user?.roles || [];

    const hasRequiredRoles =
        roles.includes("ROLE_CANTINA") && roles.includes("ROLE_SER");

    if (!isAuthenticated || !hasRequiredRoles) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AdminRoute;   