import { useContext } from "react"
import UserContext from "../contexts/userContext.jsx"

export default function SettingsMenu({editUsername, editPassword}) {
    const {user} = useContext(UserContext);

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
                <label>Theme</label>
                <select>
                    <option>Pink 🦋</option>
                    <option>Yellow 🍋</option>
                </select>
            </div>
        </div>
    )
}