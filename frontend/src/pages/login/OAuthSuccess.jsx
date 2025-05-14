import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // ✅ 여기 수정
import { useNavigation } from '@/hook/useNavigation';

const OAuthSuccess = () => {
    const [params] = useSearchParams();
    const { goHome, goLogin } = useNavigation();

    useEffect(() => {
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token); // ✅ 여기도 수정
            const username = decoded.username || '사용자';

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
