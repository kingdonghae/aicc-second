// pages/WritePage.jsx
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
import useImageUpload from '../hook/useImageUpload';
import { useSavePost } from '../hook/useSavePost';
import { useNavigation } from '@/hook/useNavigation';
import EditorToolbar from './EditorToolbar';
import EditorBox from './EditorBox';

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [attachments, setAttachments] = useState([]);
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

    const { fileInputRef, handleFileChange } = useImageUpload(editor);
    const { handleSave, editId } = useSavePost(editor, title, setTitle);

    return (
        <div className='create-box'>
            <input
                type='text'
                placeholder='제목을 입력하세요'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id='write-title'
            />
            <hr id='write-hr' />

            <EditorToolbar
                editor={editor}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                setAttachments={setAttachments}
            />

            <EditorBox editor={editor} />

            {attachments.length > 0 && (
                <div className='attachment-list'>
                    <ul>
                        {attachments.map((file, index) => (
                            <li key={index}>
                                <DeleteIcon
                                    className='file-delete'
                                    sx={{ fontSize: '0.8rem' }}
                                    onClick={() =>
                                        setAttachments((prev) => prev.filter((_, i) => i !== index))
                                    }
                                    title="삭제"
                                />
                                <a href={file.url} download={file.name} target="_blank" rel="noreferrer">
                                    {file.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                </div>
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
