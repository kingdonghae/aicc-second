import { useState, useEffect } from 'react';
import { getPostCountService, getPostListService } from "@/pages/board/services/getPostsService.js";

/**
 * 게시글 리스트 및 총 개수 조회 훅
 */
export const usePostList = () => {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState('');
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
                setTotalPages(Math.max(1, Math.ceil(count.data.count / limit)))
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
        setSearch(searchTerm);
    };
    return { searchTerm, setSearchTerm, posts, totalPages, loading, error, handleSearch, page, setPage, limit };
};

