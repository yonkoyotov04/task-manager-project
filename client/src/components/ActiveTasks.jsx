import TaskCard from "./TaskCard.jsx";

export default function ActiveTasks() {

    return (
        <section className="task-column">
            <div className="column-header">
                <h2>Active Tasks</h2>
                <button className="icon-btn">＋</button>
            </div>

            <TaskCard />

        </section>
    )
}