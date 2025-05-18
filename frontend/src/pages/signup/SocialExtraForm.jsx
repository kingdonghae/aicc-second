import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { addUserInfo } from './services/signupService'
import { useNavigation } from '@/hook/useNavigation';
import '@/styles/SocialExtraForm.css';


const SocialExtraForm = () => {
    
    const { goHome } = useNavigation();
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('confirmedToken');
        if (!token) return;
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
            goHome();
        } catch (err) {
            console.error(err);
            alert('오류가 발생했습니다.');
        }
    };

    const isFormValid = () => {
        return (
          phone.length === 11 && 
          birthdate !== '' && 
          address !== ''
        );
      };

    return (
        <div className="social-extra-form-background">
            <form onSubmit={handleSubmit} className="social-extra-form">
                <input
                    type="text"
                    placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="주소를 검색해주세요" 
                        value={address}
                        onClick={handleAddressSearch}
                        readOnly
                    />
                    <button type="button" onClick={handleAddressSearch}>주소 검색</button>
                </div>
                <input
                    type="text"
                    placeholder="상세 주소를 입력해주세요" 
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                />
                <button 
                    type="submit"
                    className={`social-form-submit ${!isFormValid() ? 'disabled' : ''}`}
                    disabled={!isFormValid()}>
                    가입하기
                </button>
                
            </form>
        </div>
    );
};

export default SocialExtraForm;
