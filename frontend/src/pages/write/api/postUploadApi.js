import apiClient from "@/api/apiClient.js";

export const fetchUploadImages = (image) => {
    return apiClient.post('/upload-image', image, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const fetchUploadFile = (file) => {
    return apiClient.post('/upload-file', file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const fetchFileByFilename = (filename) => {
    return apiClient.get(`/api/files/${filename}`, {
        responseType: 'blob'
    });
};
export const fetchSavePost = (content) => {
    return apiClient.post('/save-post', content);
};

export const fetchUpdatePost = (id, data) => {
    return apiClient.put(`/update-post/${id}`, data);
};
