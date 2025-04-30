import kakaoClient from "@/api/kakaoClient.jsx";

export const fetchKakaoAddress = async (query) => {
    const res = await kakaoClient.get('/v2/local/search/address.json', {
        params: { query },
    });
    return res.data;
};