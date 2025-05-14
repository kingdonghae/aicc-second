import React, { useState, useEffect } from 'react';
import '../../styles/Board.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigation } from '@/hook/useNavigation.js';
import PostTable from '@/pages/board/components/PostTable.jsx';
import Pagination from '@/pages/board/components/Pagination.jsx';
import {usePostList} from "@/pages/board/hook/usePosts.js";

const Board = () => {
  const { goWrite } = useNavigation();
  const { searchTerm, setSearchTerm, posts, totalPages, loading, error,handleSearch,page,setPage,limit } = usePostList();
  return (
      <div className="board-background">
        <div className="board-box">
          <section className="board-header">
            <div className="board-title">
              <h1>정보마당</h1>
              <p>와글와글 왁자지껄 함께 소통해요</p>
            </div>

            <div className="board-menu-box">
              <div className="content-search-box">
                <form style={{display:"flex",alignItems:"center"}} onSubmit={handleSearch}>
                  <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="content-search-btn">
                    <SearchIcon />
                  </button>
                </form>
              </div>
              <button type="submit" className="write-btn" onClick={goWrite}>글쓰기</button>
            </div>
          </section>

          <section className="contents">
            <div className="board-table">
              <PostTable
                posts={posts}
                totalPages={totalPages}
                setPage={setPage}
                page={page}
                loading={loading}
                error={error}
                limit={limit}
              />
            </div>

          </section>
        </div>
      </div>
  );
};

export default Board;
