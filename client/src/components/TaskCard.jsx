export default function TaskCard() {

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">Text my baby</span>
                <span className="deadline">Due: Today</span>
            </div>
            <div className="task-actions">
                <button>✔</button>
                <button>✏</button>
                <button>🗑</button>
            </div>
        </div>
    )
}