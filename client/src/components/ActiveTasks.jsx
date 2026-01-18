import { useContext, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import useFetch from "../hooks/useFetch.js";
import UserContext from "../contexts/userContext.jsx";

export default function ActiveTasks({ formSetter, tasks, taskSetter }) {

    const {fetcher, isLoading} = useFetch();
    const {user} = useContext(UserContext);

    const showTaskForm = () => {
        formSetter(true);
    }

    const activeTasks = tasks.filter(task => task.status === 'active');

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

            {activeTasks.map(task => <TaskCard key={task._id} completeFunc={completeTask} {...task} />)}

        </section>
    )
}