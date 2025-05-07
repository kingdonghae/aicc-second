import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useKakaoAddressSearch } from '@/hook/useKakaoAddressSearch.js';
import { logSearchKeyword } from '@/pages/home/services/homeService.js';

const SearchBox = ({ defaultValue = '', onSearch }) => {
    const [address, setAddress] = useState(defaultValue);
    const { searchAddress } = useKakaoAddressSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = address.trim();
        if (!trimmed) {
            alert('주소를 입력해주세요.');
            return;
        }

        await searchAddress(
            trimmed,
            (coords) => {
                if (onSearch) {
                    onSearch(trimmed, coords);
                } else {
                    logSearchKeyword(trimmed);
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
                alert('정확한 주소를 입력해 주세요.');
            }
        );
    };

    return (
        <form id='search-input-box' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='주소를 입력해주세요.'
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
