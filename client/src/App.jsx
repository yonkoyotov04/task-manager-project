import Login from './components/Login.jsx'
import { Routes, Route } from 'react-router'
import MainPage from './components/MainPage.jsx'
import AuthRoutes from './utils/AuthRoutes.jsx'
import Register from './components/Register.jsx'
import QuoteForm from './components/QuoteForm.jsx'
import { useContext } from 'react'
import UserContext from './contexts/UserContext.jsx'

function App() {

    const {user} = useContext(UserContext);
    
    return (
        <div className={`app theme-${user?.theme}`}>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<AuthRoutes />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/quote" element={<QuoteForm />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
