import SearchIcon from '@mui/icons-material/Search';
import PostTable from '@/pages/board/components/PostTable.jsx';
import { useNavigation } from '@/hook/useNavigation.js';
import { usePostList } from "@/pages/board/hook/usePosts.js";
import { useRequireLoginAction } from "@/hook/useRequireLoginAction.js";
import '@/styles/Board.css';

const Board = () => {
  const { goWrite } = useNavigation();
  const requireLoginAction = useRequireLoginAction();
  const handleGoWrite = () => {
    requireLoginAction(goWrite);
  };
  const { searchTerm, setSearchTerm, posts, totalPages, loading, error,handleSearch,page, setPage, limit } = usePostList();
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
                <form className="content-search-form" onSubmit={handleSearch}>
                  <input
                      type="text"
                      value={searchTerm}
                      style={{width:'80%', padding:'0 30px'}}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="content-search-btn">
                    <SearchIcon />
                  </button>
                </form>
              </div>
              <button type="submit" className="write-btn" onClick={handleGoWrite}>글쓰기</button>
            </div>
          </section>

          <section className="board-content">
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
