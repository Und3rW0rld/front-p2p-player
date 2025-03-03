import { User } from "../../types"
import "./StoryAvatar.css"

interface StoryAvatarProps {
    image: User["image"]
    isSelected: boolean
    onClick?: () => void
}

const StoryAvatar: React.FC<StoryAvatarProps> = ({ image, isSelected, onClick }) => {

    return (
        <div className={`story-avatar ${isSelected ? "selected" : ""}`} onClick={onClick}>
            <img src={image} alt="Story avatar" className="story-avatar-image" />
        </div>
    )
}

export default StoryAvatar