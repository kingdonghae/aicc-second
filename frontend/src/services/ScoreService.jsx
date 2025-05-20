
import { fetchScore } from "../api/ScoreApi";

export const getScore = async (lat, lng) => {
  try {
    const data = await fetchScore(lat, lng);
    return data;
  } catch (error) {
    console.error("❌ 점수 요청 실패:", error.response?.data);
    throw error;
  }
};
