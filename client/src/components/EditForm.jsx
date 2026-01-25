export default function EditForm() {

    return (
        <div className="modal-overlay" id="taskModal">
            <div className="modal">
                <h2>Edit Task</h2>
                <p className="subtitle">Make today a little more organized 💕</p>

                <form method="PUT" onSubmit={submitHandler}>
                    <input type="text" name="title" placeholder="Task name" onChange={changeHandler} value={values.title} required />
                    <input type="date" name="deadline" onChange={changeHandler} value={values.deadline} required />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={closeTaskForm}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}