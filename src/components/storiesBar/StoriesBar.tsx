import { useNavigate } from "react-router-dom";
import { useStories } from "../../context/StoriesContext";
import addIcon from "../../assets/icons/add-story.svg";
import UserProfMockImg from "../../assets/img/userProfilePicMock.jpg";
import StoryAvatar from "./StoryAvatar";
import "./StoriesBar.css";

const StoriesBar: React.FC = () => {
    const { selectedStory, setSelectedStory, stories, users } = useStories();
    const navigate = useNavigate();

    const handleStoryClick = (storyId: string) => {
        setSelectedStory(storyId);
        navigate(`/stories/${storyId}`);
    };

    const handleAddStory = () => {
        setSelectedStory("me");
        navigate("/stories");
    }

    return (
        <div className="stories-bar-container">
            <div className="stories-bar">
                {/* Avatar del usuario actual */}
                <div className="story">
                    <div className="avatar-wrapper">
                        <StoryAvatar key="me" image={UserProfMockImg} isSelected={selectedStory === "me"} onClick={handleAddStory} />
                        <img src={addIcon} alt="Add Story" className="add-story-icon" />
                    </div>
                    <p className="story-text">You</p>
                </div>

                {/* Divider */}
                <div className="story-divider"></div>

                {/* Renderizar las historias */}
                {stories.map((story) => {
                    const user = users[story.idUser];

                    return (
                        <div key={story.idUser} className="story">
                            <StoryAvatar
                                image={user?.image || UserProfMockImg}
                                isSelected={selectedStory === story.idUser}
                                onClick={() => handleStoryClick(story.idUser)}
                            />
                            <p className="story-text">{user?.userName || "Unknown"}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StoriesBar;
