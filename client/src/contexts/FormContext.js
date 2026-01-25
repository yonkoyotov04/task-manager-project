import { createContext } from "react";

const FormContext = createContext({
    addFormSetter() {},
    editFormSetter() {}
})

export default FormContext;