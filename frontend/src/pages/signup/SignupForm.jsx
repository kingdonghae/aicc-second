import React, { useState, useEffect } from 'react';
import { checkEmail, signup } from './services/signupService';
import { useNavigation } from '@/hook/useNavigation';
import { useShowModal } from "@/utils/showModal.js";
import '@/styles/SignupForm.css';

const SocialExtraForm = () => {
    const { goLoginEmail } = useNavigation();
    const showModal = useShowModal();
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);
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

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    const isFormValid = () => (
        email && password && confirmPassword && username &&
        birthdate && phone && address && isEmailAvailable
    );

    const getPasswordValidationMessage = (pw, confirmPw) => {
        if (!pw) return '';
        if (!passwordRegex.test(pw)) return '❌ 형식: 문자, 숫자, 특수문자 포함 8~20자';
        if (!confirmPw) return '비밀번호를 다시 한 번 입력해주세요.';
        if (pw !== confirmPw) return '❌ 비밀번호가 일치하지 않습니다.';
        return '✅ 비밀번호가 일치합니다.';
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setConfirmPasswordMessage(getPasswordValidationMessage(password, confirmPassword));
        }, 700);
        return () => clearTimeout(timer);
    }, [password, confirmPassword]);

    const handleCheckEmail = async () => {
        if (!email) return setCheckMessage("email이 없습니다.")

        try {
            const res = await checkEmail(email);
            setIsEmailAvailable(res.available);
            setCheckMessage(res.available ? '✅ 사용 가능한 이메일입니다.' : '❌ 이미 존재하는 이메일입니다.');
        } catch {
            setIsEmailAvailable(false);
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

        const userData = {
            email,
            username,
            password,
            birthdate,
            phone_number: phone,
            address,
            detail_address: detailAddress.trim(),
            agree_privacy: 1,
        };

        try {
            const result = await signup(userData);
            showModal({
                title: '',
                message: result.message || '회원가입 성공',
                showCancelButton: false,
                onConfirm:goLoginEmail
            });
        } catch (err) {
            showModal({
                title: '오류',
                message: '잠시 후 다시 시도해 주세요',
                showCancelButton: false,
            });
        }
    };

    return (
        <div className="form-background">
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailAvailable(false);
                            setCheckMessage('');
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleCheckEmail();
                            }
                        }}
                        required
                    />
                    <button
                        type="button"
                        className="check-button"
                        onClick={handleCheckEmail}>
                        중복 확인
                    </button>
                </div>
                <p className={`message-space message ${isEmailAvailable ? 'success' : 'error'}`}>
                    {checkMessage || ' '}
                </p>

                <input
                    type="password"
                    placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {confirmPasswordMessage && (
                    <p
                        className={`message ${confirmPasswordMessage.startsWith('✅') ? 'success' : 'error'}`}>
                        {confirmPasswordMessage}
                    </p>
                ) || <p className='message'> </p>
                }

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

                <div className="input-group">
                    <input
                        type="text"
                        id="address"
                        placeholder="주소를 검색해주세요"
                        value={address}
                        readOnly required
                    />
                    <button
                        type="button"
                        className="check-button"
                        onClick={handleAddressSearch}>주소 검색
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)} id="detail-address"
                />

                <button
                    type="submit"
                    className={`submit-button ${!isFormValid() ? 'disabled' : ''}`}
                    disabled={!isFormValid()}>
                    가입하기
                </button>
            </form>
        </div>
    );
};

export default SocialExtraForm;
