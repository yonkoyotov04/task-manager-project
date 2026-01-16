import Header from './Header.jsx'
import ActiveTasks from './ActiveTasks.jsx'
import CompletedTasks from './CompletedTasks.jsx'
import { useState } from 'react'
import TaskForm from './TaskForm.jsx';

export default function MainPage() {

    const [taskFormActive, setTaskFormActive] = useState(false);

    return (
        <>
            <Header />
            <main className='container'>
                {taskFormActive ? <TaskForm formSetter={setTaskFormActive}/> : ''}

                <ActiveTasks formSetter={setTaskFormActive}/>
                <CompletedTasks />
            </main>
        </>
    )
}