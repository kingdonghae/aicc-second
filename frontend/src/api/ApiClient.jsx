import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
