import React from 'react';
import { EditorContent } from '@tiptap/react';

const EditorBox = ({editorRef, editor }) => {
  return (
    <div className='text-box'>
      <EditorContent ref={editorRef} editor={editor} />
    </div>
  );
};

export default EditorBox;