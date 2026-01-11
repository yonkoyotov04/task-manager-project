import CompletedTaskCard from "./CompletedTaskCard.jsx";

export default function CompletedTasks() {

    return (
        <section className="task-column">
            <div className="column-header">
                <h2>Completed Tasks</h2>
                <button className="icon-btn">🗑</button>
            </div>

            <CompletedTaskCard />
        </section>
    )
}