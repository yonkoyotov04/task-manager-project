import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";
import useControlledForm from "../hooks/useControlledForm.js";

export default function EditForm({task, onEdit, taskSetter}) {

    const {fetcher} = useFetch();
    const {user} = useContext(UserContext);
    const [initialValues, setInitialValues] = useState(task)

    const closeEditForm = () => {
        onEdit(null);
    }

    const onSubmit = async (values) => {
        const formData = values;
        const updatedTask = await fetcher(`/tasks/${task._id}`, 'PUT', formData, {accessToken: user?.accessToken});

        taskSetter(tasks => tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
        onEdit(null);
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="modal-overlay" id="taskModal">
            <div className="modal">
                <h2>Edit Task</h2>
                <p className="subtitle">Make today a little more organized 💕</p>

                <form method="PUT" onSubmit={submitHandler}>
                    <input type="text" name="title" placeholder="Task name" onChange={changeHandler} value={values.title} required />
                    <input type="date" name="deadline" onChange={changeHandler} value={values.deadline} required />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={closeEditForm}>
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