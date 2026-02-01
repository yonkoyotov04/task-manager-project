import { useContext, useState } from 'react'
import Login from './components/Login.jsx'
import { Routes, Route } from 'react-router'
import MainPage from './components/MainPage.jsx'
import AuthRoutes from './utils/AuthRoutes.jsx'
import Register from './components/Register.jsx'
import QuoteForm from './components/QuoteForm.jsx'

function App() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<AuthRoutes />}>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/quote" element={<QuoteForm/>} />
                </Route>
            </Routes>
        </>

    )
}

export default App
