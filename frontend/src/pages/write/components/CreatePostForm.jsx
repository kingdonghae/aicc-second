import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import useImageUpload from '../hook/useFileUpload.js';
import { alignedImage } from '../services/AlignedImage';
import { useState } from 'react';
import { useSavePost } from '../hook/useSavePost';
import { useNavigation } from '@/hook/useNavigation';
import { useEditor } from '@tiptap/react';
import EditorToolbar from './EditorToolbar';
import EditorBox from './EditorBox';
import AttachmentList from "@/pages/write/components/AttachmentList.jsx";
import { useShowModal } from "@/utils/showModal.js";

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [isChecking, setIsChecking] = useState(false); // AI 검사 중 상태
    const { goBoard } = useNavigation();
    const showModal = useShowModal();

    const editor = useEditor({
        extensions: [
            Placeholder.configure({
                placeholder: '글을 작성해보세요!',
                emptyEditorClass: 'is-editor-empty',
            }),
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            alignedImage.configure({ inline: false, allowBase64: true }),
        ],
        content: '<p><양식><br/>- 내 거주지역 : <br/>- 평가 : 상 / 중 / 하</p>',
    });

    const {
        triggerImageInput,
        onDelete,
        triggerFileInput,
        handleImageChange,
        handleFileChange,
        imageInputRef,
        fileInputRef,
        uploadedFiles,
        setUploadedFiles
    } = useImageUpload(editor);

    const {
        handleSave,
        editId,
        editorRef,
        titleRef
    } = useSavePost(
        editor,
        title,
        setTitle,
        uploadedFiles,
        setUploadedFiles
    );

    const bannedWords = ['bad_word0'];

    const containsBannedWord = (text) => {
        return bannedWords.some(word => text.includes(word));
    };

    // 유해표현 감지 알림
    const BannedWordAlert = () => {
        showModal({
            title: '🛡️ 유해표현 감지',
            message: '유해표현이 포함되어 있어 저장할 수 없습니다.',
            showCancelButton: false,
        });
    };

    // AI 안전성 검사가 포함된 저장 함수
    const onSaveClick = async () => {
        const content = editor?.getText() || '';
        const fullText = `${title} ${content}`.trim();
        
        // 빈 내용 체크
        if (!fullText) {
            showModal({
                title: '⚠️ 알림',
                message: '제목이나 내용을 입력해주세요.',
                showCancelButton: false,
            });
            return;
        }

        setIsChecking(true);
        
        try {
            // AI 안전성 검사
            const response = await fetch('http://localhost:5000/api/safety-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: fullText }),
            });
            
            const result = await response.json();
            
            if (!result.safe) {
                BannedWordAlert();
                return;
            }
            
            // AI 검사 통과 시 기존 비속어 필터도 실행 (이중 보안)
            if (containsBannedWord(title) || containsBannedWord(content)) {
                BannedWordAlert();
                return;
            }
            
            // 안전한 경우 저장 진행
            handleSave();
            
        } catch (error) {
            console.error('안전성 검사 오류:', error);
            
            // AI 검사 실패 시 기존 비속어 필터로 백업
            if (containsBannedWord(title) || containsBannedWord(content)) {
                BannedWordAlert();
                return;
            }
            
            // AI 실패해도 비속어가 없으면 저장 진행
            handleSave();
            
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className='create-box'>
            <input
                type='text'
                ref={titleRef}
                placeholder='제목을 입력하세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id='write-title'
            />
            <hr id='write-hr' />

            <EditorToolbar
                editor={editor}
                imageInputRef={imageInputRef}
                fileInputRef={fileInputRef}
                triggerImageInput={triggerImageInput}
                triggerFileInput={triggerFileInput}
                handleImageChange={handleImageChange}
                handleFileChange={handleFileChange}
            />

            <EditorBox editorRef={editorRef} editor={editor} />

            {uploadedFiles.length > 0 && (
                <AttachmentList files={uploadedFiles} onDelete={onDelete}/>
            )}

            <div className='button-group'>
                <button 
                    onClick={onSaveClick} 
                    id='save-button'
                    disabled={isChecking}
                >
                    {isChecking ? '🔍 AI 검사 중...' : (editId ? '수정' : '저장')}
                </button>
                <button onClick={goBoard} id='cancel-button'>
                    취소
                </button>
            </div>
            
            {isChecking && (
                <div style={{textAlign: 'center', marginTop: '10px', color: '#666', fontSize: '14px'}}>
                    🤖 Kanana AI가 내용을 검사하고 있습니다...
                </div>
            )}
        </div>
    );
};

export default CreatePostForm;
