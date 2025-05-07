
import apiClient from "@/api/ApiClient";

// 회원가입 요청
export const postSignup = (userData) => {
    return apiClient.post('/signup', userData);
};

// 아이디 중복 확인 요청
export const getCheckUserid = (userid) => {
    return apiClient.get('/signup/check', {
        params: { userid: userid.trim() }
    });
};
