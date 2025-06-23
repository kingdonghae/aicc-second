import { useCallback } from 'react';
import {deleteCommentService} from "@/pages/textdetail/services/getPostDetailService.js";
import { useShowModal } from '@/utils/showModal';

export const useDeleteComment = (setComments) => {
    const showModal = useShowModal();

    const handleDeleteComment = useCallback((commentId) => {
        return new Promise((resolve) => {
            showModal({
                title: '',
                message: '댓글을 삭제하시겠습니까?',
                showCancelButton: true,
                onConfirm: async () => {
                    try {
                        const res = await deleteCommentService(commentId);

                        setComments((prev) => prev.filter((c) => c.id !== commentId));

                        resolve({ success: true, message: res.message });
                    } catch (error) {
                        resolve({
                            success: false,
                            message: error?.response?.data?.error || '댓글 삭제 오류',
                        });
                    }
                },
                onCancel: () => {
                    resolve({ success: false, message: '삭제가 취소되었습니다.' });
                },
            });
        });
    }, [setComments, showModal]);

    return { handleDeleteComment };
};
