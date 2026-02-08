import { useContext, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import useFetch from "../hooks/useFetch.js";
import UserContext from "../contexts/UserContext.jsx";
import useDelete from "../hooks/useDelete.jsx";

export default function ActiveTasks({ formSetter, onEdit, tasks, taskSetter }) {

    const {fetcher} = useFetch();
    const {user} = useContext(UserContext);

    const showTaskForm = () => {
        formSetter(true);
    }

    const activeTasks = tasks.filter(task => task.status === 'active' || task.status === 'expired');

    const completeTask = async (id) => {
        const updatedTask = await fetcher(`/tasks/${id}/complete`, "PUT", null, { accessToken: user?.accessToken });
        taskSetter(tasks => tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    }

    return (
        <section className="task-column">
            <div className="column-header">
                <h2>Active Tasks</h2>
                <button className="icon-btn" onClick={showTaskForm}>＋</button>
            </div>

            <div className="task-list">
                {activeTasks.map(task => <TaskCard key={task._id} completeFunc={completeTask} onEdit={onEdit} tasks={tasks} taskSetter={taskSetter} {...task} />)}
            </div>
        </section>
    )
}