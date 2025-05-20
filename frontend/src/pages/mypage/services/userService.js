
import { fetchUserInfo, updateUserInfo } from '../api/userapi.js';

export const getUserInfo = async (userId) => {
  try {
    const response = await fetchUserInfo(userId);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || '사용자 정보 불러오기 실패';
  }
};

export const patchUserInfo = async (userId, updatedData) => {
  try {
    const response = await updateUserInfo(userId, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || '사용자 정보 수정 실패';
  }
};
