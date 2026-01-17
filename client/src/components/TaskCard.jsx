import { useContext } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";

export default function TaskCard({_id, title, deadline}) {

    const {fetcher} = useFetch();
    const {user} = useContext(UserContext);

    const completeTask = () => {
        fetcher(`/tasks/active/${_id}/complete`, "GET", null, {accessToken: user?.accessToken});
    }

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span className="deadline">Due: {deadline}</span>
            </div>
            <div className="task-actions">
                <button onClick={completeTask}>✔</button>
                <button>✏</button>
                <button>🗑</button>
            </div>
        </div>
    )
}