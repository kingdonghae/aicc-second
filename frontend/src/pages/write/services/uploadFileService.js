import { fetchUploadFile, fetchUploadImages} from "@/pages/write/api/postUploadApi.js";

export const uploadImageService = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetchUploadImages(formData)

    return response.data.url;
};

export const uploadFileService = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetchUploadFile(formData)

    return response.data;
};

