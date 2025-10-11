import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RestauranteRoute = () => {
    const { isAuthenticated, user } = useAuth();
    const roles = user?.roles || [];

    const hasRequiredRoles =
        roles.includes("ROLE_CANTINA") || roles.includes("ROLE_SER");

    if (!isAuthenticated || !hasRequiredRoles) {
        console.warn("Você não tem permissão para acessar essa página. ", user?.roles);
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default RestauranteRoute;   