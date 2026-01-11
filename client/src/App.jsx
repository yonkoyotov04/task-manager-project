import { useState } from 'react'
import Header from './components/Header.jsx'
import ActiveTasks from './components/ActiveTasks.jsx'
import CompletedTasks from './components/CompletedTasks.jsx'


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header />
            <main className='container'>

                <ActiveTasks />
                <CompletedTasks />
            </main>
        </>

    )
}

export default App
