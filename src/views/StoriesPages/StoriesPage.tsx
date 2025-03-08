import { useParams, useNavigate } from "react-router-dom";
import StoriesBar from "../../components/storiesBar/StoriesBar";
import StoryViewer from "../../components/storiesBar/StoryViewer";
import NavigationButtons from "../../components/storiesBar/NavigationButtons";
import { Story as StoryType, Song as SongType } from "../../types";
import Button from "../../components/button/Button";
import storiesData from "../../assets/mocks/stories.json";
import songsData from "../../assets/mocks/songs.json";
import "./StoriesPage.css";

const StoriesPage = () => {
    const navigate = useNavigate();
    const { idUser } = useParams();

    // 🔹 Tipar `stories` correctamente
    const storiesArray = storiesData as StoryType[];
    const stories: Record<string, StoryType> = storiesArray.reduce((acc, story) => {
        acc[story._id] = story; // Usamos `_id` como clave en el objeto
        return acc;
    }, {} as Record<string, StoryType>);
    const storyList = Object.values(stories);

    // 🔹 Buscar la historia con el `_id`
    const story = storyList.find((s) => s._id === idUser) || null;

    // 🔹 Si la historia no existe, mostramos un mensaje de error
    if (!story) {
        return <p className="error-message">Historia no encontrada.</p>;
    }

    // 🔹 Obtener índice de la historia actual en la lista
    const currentIndex = storyList.findIndex((s) => s._id === idUser);
    const prevUserId = currentIndex > 0 ? storyList[currentIndex - 1]._id : null;
    const nextUserId = currentIndex < storyList.length - 1 ? storyList[currentIndex + 1]._id : null;

    // 🔹 Manejo de canción
    const songsArray = songsData as SongType[];
    const songs: Record<string, SongType> = songsArray.reduce((acc, song) => {
        acc[song._id] = song; // Usamos `_id` como clave
        return acc;
    }, {} as Record<string, SongType>);
    const songData = songs[story.idSong] || null;
    const songName = songData?.title || "Unknown";

    const handleSearchSong = () => {
        navigate(`/searchSong`, { state: { songName } });
    };

    return (
        <>
            <StoriesBar />
            <div className="stories-page-container">
                <StoryViewer story={story} />
                <Button label="Search this song" onClick={handleSearchSong} icon="search" />
                <NavigationButtons prevUserId={prevUserId} nextUserId={nextUserId} />
            </div>
        </>
    );
};

export default StoriesPage;
