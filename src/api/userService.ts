import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Configuración de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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






