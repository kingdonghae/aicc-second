import React from 'react';
import '../styles/Login.css';

const Login = () => {
  return (
    <div id='background'>
        <div id='house'>
            <div id='login-box'>
                <div id='login'>
                    <h2>로그인</h2>
                    <input type="text" placeholder='아이디를 입력하세요.'/>
                    <input type="text" placeholder='비밀번호를 입력하세요.'/>
                    <span></span>
                    <button>로그인</button>
                    <button>회원가입</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login
