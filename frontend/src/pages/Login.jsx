import '@/styles/Login.css';
import {useNavigation} from "@/hook/useNavigation.js";

const Login = () => {
    const { goLogin, goSignup } = useNavigation();

    return (
        <div id='background'>
            <div id='house'>
                <div id='login-box'>
                    <div id='login'>
                        <h2>로그인</h2>
                        <input type="text" placeholder='아이디를 입력하세요.' />
                        <input type="password" placeholder='비밀번호를 입력하세요.' id='login-password' />
                        <span></span>
                        <button onClick={goLogin}>로그인</button>
                        <button onClick={goSignup}>회원가입</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login