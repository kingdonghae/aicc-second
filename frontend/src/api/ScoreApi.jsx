import apiClient from "@/api/apiClient";

export const fetchScore = async (lat, lng) => {
  try {
    const roundedLat = parseFloat(lat).toFixed(6);
    const roundedLng = parseFloat(lng).toFixed(6);

    const { data } = await apiClient.post("/score", {
      lat: Number(roundedLat),
      lng: Number(roundedLng)
    }, {
      timeout: 5000 
    });
    return data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error("⏱️ API 요청 타임아웃 (5초 초과):", error.message);
      throw new Error("서버 응답 시간이 너무 깁니다. 잠시 후 다시 시도해주세요.");
    } else {
      console.error("❌ API 요청 실패:", error.message);
      throw error;
    }
  }
};
