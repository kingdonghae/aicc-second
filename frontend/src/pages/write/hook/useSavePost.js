import { useEffect, useRef, useState } from 'react';
import { savePostService, updatePostService } from "@/pages/write/services/savePostService.js";
import { useParams}  from "react-router-dom";
import { usePostDetail } from "@/pages/textdetail/hook/usePostDetail.js";
import { useNavigation } from "@/hook/useNavigation.js";
import { useRecoilValue } from "recoil";
import { authState } from "@/atoms/authState.js";
import { useShowModal } from "@/utils/showModal.js";

export const useSavePost = (editor, title, setTitle, uploadedFiles, setUploadedFiles) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { goBoard, goLogin } = useNavigation();
    const { id: editId } = useParams();
    const { post, loading: detailLoading, error: detailError  } = usePostDetail(editId);
    const {isLoggedIn,user} = useRecoilValue(authState);
    const showModal = useShowModal();
    const titleRef = useRef();
    const editorRef = useRef();

    useEffect(() => {
        if (editId && post && editor) {
            setTitle(post.title || '');
            editor.commands.setContent(post.content || '');
            setUploadedFiles(post.uploadedFiles)
        }
    }, [editId, post, editor, setTitle]);

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        const content = editor.getHTML();

        if (!title.trim()) {
            showModal({
                title: '',
                message: '제목을 입력하세요.',
                showCancelButton: false,
                onConfirm: () => {
                    titleRef.current?.focus();
                },
            });
            setLoading(false);
            return;
        }

        if (!content || content === '<p></p>') {
            showModal({
                title: '',
                message: '내용을 입력하세요.',
                showCancelButton: false,
                onConfirm: () => {
                    editor.commands.focus();
                },
            });
            setLoading(false);
            return;
        }

        if (!user?.user_id) {
            showModal({
                title: '',
                message: '로그인 후 이용 가능합니다.',
                showCancelButton: false,
                onConfirm: goLogin,
            });
            setLoading(false);
            return;
        }

        try {
            const payload = {
                title,
                content,
                writer: user.user_id,
                attachments: uploadedFiles,
            };

            const result = editId
                ? await updatePostService(editId, payload)
                : await savePostService(payload);

            if (result?.data?.status === 'ok') {
                showModal({
                    title: '성공',
                    message: '저장 완료!',
                    showCancelButton: false,
                    onConfirm: goBoard,
                });
            } else {
                showModal({
                    title: '오류',
                    message: '저장에 실패했습니다.<br/> 잠시 후 다시 시도하세요',
                    showCancelButton: false,
                });
            }
        } catch (err) {
            console.error('저장 실패:', err);
            setError(err?.response?.data?.error || '저장 실패');
            showModal({
                title: '에러',
                message: '저장 중 오류가 발생했습니다. <br/> 관리자에게 문의하세요.',
                showCancelButton: false,
            });
        } finally {
            setLoading(false);
        }
    };


    return { handleSave, loading, error, editId, post };
};
