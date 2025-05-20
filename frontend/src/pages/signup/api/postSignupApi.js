import apiClient from "@/api/ApiClient";

export const postSignup = (userData) => {
    return apiClient.post('/signup', userData);
};

export const getCheckEmail = (email) => {
    return apiClient.get('/signup/check', {
        params: { email: email.trim() }
    });
};

export const postDetailUserInfo = (userId, updatedData) => {
    return apiClient.patch(`/signup/${userId}`, updatedData);
  };
