import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    // accept a single object param to match callers
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user || null);
            return data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user || null);
            return data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        setLoading(true);
        try {
            const data = await getMe();
            setUser(data.user || null);
            return data;
        } catch (error) {
            console.error("Fetch user failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const userData = await getMe();
            setUser(userData);
            setLoading(false);
        };
        fetchUser();
    }, []);

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchUser,
    };
};