import { fetchPostDetail } from "@/pages/textdetail/api/postDetailApi.js";

/**
 * 게시글 상세 조회 서비스
 * @param {number} postId
 * @returns {Promise<Object>}
 */
export const getPostDetailService = async (postId) => {
    try {
        const response = await fetchPostDetail(postId);
        return response.data;
    } catch (err) {
        console.error(`게시글 상세 조회 실패 (id: ${postId}):`, err);
        throw err;
    }
};
