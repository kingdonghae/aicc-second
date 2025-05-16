import { useRef } from 'react';
import { uploadImageService } from "@/pages/write/services/uploadImageService.js";


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

        try {
            const dataUrl =  await uploadImageService(file);
            if (dataUrl) {
                editor.chain().focus().setImage({ src: `${import.meta.env.VITE_API_URL}${dataUrl}` }).run();
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