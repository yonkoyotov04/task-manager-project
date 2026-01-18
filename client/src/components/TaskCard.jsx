import { useContext } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";

export default function TaskCard({_id, title, deadline, completeFunc}) {

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span className="deadline">Due: {deadline}</span>
            </div>
            <div className="task-actions">
                <button onClick={() => {completeFunc(_id)}}>✔</button>
                <button>✏</button>
                <button>🗑</button>
            </div>
        </div>
    )
}