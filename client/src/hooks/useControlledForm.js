import { useContext, useEffect, useState } from "react";
import ErrorContext from "../contexts/ErrorContext.jsx";

export default function useControlledForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues)
    const {errorSetter} = useContext(ErrorContext);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues])

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(values)
        } catch (error) {
            errorSetter(error.message);
            throw error.message;
        }
    }

    return {
        values, changeHandler, submitHandler
    }
}