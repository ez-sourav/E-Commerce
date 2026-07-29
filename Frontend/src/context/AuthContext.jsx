import { createContext, useEffect, useState } from "react";
import {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
} from "../Services/authService";
import { syncGuestCart } from "../Services/cartService";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initial loading only
    const [initialLoading, setInitialLoading] = useState(true);

    // Action loading (login/register/logout)
    const [loading, setLoading] = useState(false);

    const fetchCurrentUser = async () => {

        try {
            const data = await getCurrentUser();
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Fetch Current User Error:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setInitialLoading(false);

        }

    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const data = await registerUser(userData);
            await syncGuestCart(true);
            await fetchCurrentUser();
            return data;
        } catch (error) {
            console.error("Register Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {

        try {
            setLoading(true);
            const data = await loginUser(userData);
            await syncGuestCart(true);
            await fetchCurrentUser();
            return data;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }

    };

    const logout = async () => {

        try {
            setLoading(true);
            await logoutUser();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        fetchCurrentUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                initialLoading,
                register,
                login,
                logout,
                fetchCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};