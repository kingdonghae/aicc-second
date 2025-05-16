import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@/hook/useNavigation';
import { useAuth } from "@/hook/useAuth.js";
import { useShowModal } from "@/utils/showModal.js";


const OAuthSuccess = () => {
    const { login } = useAuth();
    const [params] = useSearchParams();
    const { goHome, goLogin } = useNavigation();
    const showModal = useShowModal();
    useEffect(() => {
        const token = params.get('token');

        if (token) {
            const decoded = jwtDecode(token);
            const username = decoded.username || '사용자';

            login(username, token);
            showModal({
                title: '',
                message: `${username} 님 환영합니다!`,
                onConfirm: () => goHome(), // 확인 누르면 홈으로 이동
            });
            // alert(`${username}님 로그인 완료되었습니다.`);
            // goHome();
        } else {
            showModal({
                title: '로그인 실패',
                message: `유효한 토큰이 존재하지 않습니다.`,
                onConfirm: () => goLogin(), // 확인 누르면 홈으로 이동
            });
        }
    }, []);

};

export default OAuthSuccess;
