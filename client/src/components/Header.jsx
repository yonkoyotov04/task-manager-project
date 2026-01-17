import { useContext } from "react"
import UserContext from "../contexts/userContext.jsx"

export default function Header() {

    const {user, logoutHandler} = useContext(UserContext);

    return (
        <header>
            <div className="quote"></div>
            <div className="user">
                <span>{user?.username}</span>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </header>
    )
}