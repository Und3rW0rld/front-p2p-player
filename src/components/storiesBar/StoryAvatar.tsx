import { User } from "../../types"
import "./StoryAvatar.css"
import { useLocation } from "react-router-dom"

interface StoryAvatarProps {
    image: User["image"]
    isSelected: boolean
    onClick?: () => void
}

const StoryAvatar: React.FC<StoryAvatarProps> = ({ image, isSelected, onClick }) => {
    // si la ruta actual es /stories o /stories/#, entonces se deselecciona el avatar
    const location = useLocation();
    const isStoryRoute = /^\/stories(\/\d+)?$/.test(location.pathname);

    return (
        <div className="story-avatar-container">
            <div className={`story-avatar ${isSelected && isStoryRoute ? "selected" : ""}`} onClick={onClick}>
                <img src={image} alt="Story avatar" className="story-avatar-image" />
            </div>
        </div>
    )
}

export default StoryAvatar