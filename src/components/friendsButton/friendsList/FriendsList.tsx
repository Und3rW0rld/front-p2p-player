import React, { useState, useEffect } from "react";
import usersData from "../../../assets/mocks/users.json";
import FriendItem from "../../../components/friendsButton/friendItems/FriendItem";
import FriendRequestItem from "../../../components/friendsButton/friendItems/FriendRequestItem";
import SearchBar from "../../search-bar/SearchBar";
import { User as UserTypes } from "../../../types";
import "./FriendsList.css";

const FriendsList = () => {
    const [friends, setFriends] = useState<UserTypes[]>([]);
    const [friendRequests, setFriendRequests] = useState<UserTypes[]>([]);

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

    return (
        <div className="friends-menu">
            <div className="friends-header">
                <h1>Friends</h1>
                <SearchBar placeholder="Search" onSearch={() => { }} />
            </div>
            <div className="friends-list">
                {friends.length > 0 ? (
                    friends.map(user => (
                        <FriendItem
                            key={user.userName}
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
                {friendRequests.length > 0 ? (
                    friendRequests.map(user => (
                        <FriendRequestItem
                            key={user.userName}
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
        </div>
    );
};

export default FriendsList;
