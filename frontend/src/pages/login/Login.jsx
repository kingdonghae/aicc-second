import '@/styles/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from './services/LoginService';
import { useNavigation } from '@/hook/useNavigation.js';
import { initKakao } from '@/utils/kakaoSignup'; // SDK 초기화 함수

import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authState';
import { getToken, saveToken, removeToken } from '@/utils/authService';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const { goSignup } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const setAuth = useSetRecoilState(authState);

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decoded = jwtDecode(token); // { user_id, provider, iat }
                setAuth({
                    isLoggedIn: true,
                    user: { id: decoded.user_id },
                    token: token
                });
            } catch (err) {
                console.error('❌ JWT 디코딩 실패:', err);
                removeToken();
            }
        }
    }, []);

    // ✅ SDK 초기화 (최초 한 번만)
    useEffect(() => {
        initKakao();
    }, []);

    const handleKakaoLogin = () => {
        if (!window.Kakao) {
            alert('Kakao SDK가 로드되지 않았습니다.');
            return;
        }
    
        window.Kakao.Auth.login({
            success: function (authObj) {
                const access_token = authObj.access_token;
    
                fetch('http://localhost:5000/social/kakao', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ access_token })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        saveToken(data.token);
                        const decoded = jwtDecode(data.token);
                        setAuth({
                            isLoggedIn: true,
                            user: { id: decoded.user_id },
                            token: data.token
                        });
                        alert('카카오 로그인 성공!');
                        navigate('/');
                    } else {
                        alert(data.error || '서버 응답 오류');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('서버 요청 실패');
                });
            },
            fail: function (err) {
                console.error(err);
                alert('카카오 로그인 실패');
            }
        });
    }; 

    const handleLogin = async () => {
        if (!email.trim()) {
            setErrorMessage("이메일을 입력해주세요.");
            return;
        }
        if (!password.trim()) {
            setErrorMessage("비밀번호를 입력해주세요.");
            return;
        }
        setErrorMessage('');
        try {
            const result = await login({ email, password });
            const token = result.token;
            saveToken(token);
            const userInfo = jwtDecode(token);
            setAuth({ 
                isLoggedIn: true, 
                user: userInfo, 
                token // ✅ token 포함해서 저장
            });
            navigate('/');
        } catch (error) {
            const msg = error || '로그인 중 오류가 발생했습니다.';
            setErrorMessage(msg);
        }
    };

    return (
        <div className='background'> 
            <div className='modal'>
                <div className='login'>
                    <div className='login-item'>
                        <input
                            type="email"
                            placeholder='이메일을 입력하세요.'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessage('');
                            }}
                        />
                        <input
                            type="password"
                            placeholder='비밀번호를 입력하세요.'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage('');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleLogin();
                            }}
                        />
                    </div>
                    <button className='login-button' onClick={handleLogin}>로그인</button>
                </div>
                <p className='login-error-msg'>
                    {errorMessage || '\u00A0'}
                </p>
                <div className='signup'>
                    <button className="google-signup">
                        <img 
                            src="https://developers.google.com/identity/images/g-logo.png" 
                            alt="Google logo" 
                            style={{ width: '20px', height: '20px', verticalAlign: 'middle' }} 
                        />
                        <span style={{ marginLeft: '8px' }}>구글로 로그인</span>
                    </button>
                    <button className='kakao-signup' onClick={handleKakaoLogin}>
                        카카오로 로그인
                    </button>
                    <button className='local-signup' onClick={goSignup}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
