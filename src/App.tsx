import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoriesProvider } from "./context/StoriesContext";
import "./App.css";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Main from "./views/MainPage/Main";
import UserPage from './views/UserView/UserPage'
import StoriesPage from "./views/StoriesPages/StoriesPage";
import StoriesPostPage from "./views/StoriesPages/StoriesPostPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <StoriesProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/main" element={<Main />} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/stories" element={< StoriesPostPage />} />
            <Route path="/stories/:idUser" element={<StoriesPage />} />
          </Routes>
        </StoriesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
