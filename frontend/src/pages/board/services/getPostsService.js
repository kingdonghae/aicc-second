import {fetchPostCount, fetchPostList} from "@/pages/board/api/postBoardApi.js";

/**
 * 게시글 목록 조회 서비스
 * @param {number} page
 * @param {number} limit
 * @param {String} search
 * @returns {Promise<Array>}
 */
export const getPostListService = async (page = 1, limit = 10, search = '') => {
    try {
        const response = await fetchPostList({ page, limit, search });
        return response.data;
    } catch (err) {
        console.error('게시글 목록 조회 실패:', err);
        throw err;
    }
};

/**
 * 전체 게시글 수 조회 서비스
 * @param {String} search
 * @returns {Promise<number>} 게시글 총 개수
 */
export const getPostCountService = async (search) => {
    try {
        return await fetchPostCount(search);
    } catch (e) {
        console.error('게시글 수 가져오기 실패:', e);
        return 0;
    }
};
