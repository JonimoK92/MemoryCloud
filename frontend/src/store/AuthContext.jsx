import { createContext, useContext, useEffect, useState } from "react";
import api from "../js/api";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const { data } = await api.get("/api/user");
            console.log("AUTH USER:", data);

            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {
        try {
            await api.get("/sanctum/csrf-cookie");

            const { data } = await api.post("/api/login", {
                email,
                password,
            });

            setUser(data.data.user); // 🔥 DIRECT

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function register(name, email, password) {
        try {
            await api.get("/sanctum/csrf-cookie");

            const { data } = await api.post("/api/register", {
                name,
                email,
                password,
            });

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function logout() {
        try {
            await api.get("/sanctum/csrf-cookie");
            await api.post("/api/logout");

            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}