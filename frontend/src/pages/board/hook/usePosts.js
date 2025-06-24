import { useState, useEffect } from 'react';
import { getPostCountService, getPostListService } from "@/pages/board/services/getPostsService.js";

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
        const fetchPosts = async () => {
            setLoading(true);
            try {
                console.time('post list fetch');
                const list = await getPostListService(page, limit, search);
                console.timeEnd('post list fetch');
                setPosts(list);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [page, limit, search]);
    
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const count = await getPostCountService(search);
                setTotalPages(Math.max(1, Math.ceil(count.data.count / limit)));
            } catch (err) {
                setError(err);
            }
        };
        fetchCount();
    }, [search]);
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchTerm);
    };
    return { searchTerm, setSearchTerm, posts, totalPages, loading, error, handleSearch, page, setPage, limit };
};

