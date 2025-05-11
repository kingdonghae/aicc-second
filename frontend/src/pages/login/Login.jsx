import '@/styles/Login.css';
import { useState } from 'react';
import { login } from './services/LoginService';
import { useNavigation } from '@/hook/useNavigation.js';

const Login = () => {
    const { goSignup } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (!email.trim()) {
            setErrorMessage("이메일을 입력해주세요.");
            return;
        }
        if (!password.trim()) {
            setErrorMessage("비밀번호를 입력해주세요.");
            return;
        }
    
        setErrorMessage(''); // 이전 에러 초기화
        try {
            const result = await login({ email, password });
            alert(result.message);
        } catch (error) {
            setErrorMessage(error);
        }
    };

    return (
        <div className='background'> 
            <div className='modal'>
                <div className='login'>
                    <div className='login-item'>
                        <input type="email" 
                        placeholder='이메일을 입력하세요.' 
                        value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage('');
                        }} />
                        <input type="password" 
                        placeholder='비밀번호를 입력하세요.' 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value); 
                            setErrorMessage('');}} />
                    </div>
                    <button className='login-button' onClick={handleLogin}>로그인</button>
                </div>
                <p className='login-error-msg'>
                    {errorMessage || '\u00A0'}
                </p>
                <div className='signup'>
                    <button className='google-signup'>구글로 로그인</button>
                    <button className='kakao-signup'>카카오로 로그인</button>
                    <button className='direct-signup' onClick={goSignup}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default Login;