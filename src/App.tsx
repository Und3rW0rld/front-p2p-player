import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Main from "./views/MainPage/Main";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
