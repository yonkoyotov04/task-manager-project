import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './contexts/userContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <UserProvider >
            <App />
        </UserProvider>
    </BrowserRouter>
)
