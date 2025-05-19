import { useEffect, useState } from "react";
import {getCommentsByPostService} from "@/pages/textdetail/services/getPostDetailService.js";

/**
 * 댓글 목록 조회 훅
 */
export const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;

        setLoading(true);
        getCommentsByPostService(postId)
            .then(setComments)
            .catch((err) => {
                console.error("댓글 불러오기 실패:", err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [postId]);

    return { comments, setComments, loading, error };
};
