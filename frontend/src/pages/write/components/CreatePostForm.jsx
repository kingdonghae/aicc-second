import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { alignedImage } from '../services/AlignedImage';
import useImageUpload from '../hook/useFileUpload.js';
import { useSavePost } from '../hook/useSavePost';
import { useNavigation } from '@/hook/useNavigation';
import EditorToolbar from './EditorToolbar';
import EditorBox from './EditorBox';
import AttachmentList from "@/pages/write/components/AttachmentList.jsx";

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const { goBoard } = useNavigation();

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
                <button onClick={handleSave} id='save-button'>
                    {editId ? '수정' : '저장'}
                </button>
                <button onClick={goBoard} id='cancel-button'>
                    취소
                </button>
            </div>
        </div>
    );
};

export default CreatePostForm;
