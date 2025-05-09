import apiClient from "@/api/apiClient.js";


export const fetchUploadImages = (image) => {
    return apiClient.post('/upload-image', image, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const fetchSavePost = (content) => {
    return apiClient.post('/save-post', content);
};

export const fetchUpdatePost = (id, data) => {
    return apiClient.put(`/update-post/${id}`, data);
};
