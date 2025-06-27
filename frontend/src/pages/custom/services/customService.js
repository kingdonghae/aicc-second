import { fetchCustom } from "../api/customApi";

export const customSubmit = async ({ selectedItem, inputs, goCustomResult }) => {
    try {
        const response = await fetchCustom({ selectedItem, inputs });
        console.log("커스터마이징 요청 전송!");
        goCustomResult(selectedItem, inputs, response.data);
    } catch (err) {
        console.error("커스터마이징 요청 실패:", err)
    }
};