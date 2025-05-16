import React, { useState, useEffect } from 'react';
import { getToken } from '@/utils/authService';
import { jwtDecode } from 'jwt-decode';
import { patchUserInfo } from '@/pages/mypage/services/UserService';
import { useNavigate } from 'react-router-dom';
import '@/styles/SignupForm.css';

const SocialExtraForm = () => {
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id);
    }, []);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                setAddress(data.address);
            }
        }).open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('❌ 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await patchUserInfo(userId, {
                password,
                phone_number: phone,
                address,
                detail_address: detailAddress,
                birthdate,
            });
            alert('추가 정보 입력 완료!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="전화번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                />
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="주소"
                        value={address}
                        onClick={handleAddressSearch}
                        readOnly
                    />
                    <button type="button" onClick={handleAddressSearch}>주소 검색</button>
                </div>
                <input
                    type="text"
                    placeholder="상세 주소"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                />
                <p className="message">{message}</p>
                <button type="submit">제출</button>
            </form>
        </div>
    );
};

export default SocialExtraForm;
