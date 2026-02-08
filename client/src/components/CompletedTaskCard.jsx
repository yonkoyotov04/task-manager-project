import { useContext } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";
import useDelete from "../hooks/useDelete.jsx";

export default function CompletedTaskCard({_id, title, completedAt, status, returnFunc, tasks, taskSetter}) {

    const {DeletePrompt, onDeleteClick} = useDelete('single', _id, tasks, taskSetter)
    console.log(status);

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span 
                className={status === 'completed-expired' ? 'expired' : 'deadline'}>
                    {status === 'completed-expired' ? 'Completed After Expiration:' : 'Completed At:'} {completedAt}
                    </span>
            </div>
            <div className="task-actions">
                <button onClick={() => {returnFunc(_id)}}>↩</button>
                <button onClick={onDeleteClick}>🗑</button>
            </div>
            {DeletePrompt}
        </div>
    )
}