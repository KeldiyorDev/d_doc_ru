import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({ totalElements, size, selected, handlePageClick }) {
    return (
        <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            pageCount={totalElements / size}
            breakLabel="..."
            className="paginate"
            activeClassName="active"
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={selected}
        />
    )
}
