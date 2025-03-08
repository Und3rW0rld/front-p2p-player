import { useState } from "react";
import "./FriendsButton.css";
import FriendsList from "../friendsButton/friendsList/FriendsList";
import { FaUserFriends } from "react-icons/fa";

const FriendsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFriendsList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`friends-container`} >
      <button className="friends-button" onClick={toggleFriendsList}>
        <FaUserFriends size={24} />
      </button>

      <div className={`friends-panel ${isOpen ? "open" : "closed"}`}>
        <FriendsList />
      </div>
    </div>
  );
};

export default FriendsButton;
