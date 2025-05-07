
import apiClient from 'C:/Users/jy_ed/Desktop/aicc-second/frontend/src/api/ApiClient';

export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/signup/', userData);
    return response.data;  // { message: "...", error: "..." }
  } catch (error) {
    // 에러 처리: 백엔드가 보낸 에러 메시지가 있을 경우
    throw error.response?.data?.error || '회원가입 요청 중 에러 발생';
  }
};

export const checkUserid = async (userid) => {
  try {
    const response = await apiClient.get('signup/check', {
      params: { userid: userid.trim() }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || '중복 확인 중 에러 발생';
  }
};