import { useState } from 'react';
import { login } from '@/pages/login/services/loginService';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import { useNavigation } from '@/hook/useNavigation';
import '@/styles/EmailLogin.css';

const EmailLogin = () => {
    const { goHome, goLogin } = useNavigation();
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
            const { token, user } = await login({ email, password });
            setAuth({ isLoggedIn: true, user, token });
            goHome();
        } catch (error) {
            setErrorMessage(error || '로그인 중 오류 발생');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>이메일로 로그인</h2>
                <div className='login-box'>
                    <div className='input-group'>
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
                    </div>
                    <button className="submit-button" onClick={handleLogin}>로 그 인</button>
                </div>
                {errorMessage && <p className="login-error-msg">{errorMessage}</p>}
                <div className="signup-link">
                    <span onClick={() => goLogin()} className="link" >회원가입</span>
                </div>
            </div>
        </div>
    );
};

export default EmailLogin;
