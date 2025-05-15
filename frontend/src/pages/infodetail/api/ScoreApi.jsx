// src/pages/infodetail/api/ScoreApi.jsx
import apiClient from "@/api/apiClient";

export const fetchScore = async (lat, lng) => {
  // 먼저 숫자로 변환한 후 toFixed() 사용
  const roundedLat = parseFloat(lat).toFixed(6);
  const roundedLng = parseFloat(lng).toFixed(6);

  const { data } = await apiClient.post("/score", { 
    lat: Number(roundedLat), 
    lng: Number(roundedLng) 
  });
  console.log("보내는 좌표:", roundedLat, roundedLng);
  return data;
};
