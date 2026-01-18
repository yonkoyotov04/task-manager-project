import Header from './Header.jsx'
import ActiveTasks from './ActiveTasks.jsx'
import CompletedTasks from './CompletedTasks.jsx'
import { useState } from 'react'
import TaskForm from './TaskForm.jsx';
import useFetch from '../hooks/useFetch.js';

export default function MainPage() {

    const [taskFormActive, setTaskFormActive] = useState(false);

    const [tasks, setTasks] = useState([]);
    useFetch('/tasks', setTasks);

    return (
        <>
            <Header />
            <main className='container'>
                {taskFormActive ? <TaskForm formSetter={setTaskFormActive} tasks={tasks} taskSetter={setTasks} /> : ''}
                <ActiveTasks formSetter={setTaskFormActive} tasks={tasks} taskSetter={setTasks} />
                <CompletedTasks tasks={tasks} taskSetter={setTasks} />
            </main>
        </>
    )
}