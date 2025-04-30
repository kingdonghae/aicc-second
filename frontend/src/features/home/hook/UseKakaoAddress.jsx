import {getKakaoAddress} from "../services/HomeService.jsx";
import {useEffect, useState} from "react";

export const useKakaoAddress = (keyword, delay = 500) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword.trim()) {
            setResult([]);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(true);
            getKakaoAddress(keyword)
                .then((data) => {
                    console.log("API Response:", data);
                    setResult(data?.documents || []);
                })
                .catch((error) => {
                    console.error("Kakao address fetch error:", error);
                    setResult([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, delay);

        return () => clearTimeout(timer);
    }, [keyword, delay]);

    return { result, loading };
};