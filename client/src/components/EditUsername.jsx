import { useContext, useState } from "react";
import useControlledForm from "../hooks/useControlledForm.js"
import UserContext from "../contexts/userContext.jsx";
import useFetch from "../hooks/useFetch.js";

export default function editUsername({onClose}) {

    const {user, loginHandler} = useContext(UserContext);
    const {fetcher} = useFetch();

    const [initialValues, setInitialValues] = useState({username: user?.username});

    const onSubmit = async (values) => {
        const formData = values;
        const newUsername = await fetcher(`/edit/${user._id}/username`, 'PUT', formData, {accessToken: user?.accessToken});

        const newData = {...user, username: newUsername};

        loginHandler(newData);
        onClose();
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="modal-overlay" id="taskModal">
            <div className="modal">
                <h2>Edit Username</h2>

                <form method="PUT" onSubmit={submitHandler}>
                    <input type="text" name="username" placeholder="Username" onChange={changeHandler} value={values.username} required />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
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