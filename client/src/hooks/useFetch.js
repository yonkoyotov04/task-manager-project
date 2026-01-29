import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext.jsx"
import { useNavigate } from "react-router";

const baseURL = 'http://localhost:2406'

export default function useFetch(url, setData, refreshData) {
    const { isAuthenticated, user, loginHandler, logoutHandler } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refresher = () => {
        setRefresh(state => !state);
    }

    const refreshToken = async () => {
        console.log('In refresh token function');
        const res = await fetch(`${baseURL}/refresh`, {
            method: "POST",
            credentials: 'include'
        })
        console.log(res)

        if (!res.ok) {
            return false;
        }

        const data = await res.json();
        console.log(data);
        loginHandler(data)
        return true;
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
                    'X-Authorization': user?.accessToken
                }

                response = await fetch(`${baseURL}${url}`, options);
                return response;
            } else {
                throw response.statusText;
            }
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
    }, [url, refresh])

    return {
        fetcher, isLoading, refresher
    };
}