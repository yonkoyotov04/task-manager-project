import { useState } from "react";
import { useNavigate } from "react-router";

export default function useLocalStorage(initialValue, key) {
    const navigate = useNavigate();
    const [state, setState] = useState(() => {
        const storedData = localStorage.getItem(key);

        if (!storedData || storedData === undefined) {
            navigate('/login')
            return initialValue;
        }

        return JSON.parse(storedData);
    })

    const setPersistedState = (data) => {
        localStorage.setItem(key, JSON.stringify(data));
        setState(data);
    }

    return [
        state,
        setPersistedState
    ]
}