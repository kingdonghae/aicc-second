import { useEffect } from 'react';
import { kakaoLogin } from '@/pages/login/services/loginService';
import { initKakao } from '@/utils/kakaoSignup';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import { getToken, removeToken } from '@/utils/authService';
import { jwtDecode } from 'jwt-decode';
import { useGoogleLogin } from "@/pages/login/hook/useGoogleLogin.js";
import { useNavigation } from '@/hook/useNavigation';
import { useShowModal } from "@/utils/showModal.js";
import '@/styles/LoginSelect.css';

const { handleGoogleLogin } = useGoogleLogin();

const LoginSelect = () => {
    const { goSignup, goHome, goLoginEmail } = useNavigation();
    const showModal = useShowModal();
    const setAuth = useSetRecoilState(authState);

    useEffect(() => {
        initKakao();
        const token = getToken();
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setAuth({ isLoggedIn: true, user: decoded, token });
            } catch {
                removeToken();
            }
        }
    }, []);

    const handleKakaoLogin = async () => {
        try {
            const { token, decoded } = await kakaoLogin();
            setAuth({ isLoggedIn: true, user: { id: decoded.user_id }, token });
            goHome();
        } catch (errMsg) {
            showModal({
                title: '오류',
                message:'잠시 후 다시 시도해 주세요.',
                showCancelButton: false
            });
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1 className="logo-text">집<span>PT</span></h1>
                <p className="login-sub">로그인하고<br/>내 집 점수 확인하기</p>

                <button className="kakao-login" onClick={handleKakaoLogin}>카카오로 3초 만에 바로 시작</button>
                <button className="email-login-button" onClick={() => goLoginEmail()}>
                    이메일로 로그인하기
                </button>

                <div className="divider">또는</div>

                <button className="google-login-button" onClick={handleGoogleLogin}>
                    <img
                        src="/assets/g-logo.png"
                        alt="google"
                        className="google-icon"
                    />
                </button>

                <div className="signup-prompt">
                    아직 회원이 아니신가요? <span onClick={() => goSignup()} className="link">가입하기</span>
                </div>
            </div>
        </div>
    );
};

export default LoginSelect;
