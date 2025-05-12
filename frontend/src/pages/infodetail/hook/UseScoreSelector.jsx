import { useEffect } from "react";
import { getSearchScore } from "../service/ScoreService";


export function UseScoreSelector({ lat, lng, onSuccess }) {
    useEffect(() => {
      if (!lat || !lng) return;

        const fetchData = async () => {
          try {
            const data = await getSearchScore(lat, lng);
            console.log("받은 데이터:", data);
            onSuccess?.(data);
          } catch (err) {
            console.error("오류 발생:", err);
          }
        };
      
        fetchData();
      }, []);
}