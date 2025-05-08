import { useState, useEffect } from 'react';
import {getPostCountService, getPostListService} from "@/pages/board/services/getPostsService.js";

/**
 * 게시글 리스트 및 총 개수 조회 훅
 */
export const usePostList = (search='' ) => {
    const [posts, setPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const limit = 8;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [list, count] = await Promise.all([
                    getPostListService(page, limit, search),
                    getPostCountService(search)
                ]);
                setPosts(list);
                setTotalCount(count.data.count);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, limit, search]);
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // 검색 시 1페이지로 초기화
    };
    return { searchTerm, setSearchTerm, posts, totalCount, loading, error,handleSearch,page,setPage,limit };
};

