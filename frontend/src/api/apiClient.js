import axios from 'axios';
import {ensureClientCookieId} from "@/utils/clientCookieId.js";

const client_id = ensureClientCookieId();

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: Number(import.meta.env.VITE_API_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
        'X-Client-ID': client_id,
    },
});

export default apiClient;
