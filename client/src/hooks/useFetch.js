import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/UserContext.jsx"
import { useNavigate } from "react-router";
import ErrorContext from "../contexts/ErrorContext.jsx";
import { SERVER_URI } from "../config/constants.js";

const baseURL = SERVER_URI;
// 'http://localhost:2406'

export default function useFetch(url, setData) {
    const { isAuthenticated, user, loginHandler, logoutHandler } = useContext(UserContext);
    const {errorSetter} = useContext(ErrorContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refresher = () => {
        setRefresh(state => !state);
    }

    const refreshToken = async () => {
        const res = await fetch(`${baseURL}/refresh`, {
            method: "POST",
            credentials: 'include'
        })

        if (!res.ok) {
            return false;
        }

        const newToken = await res.json();
        const newData = {...user, accessToken: newToken};

        loginHandler(newData);
        return newToken;
    }

    const fetcher = async (url, method, data, config = {}) => {
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

        options.credentials = 'include';

        let response = await fetch(`${baseURL}${url}`, options);

        if (!response.ok) {
            if (response.status === 401) {
                const refreshed = await refreshToken();
                
                if (!refreshed) {
                    logoutHandler();
                    navigate('/login');
                    throw new Error('Session Expired');
                }

                options.headers = {
                    ...options.headers,
                    'X-Authorization': refreshed
                }

                response = await fetch(`${baseURL}${url}`, options);
            } else {
                errorSetter(response.statusText);
                throw response.statusText;
            }
        }

        const result = await response.json();
        return result;
    }

    useEffect(() => {
        if (!url) {
            return
        }

        setIsLoading(true);

        fetcher(url)
            .then(result => setData(result))
            .catch(error => errorSetter(error.message))
            .finally(() => setIsLoading(false))
    }, [url, refresh])

    return {
        fetcher, isLoading, refresher
    };
}