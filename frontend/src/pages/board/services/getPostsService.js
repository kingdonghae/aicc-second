import {fetchPostCount, fetchPostList} from "@/pages/board/api/postBoardApi.js";

export const getPostListService = async (page = 1, limit = 10, search = '') => {
    try {
        const response = await fetchPostList({ page, limit, search });
        return response.data;
    } catch (err) {
        console.error('게시글 목록 조회 실패:', err);
        throw err;
    }
};


export const getPostCountService = async (search) => {
    try {
        return await fetchPostCount(search);
    } catch (e) {
        console.error('게시글 수 가져오기 실패:', e);
        return 0;
    }
};
