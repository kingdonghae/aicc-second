import { postLogin, postKakaoLogin } from '../api/PostLoginApi';

export const login = async (data) => {
    try {
        const response = await postLogin(data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || '로그인 요청 중 에러 발생';
    }
};

import { jwtDecode } from 'jwt-decode';
import { saveToken } from '@/utils/authService';

export const kakaoLogin = async () => {
  if (!window.Kakao) {
    throw new Error('Kakao SDK가 로드되지 않았습니다.');
  }

  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: async (authObj) => {
        try {
          const res = await postKakaoLogin(authObj.access_token);
          const token = res.data.token;
          const decoded = jwtDecode(token);
          saveToken(token);
          resolve({ token, decoded });
        } catch (err) {
          reject(err.response?.data?.error || '서버 요청 실패');
        }
      },
      fail: (err) => {
        reject('카카오 로그인 실패');
      },
    });
  });
};
