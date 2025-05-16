import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@/hook/useNavigation';
import { useAuth } from "@/hook/useAuth.js";
import { saveToken } from "@/utils/authService.js";


const OAuthSuccess = () => {
    const { login } = useAuth();
    const [params] = useSearchParams();
    const { goHome, goLogin } = useNavigation();

    useEffect(() => {
        const token = params.get('token');

        if (token) {
            const decoded = jwtDecode(token);
            const username = decoded.username || '사용자';

            login(username, token);

            alert(`${username}님 로그인 완료되었습니다.`);
            goHome();
        } else {
            alert('로그인에 실패했습니다.');
            goLogin();
        }
    }, []);

    return <p>로그인 중입니다...</p>;
};

export default OAuthSuccess;
