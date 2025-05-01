import {fetchKakaoAddress} from "@/features/home/api/KakaoApi.jsx";
import {fetchLogSearchKeyword} from "@/features/home/api/PostHomeApi.jsx";

export const getKakaoAddress = async (keyword) => {
    const { data } = await fetchKakaoAddress(keyword);
    return data;
};

export const  logSearchKeyword= async (keyword) => {
    const { data } = await fetchLogSearchKeyword(keyword);
    return data;
};

