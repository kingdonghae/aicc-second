import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { addUserInfo } from './services/signupService'
import { useNavigation } from '@/hook/useNavigation';
import { useShowModal } from "@/utils/showModal.js";
import '@/styles/SocialExtraForm.css';

const SocialExtraForm = () => {
    const { goLogin } = useNavigation();
    const showModal = useShowModal();
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('confirmedToken');
        if (!token) return;
        const decoded = jwtDecode(token);
        const id = decoded.user_id;
        setUserId(id);
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
            showModal({
                title: '',
                message: '추가 정보가 입력 되었습니다.',
                showCancelButton: false,
                onConfirm:goLogin
            });
        } catch (err) {
            console.error(err);
            showModal({
                title: '오류',
                message: "잠시 후 다시 시도해 주세요.",
                showCancelButton: false,
                onConfirm:false

            });
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
