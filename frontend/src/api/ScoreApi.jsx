import apiClient from "@/api/apiClient";

export const fetchScore = async (lat, lng) => {
  try {
    // 먼저 숫자로 변환한 후 toFixed() 사용
    const roundedLat = parseFloat(lat).toFixed(6);
    const roundedLng = parseFloat(lng).toFixed(6);

    // 타임아웃 시간 증가 (3초 → 10초)
    const { data } = await apiClient.post("/score", {
      lat: Number(roundedLat),
      lng: Number(roundedLng)
    }, {
      timeout: 10000  // 타임아웃 10초로 설정
    });
    return data;
  } catch (error) {
    // 오류 처리 개선
    if (error.code === 'ECONNABORTED') {
      console.error("⏱️ API 요청 타임아웃 (10초 초과):", error.message);
      throw new Error("서버 응답 시간이 너무 깁니다. 잠시 후 다시 시도해주세요.");
    } else {
      console.error("❌ API 요청 실패:", error.message);
      throw error;
    }
  }
};
