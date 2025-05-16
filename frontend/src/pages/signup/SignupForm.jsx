import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { patchUserInfo } from '@/pages/mypage/services/UserService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hook/useAuth';
import '@/styles/SignupForm.css';

const SocialExtraForm = () => {
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = sessionStorage.getItem('confirmedToken');
        if (!token) {
            alert('약관에 동의 후 접근해주세요.');
            navigate('/');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUserId(decoded.user_id);
        } catch (error) {
            console.error('토큰 디코딩 실패:', error);
            navigate('/');
        }
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

        try {
            const token = sessionStorage.getItem('confirmedToken');
            const decoded = jwtDecode(token);

            await patchUserInfo(userId, {
                phone_number: phone,
                address,
                detail_address: detailAddress,
                birthdate,
            });

            login(decoded.username, token);
            sessionStorage.removeItem('confirmedToken');

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
