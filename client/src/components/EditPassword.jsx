import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch.js"
import UserContext from "../contexts/userContext.jsx";
import useControlledForm from "../hooks/useControlledForm.js";
import { useNavigate } from "react-router";

export default function EditPassword({onClose}) {

    const {user, logoutHandler} = useContext(UserContext);
    const {fetcher} = useFetch();

    const [initialValues, setInitialValues] = useState({currentPassword: '', 
        newPassword: '', 
        repeatPassword: ''})

    const onSubmit = async (values) => {
        const formData = values;
        await fetcher(`/edit/${user?._id}/password`, 'PUT', formData, {accessToken: user?.accessToken});

        logoutHandler();
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="modal-overlay" id="taskModal">
            <div className="modal">
                <h2>Edit Password</h2>

                <form method="PUT" onSubmit={submitHandler}>
                    <input 
                    type="password" 
                    name="currentPassword" 
                    placeholder="Current Password" 
                    onChange={changeHandler} 
                    value={values.currentPassword} required />
                    <input 
                    type="password" 
                    name="newPassword" 
                    placeholder="New Password" 
                    onChange={changeHandler} 
                    value={values.newPassword} required />
                    <input 
                    type="password" 
                    name="repeatPassword" 
                    placeholder="Repeat New Password" 
                    onChange={changeHandler} 
                    value={values.repeatPassword} required />

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