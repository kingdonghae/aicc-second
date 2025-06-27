import apiClient from "@/api/apiClient";

export const fetchCustom = async (data) => {
    return await apiClient.post('/custom/api', data);
};