import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Protected from "./features/auth/components/protected";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected> <h1>HomePage</h1></Protected>
    },
    {
        path: "/login",
    element: <Login />
    },
    {
        path: "/register",
    element: <Register />
    }
    ,
    {
        path: "*",
        element: <div>404 - Not Found</div>
    }
])