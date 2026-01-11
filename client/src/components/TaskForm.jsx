export default function TaskForm() {

    return (
        <div class="modal-overlay" id="taskModal">
            <div class="modal">
                <h2>Add New Task</h2>
                <p class="subtitle">Make today a little more organized 💕</p>

                <form>
                    <input type="text" placeholder="Task name" required />
                    <input type="date" required />

                    <div class="modal-actions">
                        <button type="button" class="cancel-btn" onclick="closeModal()">
                            Cancel
                        </button>
                        <button type="submit" class="save-btn">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}