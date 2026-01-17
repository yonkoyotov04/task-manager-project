import { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import CompletedTaskCard from "./CompletedTaskCard.jsx";

export default function CompletedTasks() {

    const [completedTasks, setCompletedTasks] = useState([]);

    useFetch('/tasks/completed', setCompletedTasks, completedTasks);

    return (
        <section className="task-column">
            <div className="column-header">
                <h2>Completed Tasks</h2>
                <button className="icon-btn">🗑</button>
            </div>

            {completedTasks.map(task => <CompletedTaskCard key={task._id} {...task} />)}
        </section>
    )
}