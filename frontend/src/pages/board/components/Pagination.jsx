import React from 'react';

const Pagination = React.memo(({ page, setPage, totalPages, limit, blockSize = 10 }) => {
    const currentBlock = Math.floor((page - 1) / blockSize);
    const startPage = currentBlock * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPages);

    const hasPrevBlock = startPage > 1;
    const hasNextBlock = endPage < totalPages;

    const goPrevBlock = () => {
        if (hasPrevBlock) {
            setPage(startPage - blockSize);
        } else {
            setPage(startPage);
        }
    };

    const goNextBlock = () => {
        if (hasNextBlock) {
            setPage(endPage + 1);
        } else {
            setPage(totalPages);
        }
    };

    return (
        <div className="pagination">
            <button
                onClick={goPrevBlock}
                disabled={!hasPrevBlock && page === startPage}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {'<<'}
            </button>
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {'<'}
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <button
                    key={startPage + i}
                    className={`page-number ${page === startPage + i ? 'active' : ''}`}
                    onClick={() => setPage(startPage + i)}
                >
                    {startPage + i}
                </button>
            ))}

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {'>'}
            </button>
            <button
                onClick={goNextBlock}
                disabled={!hasNextBlock && page === totalPages}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {'>>'}
            </button>
        </div>
    );
});

export default Pagination;
