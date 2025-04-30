import {fetchKakaoAddress} from "@/features/home/api/KakaoApi.jsx";

export const getKakaoAddress = async (keyword) => {
    const { data } = await fetchKakaoAddress(keyword);
    return data;
};

