import {fetchSavePost} from "@/pages/write/api/postUploadApi.js";

export const savePostService = async ({ title, content, writer }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('writer', writer);

    const response = await fetchSavePost(formData)

    return response.data.url;
};

