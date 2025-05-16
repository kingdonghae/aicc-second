import { useEffect, useState } from "react";
import { getPostDetailService } from "@/pages/textdetail/services/getPostDetailService.js";

/**
 * 게시글 상세 조회 훅
 */
export const usePostDetail = (postId) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;

        setLoading(true);
        getPostDetailService(postId)
            .then(setPost)
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [postId]);

    return { post, loading, error };
};
