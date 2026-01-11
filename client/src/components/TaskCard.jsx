export default function TaskCard() {

    return (
        <div class="task-card">
            <div class="task-info">
                <span class="name">Text my baby</span>
                <span class="deadline">Due: Today</span>
            </div>
            <div class="task-actions">
                <button>✔</button>
                <button>✏</button>
                <button>🗑</button>
            </div>
        </div>
    )
}