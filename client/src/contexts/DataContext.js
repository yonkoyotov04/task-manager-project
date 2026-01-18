import { createContext } from "react";

const DataContext = createContext({
    taskData: [],
    setTaskData () {}
})

export default DataContext;