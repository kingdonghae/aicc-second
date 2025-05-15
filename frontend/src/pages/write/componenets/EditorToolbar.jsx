// components/EditorToolbar.jsx
import React, { useState, useEffect, useRef } from 'react';
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
import AttachFileIcon from '@mui/icons-material/AttachFile';

const EditorToolbar = ({ editor, fileInputRef, handleFileChange, setAttachments }) => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const attachmentInputRef = useRef(null);

  useEffect(() => {
    if (!editor) return;
    const updateSelection = () => {
      setIsImageSelected(editor.isActive('image'));
    };
    editor.on('selectionUpdate', updateSelection);
    return () => editor.off('selectionUpdate', updateSelection);
  }, [editor]);

  const handleFileAttach = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    const fileName = file.name;


    setAttachments(prev => [...prev, { name: fileName, url: fileURL }]);

    e.target.value = '';
  };

  return (
    <div className='toolbar' style={{ position: 'relative' }}>
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
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}><FormatAlignLeftIcon /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}><FormatAlignCenterIcon /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}><FormatAlignRightIcon /></button>
      <button className='color-button'>
        <input type='color' onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
      </button>

      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
      />
      <button onClick={() => fileInputRef.current.click()}><ImageIcon /></button>

      <input
        type='file'
        accept='*'
        style={{ display: 'none' }}
        ref={attachmentInputRef}
        onChange={handleFileAttach}
      />
      <button onClick={() => attachmentInputRef.current.click()}><AttachFileIcon /></button>

      {isImageSelected && (
        <div className='image-float-toolbar'>
          <button onClick={() => editor.chain().focus().updateAttributes('image', { align: 'left' }).run()}><FormatAlignLeftIcon /></button>
          <button onClick={() => editor.chain().focus().updateAttributes('image', { align: 'center' }).run()}><FormatAlignCenterIcon /></button>
          <button onClick={() => editor.chain().focus().updateAttributes('image', { align: 'right' }).run()}><FormatAlignRightIcon /></button>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;