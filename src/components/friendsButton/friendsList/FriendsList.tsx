import { useState, useEffect } from "react";
import usersData from "../../../assets/mocks/users.json";
import FriendItem from "../../../components/friendsButton/friendItems/FriendItem";
import FriendRequestItem from "../../../components/friendsButton/friendItems/FriendRequestItem";
import SearchBar from "../../search-bar/SearchBar";
import { User as UserTypes } from "../../../types";
import "./FriendsList.css";

const FriendsList = () => {
    const [friends, setFriends] = useState<UserTypes[]>([]);
    const [friendRequests, setFriendRequests] = useState<UserTypes[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newFriendUserName, setNewFriendUserName] = useState(""); // Nuevo estado para el input

    useEffect(() => {
        // Filtrar datos simulando amigos y solicitudes
        const allUsers = Object.values(usersData);
        setFriends(allUsers.slice(0, 2)); // Los primeros 2 como amigos
        setFriendRequests(allUsers.slice(2)); // El resto como solicitudes
    }, []);

    const handleAccept = (userName: string) => {
        const acceptedFriend = friendRequests.find(user => user.userName === userName);
        if (acceptedFriend) {
            setFriends([...friends, acceptedFriend]);
            setFriendRequests(friendRequests.filter(user => user.userName !== userName));
        }
    };

    const handleReject = (userName: string) => {
        setFriendRequests(friendRequests.filter(user => user.userName !== userName));
    };

    const handleRemove = (userName: string) => {
        setFriends(friends.filter(user => user.userName !== userName));
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    const handleAddFriend = () => {
        if (!newFriendUserName.trim()) return;

        // Verificar si el usuario ya es amigo
        if (friends.some(user => user.userName === newFriendUserName)) {
            alert("This user is already in your friends list.");
            return;
        }

        // Crear nuevo amigo ficticio
        const newFriend: UserTypes = {
            _id: String(Date.now()), // ID único temporal
            userName: newFriendUserName,
            image: "https://robohash.org/mail@ashallendesign.co.uk", // Imagen temporal
            email: "userFake@web.co"
        };

        setFriends([...friends, newFriend]);
        setNewFriendUserName(""); // Limpiar input
    };

    const filteredFriends = friends.filter(user => user.userName.toLowerCase().includes(searchTerm));
    const filteredFriendRequests = friendRequests.filter(user => user.userName.toLowerCase().includes(searchTerm));

    return (
        <div className="friends-menu">
            <div className="friends-header">
                <h1>Friends</h1>
                <SearchBar placeholder="Search" onSearch={handleSearch} />
            </div>

            <div className="friends-list">
                {filteredFriends.length > 0 ? (
                    filteredFriends.map(user => (
                        <FriendItem
                            key={user._id}
                            avatar={user.image}
                            username={user.userName}
                            onRemove={() => handleRemove(user.userName)}
                        />
                    ))
                ) : (
                    <p>No friends yet.</p>
                )}
            </div>

            <h2>Friend Requests</h2>
            <div className="friend-requests-list">
                {filteredFriendRequests.length > 0 ? (
                    filteredFriendRequests.map(user => (
                        <FriendRequestItem
                            key={user._id}
                            avatar={user.image}
                            username={user.userName}
                            onAccept={() => handleAccept(user.userName)}
                            onReject={() => handleReject(user.userName)}
                        />
                    ))
                ) : (
                    <p>No friend requests.</p>
                )}
            </div>
            {/* Nuevo campo para agregar amigo */}
            <div className="add-friend-container">
                <input
                    type="text"
                    placeholder="Enter username"
                    value={newFriendUserName}
                    onChange={(e) => setNewFriendUserName(e.target.value)}
                />
                <button onClick={handleAddFriend}>Add Friend</button>
            </div>
        </div>
    );
};

export default FriendsList;
