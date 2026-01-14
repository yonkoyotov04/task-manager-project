import Header from './Header.jsx'
import ActiveTasks from './ActiveTasks.jsx'
import CompletedTasks from './CompletedTasks.jsx'

export default function MainPage() {
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