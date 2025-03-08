import { BiX } from "react-icons/bi";
import "./FriendItem.css";

interface FriendItemProps {
    avatar: string;
    username: string;
    onRemove: () => void;
}

export default function FriendItem({ avatar, username, onRemove }: FriendItemProps) {
    return (
        <div className="friend-item">
            <img src={avatar} alt={username} className="friend-avatar" />
            <div className="friend-info">
                <p className="friend-username">{username}</p>
            </div>
            <button className="friend-remove-btn" onClick={onRemove}>
                <BiX size={18} />
            </button>
        </div>
    );
}
