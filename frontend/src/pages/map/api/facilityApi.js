// frontend/src/pages/map/api/facilityApi.js
import apiClient from "@/api/apiClient.js";

export const fetchFacilities = () => {
  return apiClient.get('/facilities');
};
