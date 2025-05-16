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
            console.log("decoded: ", decoded);
            console.log("decoded.agree_privacy: ", decoded.agree_privacy)

            // ✅ 필수 약관 미동의자 처리
            if (decoded.agree_privacy === 0 || decoded.agree_privacy === null) {
                sessionStorage.setItem('tempToken', token); // 약관 페이지용 임시 저장
                goSignup(); // 약관 페이지로 이동
                return;
            }

            const username = decoded.username || '사용자';
            login(username, token);

            showModal({
                title: '',
                message: `${username} 님 환영합니다!`,
                onConfirm: () => goHome(),
            });

        } else {
            showModal({
                title: '로그인 실패',
                message: `유효한 토큰이 존재하지 않습니다.`,
                onConfirm: () => goLogin(),
            });
        }
    }, []);

    return ;
};

export default OAuthSuccess;
