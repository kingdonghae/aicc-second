import { useEffect, useRef, useState } from "react";
import { getSearchRank, getTodayRanking } from "@/pages/rank/services/rankService.js";
import { useKakaoAddressSearch } from '@/hook/useKakaoAddressSearch.js';
import { useShowModal } from "@/utils/showModal.js";

export function useTodaySelector() {
    const [todayRank, setTodayRank] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const { searchAddress } = useKakaoAddressSearch();
    const [keywordTodayRank, setKeywordTodayRank] = useState(null); // 검색된 주소의 랭킹 (currentRank)
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색된 주소에서 추출된 키워드
    const [searchCount, setSearchCount] = useState(null); // 검색된 키워드의 검색 횟수 (새로운 상태)
    const showModal = useShowModal();

    useEffect(() => {
        const fetchTodayRanking = async () => {
            try {
                const data = await getTodayRanking();
                setTodayRank(data.rankings);
            } catch (error) {
                console.error("랭킹 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchTodayRanking();
    }, []);

    useEffect(() => {
        if (!inputValue.trim()) {
            setKeywordTodayRank('?');
            setSearchKeyword('');
            setSearchCount(null); // inputValue가 비면 검색 횟수도 초기화
        }
    }, [inputValue]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        const currentInput = inputRef.current?.value ?? '';
        setKeywordTodayRank('?');
        setSearchKeyword('');
        setSearchCount(null); // 검색 시작 시 검색 횟수 초기화

        if (!currentInput.trim()) {
            showModal({
                title: '',
                message: "검색어를 입력해주세요.",
                showCancelButton: false,
                onConfirm: false
            });
            return;
        }

        try {
            console.log(`currentInput: ${currentInput}`);
            
            await searchAddress(
                currentInput, 
                async (_, fullAddressResult) => {
                    let extractedKeyword = currentInput;

                    if (fullAddressResult) {
                        if (fullAddressResult.road_address?.region_1depth_name) {
                            const { region_2depth_name, region_3depth_name } = fullAddressResult.road_address;
                            extractedKeyword = `${region_2depth_name} ${region_3depth_name}`;
                        } else if (fullAddressResult.address) {
                            const { region_2depth_name, region_3depth_name, region_3depth_h_name } = fullAddressResult.address;
                            extractedKeyword = `${region_2depth_name} ${region_3depth_h_name || region_3depth_name}`;
                        }
                    }
                    
                    setSearchKeyword(extractedKeyword); 

                    const res = await getSearchRank(extractedKeyword);
                    setKeywordTodayRank(res.rankings[0]?.currentRank ?? '-');
                    setSearchCount(res.rankings[0]?.count ?? 0); // **새로운 추가: 검색 횟수 상태 업데이트**
                },
                () => {
                    setKeywordTodayRank('-');
                    setSearchKeyword('');
                    setSearchCount(null); // 주소 검색 실패 시 검색 횟수 초기화
                    showModal({
                        title: '',
                        message: "정확한 주소 검색에 실패했습니다.",
                        showCancelButton: false,
                        onConfirm: false
                    });
                }
            );
        } catch (error) {
            console.error("검색 또는 랭킹 조회 중 오류 발생:", error);
            setKeywordTodayRank('-');
            setSearchKeyword('');
            setSearchCount(null); // 오류 발생 시 검색 횟수 초기화
        }
    };

    return {
        inputValue,
        setInputValue,
        keywordTodayRank,
        handleSearchSubmit,
        todayRank,
        inputRef,
        searchKeyword,
        searchCount // **새로운 추가: searchCount를 반환**
    };
}