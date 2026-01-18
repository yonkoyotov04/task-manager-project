import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import UserContext from "../contexts/userContext.jsx";
import useControlledForm from "../hooks/useControlledForm.js";

export default function TaskForm({formSetter, tasks, taskSetter}) {
    const {user} = useContext(UserContext);
    const {fetcher} = useFetch();

    const data = {
        title: '',
        deadline: ''
    }

    const [initialValues, setInitialValues] = useState(data);

    const closeTaskForm = () => {
        formSetter(false);
    }
    
    const onSubmit = async (values) => {
        const formData = values;

        const newTask = await fetcher('/tasks/active', "POST", formData, {accessToken: user?.accessToken});
        taskSetter(tasks => [...tasks, newTask]);
        formSetter(false);
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="modal-overlay" id="taskModal">
            <div className="modal">
                <h2>Add New Task</h2>
                <p className="subtitle">Make today a little more organized 💕</p>

                <form method="POST" onSubmit={submitHandler}>
                    <input type="text" name="title" placeholder="Task name" onChange={changeHandler} value={values.title} required />
                    <input type="date" name="deadline" onChange={changeHandler} value={values.deadline} required />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={closeTaskForm}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}