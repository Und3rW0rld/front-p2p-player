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
