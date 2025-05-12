import apiClient from '@/api/apiClient';

export const postLogin = (data) => {
    return apiClient.post('/login', data);
};