import React, { useMemo } from "react";

const Pagination = ({ totalCount, pageSize, siblingCount = 1, currentPage })  => {

    const range = (start, end) => {
        let length = (end - start) + 1;
        
        return Array.from({ length }, (_, idx) => idx + start);
    }

    const paginationRange = useMemo(() => {

        const totalPageCount = Math.ceil(totalCount / pageSize);

    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange; // paginationRange is the range of grids to be displayed as an array on the gridlist route
}

export default Pagination;
