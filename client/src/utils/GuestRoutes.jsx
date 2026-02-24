import { Navigate, Outlet } from "react-router";
import UserContext from "../contexts/UserContext.jsx";
import { useContext } from "react";

export default function GuestRoutes() {
    const {isAuthenticated} = useContext(UserContext);
    return isAuthenticated ? <Navigate to="/"/> : <Outlet/>
}