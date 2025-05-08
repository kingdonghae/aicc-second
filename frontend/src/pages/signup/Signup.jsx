import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, checkUserid } from './services/SignupService';
import '@/styles/Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const [userid, setUserid] = useState('');
    const [isUseridAvailable, setIsUseridAvailable] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    const idRegex = /^[a-zA-Z0-9]{6,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    const isFormValid = userid && password && confirmPassword && username && birthdate && phone && email && address && agreePrivacy && isUseridAvailable;

    const handleCheckUserid = async () => {
        if (!userid) return;

        if (!idRegex.test(userid)) {
            alert('아이디는 영문/숫자 6~20자여야 합니다.');
            return;
        }

        try {
            const res = await checkUserid(userid);
            if (res.available) {
                setIsUseridAvailable(true);
                setCheckMessage('✅ 사용 가능한 아이디입니다.');
            } else {
                setIsUseridAvailable(false);
                setCheckMessage('❌ 이미 존재하는 아이디입니다.');
            }
        } catch {
            setIsUseridAvailable(false);
            setCheckMessage('⚠️ 중복 확인 중 오류 발생');
        }
    };

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.address);
            },
        }).open();
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const fullAddress = `${address} ${detailAddress}`.trim();

        const userData = {
            userid,
            username,
            password,
            birthdate,
            phone_number: phone,
            email,
            address: fullAddress,
            agree_privacy: agreePrivacy ? 1 : 0,
        };

        try {
            const result = await signup(userData); // ✅ 서비스 호출
            alert(result.message || '회원가입 성공');
            navigate('/'); // 회원가입 후 홈으로 이동
        } catch (errorMessage) {
            alert(errorMessage);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (password === '') {
                setConfirmPasswordMessage('');
            } else if (!passwordRegex.test(password)) {
                setConfirmPasswordMessage('❌ 형식: 문자, 숫자, 특수문자 포함 8~20자');
            } else if (confirmPassword === '') {
                setConfirmPasswordMessage('비밀번호를 다시 한 번 입력해주세요.');
            } else if (password !== confirmPassword) {
                setConfirmPasswordMessage('❌ 비밀번호가 일치하지 않습니다.');
            } else {
                setConfirmPasswordMessage('✅ 비밀번호가 일치합니다.');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [password, confirmPassword]);

    return (
        <div className="background">
            <form className="signup-form" onSubmit={handleSignup}>
                <div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="아이디 입력 (6~20자)"
                            value={userid}
                            onChange={(e) => {
                                setUserid(e.target.value);
                                setIsUseridAvailable(false);
                                setCheckMessage('');
                            }}
                            required
                        />
                        <button type="button" className="check-button" onClick={handleCheckUserid}>
                            중복 확인
                        </button>
                    </div>
                    <p className={`message-space message ${isUseridAvailable ? 'success' : 'error'}`}>
                        {checkMessage || ' '}
                    </p>
                </div>
                
                <input
                    type="password"
                    placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 재확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {confirmPasswordMessage && (
                        <p className={`message ${confirmPasswordMessage.startsWith('✅') ? 'success' : 'error'}`}>{confirmPasswordMessage}</p>
                    ) || <p className='message'> </p>} 
                </div>

                <input
                    type="text"
                    placeholder="이름을 입력해주세요."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <div className="birth-group">
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="input-group">
                    <input
                        type="text"
                        id="address"
                        placeholder="주소를 검색해주세요"
                        value={address}
                        onClick={handleAddressSearch}
                        readOnly
                        required
                    />
                    <button type="button" className="check-button" onClick={handleAddressSearch}>
                        주소 검색
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    id="detail-address"
                />

                <div className="check-box">
                    <p>개인정보 활용에 동의하십니까?</p>
                    <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
                    disabled={!isFormValid}
                >
                    가입하기
                </button>
            </form>
        </div>
    );
};

export default Signup;
