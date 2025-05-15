import { useState, useEffect } from "react";
import { fetchFacilities } from "../api/facilityApi";

export const useFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setLoading(true);
        const response = await fetchFacilities();
        setFacilities(response.data.facilities);
      } catch (err) {
        setError(err.message || "시설 데이터를 불러오는데 실패했습니다.");
        console.error("시설 데이터 로딩 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFacilities();
  }, []);

  return { facilities, loading, error };
};