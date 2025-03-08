import { createContext, useContext, useEffect, useState } from "react";
import { Story, User } from "../types";
import storiesData from "../assets/mocks/stories.json";
import usersData from "../assets/mocks/users.json";

interface StoriesContextType {
    selectedStory: string | null;
    setSelectedStory: (storyId: string | null) => void;
    stories: Story[];
    users: User[];
}

const StoriesContext = createContext<StoriesContextType | undefined>(undefined);

export const StoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [stories, setStories] = useState<Story[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        console.log(storiesData);
        setStories(storiesData);
        setUsers(usersData);
    }, []);

    return (
        <StoriesContext.Provider value={{ selectedStory, setSelectedStory, stories, users }}>
            {children}
        </StoriesContext.Provider>
    );
};

export const useStories = () => {
    const context = useContext(StoriesContext);
    if (!context) {
        throw new Error("useStories must be used within a StoriesProvider");
    }
    return context;
};
