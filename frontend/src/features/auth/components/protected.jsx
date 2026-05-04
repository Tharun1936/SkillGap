import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from "react";

const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    const navigate = Navigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Protected;
