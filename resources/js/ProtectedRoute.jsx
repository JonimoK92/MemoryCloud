import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    console.log("USER:", user);
    console.log("LOADING:", loading);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}