import apiClient from '@/api/apiClient';

export const postLogin = (data) => {
    return apiClient.post('/login', data);
};

export const postKakaoLogin = (access_token) => {
    return apiClient.post('/social/kakao', { access_token });
  };