import { useEffect, useState } from 'react';
import { getSearchALLRank } from '../services/RankService';

export const useAllRank = () => {
    const [Ranks, setRanks] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const data = await getSearchALLRank();
            setRanks(data);
        }
        fetchPosts();
    }, []);

    return Ranks;
};
