import { BiCheck, BiX } from "react-icons/bi";
import "./FriendRequestItem.css";

interface FriendRequestItemProps {
    avatar: string;
    username: string;
    onAccept: () => void;
    onReject: () => void;
}

export default function FriendRequestItem({ avatar, username, onAccept, onReject }: FriendRequestItemProps) {
    return (
        <div className="friend-item">
            <img src={avatar} alt={username} className="friend-avatar" />
            <div className="friend-info">
                <p className="friend-username">{username}</p>
            </div>
            <div className="friend-request-actions">
                <button className="friend-accept-btn" onClick={onAccept}>
                    <BiCheck size={18} />
                </button>
                <button className="friend-reject-btn" onClick={onReject}>
                    <BiX size={18} />
                </button>
            </div>
        </div>
    );
}
