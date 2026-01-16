export default function TaskCard({title, deadline}) {

    return (
        <div className="task-card">
            <div className="task-info">
                <span className="name">{title}</span>
                <span className="deadline">Due: {deadline}</span>
            </div>
            <div className="task-actions">
                <button>✔</button>
                <button>✏</button>
                <button>🗑</button>
            </div>
        </div>
    )
}