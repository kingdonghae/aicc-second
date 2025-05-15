import { postLogin, postKakaoLogin } from '../api/PostLoginApi';
import { jwtDecode } from 'jwt-decode';
import { saveToken } from '@/utils/authService';

export const login = async (data) => {
  try {
    const response = await postLogin(data);
    const token = response.data.token;
    const userInfo = jwtDecode(token);
    saveToken(token);

    return {
      token,
      user: userInfo,
    };
  } catch (error) {
    throw error.response?.data?.error || '로그인 요청 중 에러 발생';
  }
};

export const kakaoLogin = async () => {
  if (!window.Kakao) {
    throw new Error('Kakao SDK가 로드되지 않았습니다.');
  }

  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: async (authObj) => {
        try {
          const res = await postKakaoLogin(authObj.access_token);
          const token = res.data.token;
          const decoded = jwtDecode(token);
          saveToken(token);
          resolve({ token, decoded });
        } catch (err) {
          console.error('📛 Kakao login API 실패', err);
          reject(err.response?.data?.error || '서버 요청 실패');
        }
      },
      fail: (err) => {
        console.error('❌ Kakao SDK 로그인 실패', err);
        reject('카카오 로그인 실패');
      },
    });
  });
};
