import { useContext, useState } from 'react'
import Login from './components/Login.jsx'
import { Routes, Route } from 'react-router'
import MainPage from './components/MainPage.jsx'
import UserContext from './contexts/userContext.jsx'
import AuthRoutes from './utils/AuthRoutes.jsx'
import Register from './components/Register.jsx'


function App() {
    const [count, setCount] = useState(0)
    const { user } = useContext(UserContext);

    console.log(user);

    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<AuthRoutes />}>
                    <Route path="/" element={<MainPage/>} />
                </Route>
            </Routes>
        </>

    )
}

export default App
