import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { StoriesProvider } from "./context/StoriesContext";
import { FileProvider } from "./providers/FileProvider";
import "./App.css";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Main from "./views/MainPage/Main";
import UserPage from './views/UserView/UserPage'
import StoriesPage from "./views/StoriesPages/StoriesPage";
import StoriesPostPage from "./views/StoriesPages/StoriesPostPage";
import FriendProfilePage from "./views/FriendProfile/FriendProfile";
import SettingView from "./views/SettingsView/SettingsView";
import SearchSong from "./views/SearchSong/SearchSong";
import NavBar from "./components/navBar/navBar";
import { useEffect } from "react";
import MainPlayer from "./views/MainPlayer/MainPlayer";
import Player from "./components/player/player";

function Layout() {
  const location = useLocation();
  const noNavBarRoutes = ["/login", "/register"];
  const noPlayerRoutes = ["/login", "/register", "/player"];
  const hideNavBar = noNavBarRoutes.includes(location.pathname);
  const hidePlayer = noPlayerRoutes.includes(location.pathname);

  useEffect(() => {
    document.body.classList.toggle("no-navbar", hideNavBar);
  }, [hideNavBar]);

  return (
    <div className="app-container">
      {!hideNavBar && <NavBar />}
      {!hidePlayer && <Player />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/stories" element={< StoriesPostPage />} />
          <Route path="/stories/:idUser" element={<StoriesPage />} />
          <Route path="/friendProfile" element={<FriendProfilePage />} />
          <Route path="/searchSong" element={<SearchSong />} />
          <Route path="/settings" element={<SettingView />} />
          <Route path="/player" element={<MainPlayer />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FileProvider>
        <StoriesProvider>
          <Layout />
        </StoriesProvider>
      </FileProvider>
    </BrowserRouter>
  );
}

export default App;
