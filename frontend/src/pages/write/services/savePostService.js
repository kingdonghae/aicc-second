import {fetchSavePost, fetchUpdatePost} from "@/pages/write/api/postUploadApi.js";

export const savePostService = async (contentData) => {
    return await fetchSavePost(contentData);
};

export const updatePostService = async (editId, contentData) => {
    return await fetchUpdatePost(editId, contentData);
};
