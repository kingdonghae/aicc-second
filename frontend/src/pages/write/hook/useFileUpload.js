import {useRef, useState} from 'react';
import { uploadFileService, uploadImageService} from '@/pages/write/services/uploadFileService';

const useFileUpload = (editor) => {
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const triggerImageInput = () => imageInputRef.current?.click();
    const triggerFileInput = () => fileInputRef.current?.click();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !editor) return;

        try {
            const imageUrl = await uploadImageService(file);
            if (imageUrl) {
                editor.chain().focus().setImage({ src: `${import.meta.env.VITE_API_URL}${imageUrl}` }).run();
            }
        } catch (err) {
            console.error('이미지 업로드 실패:', err);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await uploadFileService(file);
            setUploadedFiles((prev) => [...prev, result]);
        } catch (err) {
            console.error('파일 업로드 실패:', err);
        }
    };

    const createAttachmentDeleteHandler = (setUploadedFiles) => (fileToDelete) => {
        setUploadedFiles((prev) =>
            prev.filter((file) => file.filename !== fileToDelete.filename)
        );
    };
    const onDelete = createAttachmentDeleteHandler(setUploadedFiles);

    return {
        triggerImageInput,
        triggerFileInput,
        handleImageChange,
        handleFileChange,
        onDelete,
        imageInputRef,
        fileInputRef,
        uploadedFiles,
        setUploadedFiles
    };
};

export default useFileUpload;
