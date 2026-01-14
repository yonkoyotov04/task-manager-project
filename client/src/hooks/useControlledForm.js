import { useEffect, useState } from "react";

export default function useControlledForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues)

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
            throw error.message;
        }
    }

    return {
        values, changeHandler, submitHandler
    }
}