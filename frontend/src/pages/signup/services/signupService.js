
import { postSignup, getCheckEmail } from '../api/postSignupApi';

export const signup = async (userData) => {
    try {
        const response = await postSignup(userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || '회원가입 요청 중 에러 발생';
    }
};

export const checkEmail = async (email) => {
    try {
        const response = await getCheckEmail(email);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || '중복 확인 중 에러 발생';
    }
};
