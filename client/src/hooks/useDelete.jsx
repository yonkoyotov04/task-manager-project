import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext.jsx";
import useFetch from "./useFetch.js";

export default function useDelete(type, id, data, setData) {
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const { user } = useContext(UserContext);
    const { fetcher } = useFetch();

    const onDeleteClick = () => {
        setShowDeletePrompt(true);
    }

    const onNoClick = () => {
        setShowDeletePrompt(false);
    }

    const onYesClick = () => {
        switch(type) {
            case 'single': {
                fetcher(`/tasks/${id}`, "DELETE", null, {accessToken: user?.accessToken});
                setData(data => data.filter(item => item._id !== id));
                setShowDeletePrompt(false);
                break;
            }
            case 'all': {
                fetcher('/tasks', "DELETE", null, {accessToken: user?.accessToken});
                setData(data => data.filter(item => item.status === 'active'));
                setShowDeletePrompt(false);
                break;
            }
        }
    }

    const DeletePrompt = () => {
        return (
            <div className="modal-overlay">
                <div className="delete-modal">
                    <h2>{id !== null ? "Delete this task?" : "Delete all completed tasks?"}</h2>
                    <p className="subtitle">
                        This action cannot be undone 💔
                    </p>

                    <div className="delete-actions">
                        <button className="cancel-btn" onClick={onNoClick}>
                            Cancel
                        </button>
                        <button className="delete-btn" onClick={onYesClick}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return {
        DeletePrompt: showDeletePrompt ? <DeletePrompt /> : '',
        onDeleteClick
    }
}