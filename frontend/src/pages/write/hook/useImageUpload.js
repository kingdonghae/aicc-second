import { useRef } from 'react';

const useImageUpload = (editor) => {
    const fileInputRef = useRef(null);

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !editor) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data?.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
            }
        } catch (err) {
            console.error('이미지 업로드 실패:', err);
        }
    };

    return {
        fileInputRef,
        triggerFileInput,
        handleFileChange,
    };
};

export default useImageUpload;