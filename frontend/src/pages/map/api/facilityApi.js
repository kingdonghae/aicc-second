
import apiClient from "@/api/apiClient.js";

export const fetchFacilities = () => {
  return apiClient.get('/facilities');
};
