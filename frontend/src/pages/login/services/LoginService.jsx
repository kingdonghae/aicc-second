import { postLogin } from '../api/PostLoginApi';

export const login = async (data) => {
    try {
        const response = await postLogin(data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || '로그인 요청 중 에러 발생';
    }
};