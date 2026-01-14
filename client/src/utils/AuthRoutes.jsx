import { Navigate, Outlet } from "react-router";
import UserContext from "../contexts/userContext.jsx";
import { useContext } from "react";

export default function AuthRoutes() {
    const {isAuthenticated} = useContext(UserContext);
    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
}