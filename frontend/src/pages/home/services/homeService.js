import {fetchKakaoAddress} from "@/pages/home/api/kakaoApi.js";
import {fetchLogSearchKeyword} from "@/pages/home/api/postHomeApi.js";

export const getKakaoAddress = async (keyword) => {
    const { data } = await fetchKakaoAddress(keyword);
    return data;
};

export const  logSearchKeyword= async (keyword) => {
    const { data } = await fetchLogSearchKeyword(keyword);
    return data;
};

