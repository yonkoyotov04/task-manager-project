import useFetch from "../hooks/useFetch.js"
import useDelete from "../hooks/useDelete.jsx";
import { useContext } from "react";
import UserContext from "../contexts/userContext.jsx";

export default function TaskCard({ _id, title, deadline, status, completeFunc, onEdit, tasks, taskSetter }) {

    const { DeletePrompt, onDeleteClick } = useDelete('single', _id, tasks, taskSetter);
    const {fetcher} = useFetch()
    const {user} = useContext(UserContext);

    const editHandler = (id) => {
        const editedTask = tasks.filter(task => task._id === id)[0];
        onEdit(editedTask);
    }

    let currentStatus = status;

    if (currentStatus !== 'expired') {
        const currentDate = new Date().getTime();
        const taskDate = new Date(deadline).getTime()

        if (currentDate > taskDate) {
            currentStatus = 'expired';
            fetcher(`/tasks/${_id}/expire`, 'PUT', null, {accessToken: user?.acceessToken});
        }
    }

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span 
                className={currentStatus !== 'expired' ? 'deadline' : 'expired'}>
                    Due: {currentStatus !== 'expired' ? deadline : `${deadline} Expired!`}
                    </span>
            </div>
            <div className="task-actions">
                <button onClick={() => { completeFunc(_id) }}>✔</button>
                <button onClick={() => { editHandler(_id) }}>✏</button>
                <button onClick={onDeleteClick}>🗑</button>
            </div>
            {DeletePrompt}
        </div>

    )
}