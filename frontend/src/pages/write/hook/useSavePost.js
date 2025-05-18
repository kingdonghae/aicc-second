import { useEffect, useState } from 'react';
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
                    titleRef.current?.focus(); // 제목 인풋 포커싱
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
                    editor.commands.focus(); // tiptap 에디터 포커싱
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
                alert('저장 완료!');
                goBoard();
            } else {
                alert('저장에 실패했습니다.');
            }
        } catch (err) {
            console.error('저장 실패:', err);
            setError(err?.response?.data?.error || '저장 실패');
            alert('저장 중 오류 발생');
        } finally {
            setLoading(false);
        }
    };


    return { handleSave, loading, error, editId, post };
};
