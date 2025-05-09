import { useEffect } from "react";
import { getSearchScore } from "../service/ScoreService";


export function UseScoreSelector() {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getSearchScore(37.5665, 126.9780);
            console.log("받은 데이터:", data);
          } catch (err) {
            console.error("오류 발생:", err);
          }
        };
      
        fetchData();
      }, []);
}