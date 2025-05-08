import '@/styles/Login.css';
import { useState } from 'react';
import { login } from './services/LoginService';
import { useNavigation } from '@/hook/useNavigation.js';

const Login = () => {
    const { goSignup } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await login({ email, password });
            alert(result.message);
            // 로그인 성공 시 localStorage 등에 정보 저장 가능
            // localStorage.setItem('user', JSON.stringify(result.user));
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div id='background'>
            <div id='house'>
                <div id='login-box'>
                    <div id='login'>
                        <h2>로그인</h2>
                        <input type="email" placeholder='이메일을 입력하세요.' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='비밀번호를 입력하세요.' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span></span>
                        <button onClick={handleLogin}>로그인</button>
                        <button onClick={goSignup}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;