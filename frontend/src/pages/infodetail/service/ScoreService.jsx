import { fetchSearchScore } from "../api/ScoreApi";

export const getSearchScore = async (lat, lng) => {
    const { data } = await fetchSearchScore({ lat, lng });
    return data
}