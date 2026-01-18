import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import CompletedTaskCard from "./CompletedTaskCard.jsx";
import UserContext from "../contexts/userContext.jsx";
import useDelete from "../hooks/useDelete.jsx";

export default function CompletedTasks({tasks, taskSetter}) {

    const completedTasks = tasks.filter(task => task.status === 'completed');
    const {fetcher} = useFetch();
    const {user} = useContext(UserContext);
    const {DeletePrompt, onDeleteClick} = useDelete('all', null, tasks, taskSetter);

    const returnTask = async (id) => {
        const updatedTask = await fetcher(`/tasks/${id}/back`, "PUT", null, {accessToken: user?.accessToken});
        taskSetter(tasks => tasks.map(task => task._id === updatedTask._id ? updatedTask : task))
    }

    return (
        <section className="task-column">
            <div className="column-header">
                <h2>Completed Tasks</h2>
                <button className="icon-btn" onClick={onDeleteClick}>🗑</button>
            </div>
            {completedTasks.map(task => <CompletedTaskCard key={task._id} returnFunc={returnTask} tasks={tasks} taskSetter={taskSetter} {...task} />)}
            {DeletePrompt}
        </section>
    )
}