import { useEffect, useState } from 'react';
import { getSearchRank } from '../services/RankService';

export const useSearchRank = () => {
    const [Ranks, setRanks] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const data = await getSearchRank();
            setRanks(data);
        }
        fetchPosts();
    }, []);

    return Ranks;
};
