export default function CompletedTaskCard({title}) {

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span className="deadline">Completed</span>
            </div>
            <div className="task-actions">
                <button>↩</button>
                <button>🗑</button>
            </div>
        </div>
    )
}