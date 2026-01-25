import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext.jsx"
import useFetch from "../hooks/useFetch.js"

export default function Header() {

    const { fetcher } = useFetch();
    const { user, logoutHandler } = useContext(UserContext);
    const [quote, setQuote] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const showQuote = Math.random() < 0.25;

            if (showQuote) {
                const randomQuote = await fetcher('/quotes', 'GET', null, { accessToken: user?.accessToken });

                setQuote(randomQuote);
                setVisible(true);

                setTimeout(() => {
                    setVisible(false);
                }, 10000)
            }
        }, 5000)

        return () => clearInterval(interval);
    }, [])

    return (
        <header>
            <div className="quote" style={{opacity: visible ? 1 : 0}}>{quote}</div>
            <div className="user">
                <span>{user?.username}</span>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </header>
    )
}