import { Story } from "../../types";
import usersData from "../../assets/mocks/users.json";
import songs from "../../assets/mocks/songs.json";
import "./StoryViewer.css";

interface StoryViewerProps {
    story: Story;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
    const user = usersData[story.idUser as keyof typeof usersData] || {
        userName: "Usuario desconocido",
        image: "/assets/img/default-user.jpg",
    };

    const song = story.idSong
        ? songs[story.idSong as keyof typeof songs] || { name: "Canción desconocida", author: "Artista desconocido" }
        : null;

    return (
        <div className="story-viewer-container">
            <div className="story-viewer">
                <img src={story.image || "/assets/img/default-story.jpg"} alt="Story" className="story-image" />
                <div className="story-info">
                    <img src={user.image} alt={user.userName} className="user-avatar" />
                    <div>
                        <p className="user-name">{user.userName}</p>
                    </div>
                </div>
                {song && (
                    <div className="story-music">
                        <img src={song.image} alt={song.name} className="song-story-image" />
                        <div className="song-info">
                            <p className="song-title">{song.name}</p>
                            <p className="song-artist">{song.author}</p>
                            <p className="song-album">{song.album}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>);
};

export default StoryViewer;
