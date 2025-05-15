import React from 'react';
import { EditorContent } from '@tiptap/react';

const EditorBox = ({ editor }) => {
  return (
    <div className='text-box'>
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorBox;