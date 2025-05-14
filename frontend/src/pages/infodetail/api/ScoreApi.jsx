// src/pages/infodetail/api/ScoreApi.jsx
import apiClient from "@/api/apiClient";

export const fetchScore = async (lat, lng) => {
  const { data } = await apiClient.post("/score", { lat, lng });
  console.log("보내는 좌표:", lat, lng);
  return data; // ✅ { population: 3, rent: 7, ... }
};
