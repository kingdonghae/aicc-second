import '@/styles/EmailLogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/pages/login/services/LoginService';
import { jwtDecode } from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import { saveToken } from '@/utils/authService';

const EmailLogin = () => {
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const result = await login({ email, password });
            const token = result.token;
            saveToken(token);
            const userInfo = jwtDecode(token);

            setAuth({ isLoggedIn: true, user: userInfo, token });
            navigate('/');
        } catch (error) {
            setErrorMessage(error || '로그인 중 오류 발생');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>이메일로 로그인</h2>
                <input
                    type="email"
                    placeholder="이메일 주소 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                {errorMessage && <p className="login-error-msg">{errorMessage}</p>}
                <button onClick={handleLogin} className="submit-button">로그인</button>
                <div className="login-links">
                    <span>비밀번호 재설정</span> | 
                    <span onClick={() => navigate('/signup')} className="link">이메일로 가입하기</span>
                </div>
            </div>
        </div>
    );
};

export default EmailLogin;
