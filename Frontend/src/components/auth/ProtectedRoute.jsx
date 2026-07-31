import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const {
        isAuthenticated,
        initialLoading,
    } = useAuth();

    const location = useLocation();

    // Wait until authentication check completes
    if (initialLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Logged in
    return children;
};

export default ProtectedRoute;