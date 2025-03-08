import api from "./apiService";
import { Song } from "../types";

// Fetch all songs with optional filters
export const fetchSongs = async (filters?: Record<string, string>) => {
    try {
        const response = await api.get("/songs", { params: filters });
        return response.data as Song[];
    } catch (error) {
        console.error("Error fetching songs:", error);
        throw error;
    }
};

// Upload a new song file
export const uploadSong = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("song", file);

        const response = await api.post("/songs/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading song:", error);
        throw error;
    }
};

// Create a new song entry
export const createSong = async (songData: Partial<Song>) => {
    try {
        const response = await api.post("/songs", songData);
        return response.data;
    } catch (error) {
        console.error("Error creating song:", error);
        throw error;
    }
};

// Delete a song by ID
export const deleteSong = async (songId: string) => {
    try {
        await api.delete(`/songs/${songId}`);
    } catch (error) {
        console.error("Error deleting song:", error);
        throw error;
    }
};

interface CreateSongDto {
    title: string;
    username: string;
    size: string;
    fileName: string;
    fileUrl: string;
}

// Updated postSong function - doesn't try to use React hooks
export const postSong = async (
    song: Song,
    file: File | null
): Promise<Song> => {
    try {
        const storedUser = localStorage.getItem("user"); 
        const username = storedUser ? JSON.parse(storedUser).username : "Unknown User";

        // Create DTO with available information
        const createSongDto: CreateSongDto = {
            title: song.title || "Unknown Title",
            username,
            size: song.fileSize || (file ? `${file.size} bytes` : "Unknown size"),
            fileName: file ? file.name : `song-${song.id}.mp3`,
            fileUrl: `http://localhost:8080/api/song/${encodeURIComponent(file ? file.name : song.id)}`,
        };

        const response = await api.post<Song>("/api/song", createSongDto);
        return response.data;
    } catch (error) {
        console.error("Error posting song:", error);
        throw error;
    }
};