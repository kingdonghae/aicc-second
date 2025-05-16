
import apiClient from "@/api/ApiClient";

// 회원가입 요청
export const postSignup = (userData) => {
    return apiClient.post('/signup', userData);
};

// 이메일 중복 확인 요청
export const getCheckEmail = (email) => {
    return apiClient.get('/signup/check', {
        params: { email: email.trim() }
    });
};

export const postDetailUserInfo = (userId, updatedData) => { 
    return apiClient.patch(`/signup/${userId}`, updatedData);
  };