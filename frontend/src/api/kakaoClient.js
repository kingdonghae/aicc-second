import axios from 'axios';

const kakaoClient = axios.create({
    baseURL: 'https://dapi.kakao.com/',
    headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_ADMIN_KEY}`,
        'Content-Type': 'application/json',
    },
});

export default kakaoClient;
