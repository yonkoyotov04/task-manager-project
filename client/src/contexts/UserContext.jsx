import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const UserContext = createContext({
    user: {},
    isAuthenticated: false,
    isAdmin: false,
    loginHandler() {},
    logoutHandler() {}
})

export function UserProvider({children}) {
    const [user, setUser] = useLocalStorage(null, 'user');

    const onLogin = (user) => {
        setUser(user);
    }

    const onLogout = async () => {
        setUser(null);
    }

    const contextValues = {
        user,
        isAuthenticated: !!user?.email,
        isAdmin: user?.email === 'jjotov488@gmail.com' ? true : false,
        loginHandler: onLogin,
        logoutHandler: onLogout
    }

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;