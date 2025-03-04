import { useParams, useNavigate } from "react-router-dom";
import StoriesBar from "../../components/storiesBar/StoriesBar";
import StoryViewer from "../../components/storiesBar/StoryViewer";
import NavigationButtons from "../../components/storiesBar/NavigationButtons";
import { Story as StoryType } from "../../types";
import Button from "../../components/button/Button";
import stories from "../../assets/mocks/stories.json";
import songs from "../../assets/mocks/songs.json";
import "./StoriesPage.css";

const StoriesPage = () => {
    const navigate = useNavigate();
    const { idUser } = useParams();
    const storyKeys = Object.keys(stories);
    const currentIndex = storyKeys.indexOf(idUser || "");

    const prevUserId = currentIndex > 0 ? storyKeys[currentIndex - 1] : null;
    const nextUserId = currentIndex < storyKeys.length - 1 ? storyKeys[currentIndex + 1] : null;
    const story = idUser ? (stories[idUser as keyof typeof stories] as StoryType) : null;
    const songName = story?.idSong ? songs[story.idSong as keyof typeof songs]?.name || "Unknown" : "Unknown";

    if (!story) {
        return <p className="error-message">Historia no encontrada.</p>;
    }

    const handleSearchSong = () => {
        navigate(`/searchSong`, { state: { songName } });
    };


    return (
        <>
            <StoriesBar />
            <div className="stories-page-container">
                <StoryViewer story={story} />
                <Button label="Search this song" onClick={handleSearchSong} />
                <NavigationButtons prevUserId={prevUserId} nextUserId={nextUserId} />
            </div>
        </>
    );
};

export default StoriesPage;
