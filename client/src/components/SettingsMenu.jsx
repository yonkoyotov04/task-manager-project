import { useContext } from "react"
import UserContext from "../contexts/UserContext.jsx"
import useControlledForm from "../hooks/useControlledForm.js";
import { useState } from "react";
import useFetch from "../hooks/useFetch.js";

export default function SettingsMenu({ editUsername, editPassword }) {
    const { user, theme } = useContext(UserContext);
    const [initialValues, setInitialValues] = useState({theme})
    const {fetcher} = useFetch();

    const onSubmit = async (values) => {
        const formData = values;
        await fetcher(`/${user._id}/theme`, 'PUT', formData, {accessToken: user?.accessToken});
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit)

    return (
        <div className="settings-dropdown">
            <div className="settings-user">
                <strong>{user?.username}</strong>
                <span>{user?.email}</span>
            </div>

            <div className="settings-actions">
                <button className="settings-action" onClick={() => editUsername(true)}>Change username</button>
                <button className="settings-action" onClick={() => editPassword(true)}>Change password</button>
            </div>

            <div className="settings-theme">
                <form method="PUT" onSubmit={submitHandler}>
                    <label>Theme </label>
                    <select name="theme" value={values.theme} onChange={changeHandler}>
                        <option value='Pink'>Pink 🦋</option>
                        <option value='Yellow'>Yellow 🍋</option>
                        <option value='Red'>Red 🌹</option>
                    </select>
                    <button type="submit">Apply</button>
                </form>

            </div>
        </div>
    )
}