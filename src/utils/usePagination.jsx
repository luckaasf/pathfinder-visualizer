import React, { useMemo } from "react";

function usePagination(totalCount, pageSize, siblingCount = 1, currentPage) {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) return range(1, totalPageCount);

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}

function range(start, end) {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
}

export default usePagination;