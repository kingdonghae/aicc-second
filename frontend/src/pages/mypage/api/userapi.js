// src/api/userapi.js
import apiClient from '@/api/apiClient';

export const fetchUserInfo = (userId) => {
  return apiClient.get(`/user/${userId}`);
};

export const  updateUserInfo = (userId, updatedData) => { 
  return apiClient.patch(`/user/${userId}`, updatedData);
};
