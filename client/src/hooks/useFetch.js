import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext.jsx"
import { useNavigate } from "react-router";

const baseURL = 'http://localhost:2406'

export default function useFetch(url, setData, refreshData) {
    const {isAuthenticated, user, logoutHandler} = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refresher = () => {
        setRefresh(state => !state);
    }

    const fetcher = async (url, method, data, config={}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json'
            }
            options.body = JSON.stringify(data);
        }

        if (isAuthenticated || config.accessToken) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user?.accessToken
            }
        }

        const response = await fetch(`${baseURL}${url}`, options);

        if (!response.ok) {
            if (response.statusText === "Unauthorized") {
                logoutHandler();
                navigate('/login');
            }
            throw response.statusText;
        }

        const result = response.json();
        return result;
    }

    useEffect(() => {
        if (!url) {
            return
        }

        setIsLoading(true);

            fetcher(url)
            .then(result => setData(result))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }, [url, refresh, refreshData])

    return {
        fetcher, isLoading, refresher
    };
}