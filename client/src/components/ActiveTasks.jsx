import TaskCard from "./TaskCard.jsx";

export default function ActiveTasks() {

    return (
        <section class="task-column">
            <div class="column-header">
                <h2>Active Tasks</h2>
                <button class="icon-btn">＋</button>
            </div>

            <TaskCard />

        </section>
    )
}