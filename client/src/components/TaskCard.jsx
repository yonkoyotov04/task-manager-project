import { useContext } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";
import useDelete from "../hooks/useDelete.jsx";

export default function TaskCard({_id, title, deadline, completeFunc, onEdit, tasks, taskSetter}) {

    const {DeletePrompt, onDeleteClick} = useDelete('single', _id, tasks, taskSetter);

    const editHandler = (id) => {
        const editedTask = tasks.filter(task => task._id === id)[0];
        onEdit(editedTask);
    }

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span className="deadline">Due: {deadline}</span>
            </div>
            <div className="task-actions">
                <button onClick={() => {completeFunc(_id)}}>✔</button>
                <button onClick={() => {editHandler(_id)}}>✏</button>
                <button onClick={onDeleteClick}>🗑</button>
            </div>
            {DeletePrompt}
        </div>
        
    )
}