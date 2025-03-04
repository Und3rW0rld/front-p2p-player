import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoriesProvider } from "./context/StoriesContext";
import "./App.css";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Main from "./views/MainPage/Main";
import UserPage from './views/UserView/UserPage'
import StoriesPage from "./views/StoriesPages/StoriesPage";
import StoriesPostPage from "./views/StoriesPages/StoriesPostPage";
import FriendProfilePage from "./views/FriendProfile/FriendProfile";
import SearchSong from "./views/SearchSong/SearchSong";
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
            <Route path="/friendProfile" element={<FriendProfilePage />} />
            <Route path="/searchSong" element={<SearchSong />} />
          </Routes>
        </StoriesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;