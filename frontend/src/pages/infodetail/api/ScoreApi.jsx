import apiClient from "@/api/apiClient.js";

export const fetchSearchScore = ({ lat, lng }) => {
    return apiClient.post('/population', { lat, lng });
};