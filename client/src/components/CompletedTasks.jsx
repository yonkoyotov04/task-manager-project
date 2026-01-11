import CompletedTaskCard from "./CompletedTaskCard.jsx";

export default function CompletedTasks() {

    return (
        <section class="task-column">
            <div class="column-header">
                <h2>Completed Tasks</h2>
                <button class="icon-btn">🗑</button>
            </div>

            <CompletedTaskCard />
        </section>
    )
}