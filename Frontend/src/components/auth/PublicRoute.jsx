import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";


const PublicRoute = ({ children }) => {
    const { isAuthenticated, initialLoading } = useAuth();

    // Wait until authentication check is complete
    if (initialLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Already logged in? Don't allow access to Login/Register
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Not logged in? Allow access
    return children;
};

export default PublicRoute;