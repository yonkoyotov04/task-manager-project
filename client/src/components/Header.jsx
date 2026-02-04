import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext.jsx"
import useFetch from "../hooks/useFetch.js"
import SettingsMenu from "./SettingsMenu.jsx";

export default function Header({editUsernameSetter, editPasswordSetter}) {

    const { fetcher } = useFetch();
    const { user, logoutHandler } = useContext(UserContext);
    const [quote, setQuote] = useState('');
    const [visible, setVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const showQuote = Math.random() < 0.25;
            const rightEmail = user?.email === 'elena.stiliyanova07@gmail.com' || user?.email === 'jjotov488@gmail.com';

            if (showQuote && rightEmail) {
                const randomQuote = await fetcher('/quotes', 'GET', null, { accessToken: user?.accessToken });

                setQuote(randomQuote);
                setVisible(true);

                setTimeout(() => {
                    setVisible(false);
                }, 10000)
            }
        }, 60000)

        return () => clearInterval(interval);
    }, [])

    return (
        <header>
            <div className="quote" style={{opacity: visible ? 1 : 0}}>{quote}</div>
            <div className="user">
                <span>{user?.username}</span>
                <div className="settingsWrapper">
                    <button className="settingsButton" onClick={() => {setShowSettings(prev => !prev)}}>⚙️</button>
                    {showSettings && <SettingsMenu editUsername={editUsernameSetter} editPassword={editPasswordSetter} />}
                </div>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </header>
    )
}