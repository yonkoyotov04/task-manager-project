export default function CompletedTaskCard() {

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">Plan date night</span>
                <span className="deadline">Completed</span>
            </div>
            <div className="task-actions">
                <button>↩</button>
                <button>🗑</button>
            </div>
        </div>
    )
}