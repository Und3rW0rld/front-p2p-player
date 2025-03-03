import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Main from "./views/MainPage/Main";
import UserPage from './views/UserView/UserPage'
import FriendProfilePage from "./views/FriendProfile/FriendProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/friendProfile" element={<FriendProfilePage/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
