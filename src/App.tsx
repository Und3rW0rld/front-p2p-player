import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import UserPage from './views/UserView/UserPage'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
