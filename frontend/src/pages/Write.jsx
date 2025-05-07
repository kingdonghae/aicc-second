import React, { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ImageIcon from '@mui/icons-material/Image';
import '../styles/Write.css'



const Write = () => {
    const [title, setTitle] = useState('');

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
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),

            Image.configure({
                inline: false,
                allowBase64: true,
            }),
        ],
        content: '<p><양식><br/>- 내 거주지역 : <br/>- 평가 : 상 / 중 / 하</p>',
    });

    const handleSave = () => {
        console.log('제목:', title);
        console.log('내용:', editor.getHTML());
    };

    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            editor.chain().focus().setImage({ src: base64 }).run();
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='write-page'>
            <div className='write-box'>

                <div className='content-box'>
                    <div>
                        <input type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id='write-title' />
                    </div>
                    <hr id='write-hr' />
                    <div className="toolbar">
                        <button onClick={() => editor.chain().focus().toggleBold().run()}><FormatBoldIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()}><FormatItalicIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleStrike().run()}><StrikethroughSIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleUnderline().run()}><FormatUnderlinedIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleCode().run()}><CodeIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><TitleIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulletedIcon /></button>
                        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}><FormatQuoteIcon /></button>
                        <button onClick={() => editor.chain().focus().undo().run()}><UndoIcon /></button>
                        <button onClick={() => editor.chain().focus().redo().run()}><RedoIcon /></button>
                        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                            <FormatAlignLeftIcon />
                        </button>
                        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                            <FormatAlignCenterIcon />
                        </button>
                        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                            <FormatAlignRightIcon />
                        </button>
                        <button className="color-button">
                            <input
                                type="color"
                                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                            />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        <button onClick={() => fileInputRef.current.click()}>
                            <ImageIcon />
                        </button>

                    </div>


                    <div className='text-box'>
                        <EditorContent editor={editor} />
                    </div>

                    <div className='button-group'>
                        <button onClick={handleSave} id='save-button'>
                            저장
                        </button>
                        <button onClick={handleSave} id='cancel-button'>
                            취소
                        </button>
                        {/* <input type="range" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;