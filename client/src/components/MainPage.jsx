import Header from './Header.jsx'
import ActiveTasks from './ActiveTasks.jsx'
import CompletedTasks from './CompletedTasks.jsx'
import { useState } from 'react'
import TaskForm from './TaskForm.jsx';
import useFetch from '../hooks/useFetch.js';
import EditForm from './EditForm.jsx';
import EditUsername from './EditUsername.jsx'

export default function MainPage() {

    const [taskFormActive, setTaskFormActive] = useState(false);
    const [editedTask, setEditedTask] = useState(null);
    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [tasks, setTasks] = useState([]);
    useFetch('/tasks', setTasks);

    return (
        <>
            <Header editUsernameSetter={setEditUsername} editPasswordSetter={setEditPassword} />
            <main className='container'>
                {taskFormActive ? <TaskForm formSetter={setTaskFormActive} tasks={tasks} taskSetter={setTasks} /> : ''}
                {editedTask !== null ? <EditForm task={editedTask} onEdit={setEditedTask} taskSetter={setTasks}/> : ''}
                {editUsername ? <EditUsername onClose={() => setEditUsername(false)} /> : ''}
                <ActiveTasks formSetter={setTaskFormActive} onEdit={setEditedTask} tasks={tasks} taskSetter={setTasks} />
                <CompletedTasks tasks={tasks} taskSetter={setTasks} />
            </main>
        </>
    )
}