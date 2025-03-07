import { FaHome, FaPlay, FaSearch, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UserProfMockImg from "../../assets/img/userProfilePicMock.jpg";
import "./NavBar.css"; // Estilos personalizados

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/userpage" className="nav-icon">
                        <img src={UserProfMockImg} alt="Profile 1" className="profile-img" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/main" className="nav-icon">
                        <FaHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/play" className="nav-icon">
                        <FaPlay />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/searchSong" className="nav-icon">
                        <FaSearch />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className="nav-icon">
                        <FaCog />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
