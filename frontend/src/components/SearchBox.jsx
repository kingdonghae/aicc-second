import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useKakaoAddressSearch } from '@/hook/useKakaoAddressSearch.js';
import { logSearchKeyword } from '@/pages/home/services/homeService.js';
import { useShowModal } from "@/utils/showModal.js";
import { getToken } from '@/utils/authService';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo } from '@/pages/mypage/services/userService.js';

const SearchBox = ({ defaultValue = '', onSearch, user_id }) => {
    const [address, setAddress] = useState(defaultValue);
    const [useraddress, setUseraddress] = useState('어느 동네가 궁금하신가요?');
    const { searchAddress } = useKakaoAddressSearch();
    const navigate = useNavigate();
    const showModal = useShowModal();
    
    useEffect(() => {
        const token = getToken();
        if (!token) return;

        const decoded = jwtDecode(token);
        const id = decoded.user_id;

        getUserInfo(id)
                    .then(data => {
                        setUseraddress(data.address || '');
    })},[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = address.trim() || useraddress.trim();
        if (!trimmed) {
            showModal({
                title: '',
                message: '주소를 입력해주세요.',
                showCancelButton: false,
            });
        }

        await searchAddress(
            trimmed,
            (coords, fullAddressResult) => { // onSuccess 콜백에 fullAddressResult 추가
                let keywordToLog = trimmed;
                if (fullAddressResult){
                    if(fullAddressResult.address?.region_1depth_name) {
                        const { region_2depth_name, region_3depth_name, region_3depth_h_name } = fullAddressResult.address;
                        keywordToLog = `${region_2depth_name} ${region_3depth_h_name || region_3depth_name}`;
                    }
                    else {
                        const { region_2depth_name, region_3depth_name } = fullAddressResult.road_address;
                        keywordToLog = `${region_2depth_name} ${region_3depth_name}`;
                    } 
                    logSearchKeyword(trimmed, keywordToLog, user_id);
                }
                if (onSearch) {
                    onSearch(trimmed, coords);
                } else {
                    navigate('/map', {
                        state: {
                            key: Date.now(),
                            address: trimmed,
                            coords,
                        },
                    });
                }
            },
            () => {
                showModal({
                    title: '',
                    message: '정확한 주소를 입력해 주세요.',
                    showCancelButton: false,
                });
            }
        );
    };

    return (
        <form id='search-input-box' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder={useraddress}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button id='input-button' type='submit'>
                <SearchIcon />
            </button>
        </form>
    );
};

export default SearchBox;