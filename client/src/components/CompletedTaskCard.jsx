export default function CompletedTaskCard() {

    return (
        <div class="task-card">
            <div class="task-info">
                <span class="name">Plan date night</span>
                <span class="deadline">Completed</span>
            </div>
            <div class="task-actions">
                <button>↩</button>
                <button>🗑</button>
            </div>
        </div>
    )
}