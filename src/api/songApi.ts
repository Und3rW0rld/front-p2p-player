
import { Song } from "../types";

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/song";

// Configuración de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


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

        const response = await api.post("/upload", formData, {
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

// Improved postSong function with better error handling and debugging
export const postSong = async (
    song: Song,
    file: File | null
): Promise<Song> => {
    console.log("postSong called with:", { song, fileProvided: !!file });
    
    try {
        const storedUser = localStorage.getItem("user"); 
        console.log("Stored user:", storedUser);
        
        const username = storedUser ? JSON.parse(storedUser).username : "Unknown User";
        
        // Create DTO with available information
        const createSongDto: CreateSongDto = {
            title: song.title || "Unknown Title",
            username,
            size: song.fileSize || (file ? `${file.size} bytes` : "Unknown size"),
            fileName: file ? file.name : `song-${song.id}.mp3`,
            fileUrl: `http://localhost:8080/api/song/${encodeURIComponent(file ? file.name : song.id)}`,
        };
        
        console.log("Sending POST request to /api/song with data:", createSongDto);
        
        // Log request configuration before sending
        console.log("API base URL:", api.defaults.baseURL);
        console.log("Request headers:", api.defaults.headers);
        
        const response = await api.post<Song>("/api/song", createSongDto);
        console.log("Response received:", response.data);
        
        return response.data;
    } catch (error: any) {
        console.error("Error posting song:", error);
        
        // Log more detailed error information
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received. Request:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request:", error.message);
        }
        
        throw error;
    }
};


export const getUserById = async (id: string) => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

export const uploadUserImage = async (image: File) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await api.post(`/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading user image:", error);
        throw error;
    }
};

export const updateUser = async (id: string, data: any) => {
    try {
        const response = await api.patch(`/user/${id}`, data);
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
        console.log("User updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}




