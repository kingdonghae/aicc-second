const Pagination = ({ page, setPage, totalCount, limit, blockSize = 10 }) => {
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const currentBlock = Math.floor((page - 1) / blockSize);
    const startPage = currentBlock * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPages);

    const goPrevBlock = () => {
        if (startPage > 1) setPage(startPage - 1);
    };

    const goNextBlock = () => {
        if (endPage < totalPages) setPage(endPage + 1);
    };

    return (
        <div className="pagination">
            <button onClick={goPrevBlock} disabled={startPage === 1}>{'<<'}</button>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>{'<'}</button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <button
                    key={startPage + i}
                    className={`page-number ${page === startPage + i ? 'active' : ''}`}
                    onClick={() => setPage(startPage + i)}
                >
                    {startPage + i}
                </button>
            ))}

            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>{'>'}</button>
            <button onClick={goNextBlock} disabled={endPage >= totalPages}>{'>>'}</button>
        </div>
    );
};

export default Pagination;
