import { useNavigate } from "react-router-dom";
import "./NavigationButtons.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface NavigationButtonsProps {
    prevUserId: string | null;
    nextUserId: string | null;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ prevUserId, nextUserId }) => {
    const navigate = useNavigate();

    return (
        <div className="navigation-buttons">
            {prevUserId && (
                <button className="nav-button left" onClick={() => navigate(`/stories/${prevUserId}`)}>
                    <FaChevronLeft />
                </button>
            )}
            {nextUserId && (
                <button className="nav-button right" onClick={() => navigate(`/stories/${nextUserId}`)}>
                    <FaChevronRight />
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;
