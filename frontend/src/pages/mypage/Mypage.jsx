import { useState, useEffect } from 'react';
import { getToken } from '@/utils/authService';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo, patchUserInfo } from './services/userService.js';
import { useNavigate } from 'react-router-dom';
import { useShowModal } from "@/utils/showModal.js";
import { useRequireLoginAction } from "@/hook/useRequireLoginAction";
import '@/styles/Mypage.css';


const Mypage = () => {

    useRequireLoginAction(true);

    const navigate = useNavigate();
    const showModal = useShowModal();
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        const decoded = jwtDecode(token);
        const id = decoded.user_id;
        setUserId(id);

        getUserInfo(id)
            .then(data => {
                setUsername(data.username);
                setBirthdate(new Date(data.birthdate).toISOString().split('T')[0]);
                setPhone(data.phone_number);
                setEmail(data.email);
                setAddress(data.address || '');
                setDetailAddress(data.detail_address || '');
            })
            .catch(err => {
                console.error(err);
                showModal({
                    title: '오류',
                    message: '잠시 후 다시 시도해주세요.',
                    showCancelButton: false,
                });
        });
    }, []);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setForm((prev) => ({ ...prev, address: data.address }));
            },
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
            });
            showModal({
                title: '',
                message: '사용자 정보가 성공적으로 수정되었습니다.',
                showCancelButton: false,
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            showModal({
                title: '오류',
                message:'잠시 후 다시 시도해 주세요.',
                showCancelButton: false
            });
        }
    };


    return (
        <div className="mypage-background">
            <form className="mypage-form" onSubmit={handleSubmit}>
                <input type="text" value={email} readOnly className='hold-data' />

                <input
                    type="password"
                    placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 재입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input type="text" value={username} readOnly className='hold-data' />

                <div className="birth-group">
                    <input type="date" value={birthdate} readOnly className='hold-data' />
                </div>

                <input
                    type="text"
                    value={phone}
                    placeholder="휴대폰 번호 입력"
                    onChange={(e) => setPhone(e.target.value)}
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
                    <button type="button" className="check-button" onClick={handleAddressSearch}>주소 검색</button>
                </div>
                <input
                    type="text"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    id="detail-address"
                />

                <p className="message">{message}</p>

                <div id='modify-box'>
                    <button type="submit" className="mypage-button">수정하기</button>
                    <button type="button" className="mypage-button" onClick={() => navigate(-1)}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default Mypage;
