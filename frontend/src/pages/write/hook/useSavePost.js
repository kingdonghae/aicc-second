import {useEffect, useState} from 'react';
import {savePostService, updatePostService} from "@/pages/write/services/savePostService.js";
import {useParams} from "react-router-dom";
import {usePostDetail} from "@/pages/textdetail/hook/usePostDetail.js";

export const useSavePost = (editor,title) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id: editId } = useParams();

    useEffect(() => {
        if (editId) {
            const { post, loading: detailLoading, error } = usePostDetail(editId);

        }
    }, []);
    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const content = editor.getHTML();
            const payload = { title, content, writer: 'test111' };
            let result;

            if (editId) {
                result = await updatePostService(editId, payload);
            } else {
                result = await savePostService(payload);
            }

            if (result?.data?.status === 'success') {
                alert('저장 완료!');
                goBoard();
            } else {
                alert('저장에 실패했습니다.');
            }
        } catch (err) {
            console.error('저장 실패:', err);
            setError(err.response?.data?.error || '저장 실패');
            alert('저장 실패');
        } finally {
            setLoading(false);
        }
    };


    return { handleSave, loading, error };
};
