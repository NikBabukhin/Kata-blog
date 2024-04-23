import React from "react";
import {Pagination} from "@mui/material";

type PaginationBlockPropsType = {
    currentPage: number,
    changePage: (newPageNumber: number) => void,
    totalPages?: number,
}

const PaginationBlockMemoized:React.FC<PaginationBlockPropsType> = ({ currentPage, changePage, totalPages }) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        changePage(value)
    };

    return <Pagination
        count={totalPages || 1}
        color="primary"
        shape="rounded"
        page={currentPage}
        onChange={handleChange}
    />
}

export const PaginationBlock = React.memo(PaginationBlockMemoized)