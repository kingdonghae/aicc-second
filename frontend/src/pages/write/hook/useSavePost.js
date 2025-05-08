import { useState } from 'react';
import {savePostService} from "@/pages/write/services/savePostService.js";

export const useSavePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const save = async ({ title, content, writer }) => {
        setLoading(true);
        setError(null);
        try {
            return savePostService({ title, content, writer });
        } catch (err) {
            setError(err.response?.data?.error || '저장 실패');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const html = editor.getHTML();
            const result = await save({ title, content: html, writer: 'test111' });

            if (result?.status === 'success') {
                alert('저장 완료!');
                goBoard();
            } else {
                alert('저장에 실패했습니다.');
            }
        } catch (e) {
            console.error('저장 중 오류:', e);
            alert('저장 실패');
        }
    };
    return { save, handleSave, loading, error };
};
