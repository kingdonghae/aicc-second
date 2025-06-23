import {fetchLogSearchKeyword} from "@/pages/home/api/postHomeApi.js";

export const logSearchKeyword = async (keyword, userId = null) => {
    const { data } = await fetchLogSearchKeyword(keyword, userId);
    return data;
};
