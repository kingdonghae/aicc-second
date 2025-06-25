import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getPostDetailService } from "@/pages/textdetail/services/getPostDetailService";

export const usePostDetail = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const postId = parseInt(id);

    useEffect(() => {
        if (!postId) return;

        setLoading(true);
        getPostDetailService(postId)
            .then(setPost)
            .catch((err) => setError(err))
            .finally(() => setLoading(false));

    }, [postId]);

    const formatted = useMemo(() => {
        if (!post?.created_at) return '';
        const date = new Date(post.created_at);
        const pad = (n) => String(n).padStart(2, '0');
        return (
            `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())} ` +
            `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`
        );
    }, [post]);

    return { post, loading, error, postId, formatted };
};
