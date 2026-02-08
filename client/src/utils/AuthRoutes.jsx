import { Navigate, Outlet } from "react-router";
import UserContext from "../contexts/UserContext.jsx";
import { useContext } from "react";

export default function AuthRoutes() {
    const {isAuthenticated} = useContext(UserContext);
    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
}