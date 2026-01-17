import { useContext } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";

export default function CompletedTaskCard({_id, title, completedAt}) {

    const {fetcher} = useFetch();
    const {user} = useContext(UserContext);

    const returnTask = () => {
        fetcher(`/tasks/completed/${_id}/back`, "PUT", null, {accessToken: user?.accessToken});
    }

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span className="deadline">Completed At: {completedAt}</span>
            </div>
            <div className="task-actions">
                <button onClick={returnTask}>↩</button>
                <button>🗑</button>
            </div>
        </div>
    )
}