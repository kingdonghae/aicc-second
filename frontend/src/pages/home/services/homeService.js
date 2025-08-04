import {fetchLogSearchKeyword} from "@/pages/home/api/postHomeApi.js";

export const logSearchKeyword = async (input_address, keyword, userId = null) => {
    const { data } = await fetchLogSearchKeyword(input_address, keyword, userId);
    return data;
};
