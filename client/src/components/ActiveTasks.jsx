import { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import useFetch from "../hooks/useFetch.js";

export default function ActiveTasks({formSetter}) {

    const [activeTasks, setActiveTasks] = useState([]);

    const showTaskForm = () => {
        formSetter(true);
    }

    useFetch('/tasks/active', setActiveTasks, activeTasks);

    return (
        <section className="task-column">
            <div className="column-header">
                <h2>Active Tasks</h2>
                <button className="icon-btn" onClick={showTaskForm}>＋</button>
            </div>

            {activeTasks.map(task => <TaskCard key={task._id} {...task} />)}

        </section>
    )
}