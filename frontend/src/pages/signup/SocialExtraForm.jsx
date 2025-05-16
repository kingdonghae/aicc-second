import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { addUserInfo } from './services/signupService'
import { useNavigate } from 'react-router-dom';
import '@/styles/SignupForm.css';

const SocialExtraForm = () => {

    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('confirmedToken');
        if (!token) return;
0
        const decoded = jwtDecode(token);

        const id = decoded.user_id;
        setUserId(id);

        // getUserInfo(id)
        
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
            await addUserInfo(userId, {
                phone_number: phone,
                address,
                detail_address: detailAddress,
                birthdate,
                agree_privacy: 1,
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
