import { useNavigation } from '@/hook/useNavigation';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "@/hook/useAuth.js";
import { useShowModal } from "@/utils/showModal.js";

const OAuthSuccess = () => {
    const { login } = useAuth();
    const [params] = useSearchParams();
    const showModal = useShowModal();
    const { goSignup, goHome, goLogin } = useNavigation();

    useEffect(() => {
        const token = params.get('token');

        if (token) {
            const decoded = jwtDecode(token);

            if (decoded.agree_privacy === 0 || decoded.agree_privacy === null) {
                sessionStorage.setItem('tempToken', token);
                goSignup();
                return;
            }

            const username = decoded.username || '사용자';
            login(decoded, token);
            showModal({
                title: '',
                message: `${username} 님 환영합니다!`,
                onConfirm: goHome,
            });

        } else {
            showModal({
                title: '로그인 실패',
                message: `유효한 토큰이 존재하지 않습니다.`,
                onConfirm: goLogin,
            });
        }
    }, []);
};

export default OAuthSuccess;
