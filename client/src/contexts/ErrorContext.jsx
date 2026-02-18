import { createContext, useContext, useState } from "react";
import ErrorContainer from "../components/ErrorContainer.jsx";

const ErrorContext = createContext({
    error: null,
    errorSetter() { }
})

export function ErrorProvider({ children }) {

    const [error, setError] = useState(null);

    const errorSetter = (error) => {
        setError(error);

        setTimeout(() => {
            setError(null);
        }, "5000")
    }

    const contextValues = {
        error,
        errorSetter
    }

    return (
        <ErrorContext.Provider value={contextValues}>
            {children}
            {error && <ErrorContainer error={error} errorSetter={errorSetter} />}
        </ErrorContext.Provider>
    )
}

export default ErrorContext;