import React from "react";
import ReactPaginate from 'react-paginate';

export default function ReactPagination({ handlePageClick, data, selected }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      pageCount={Math.ceil(data?.totalElements / 20)}
      previousLabel="<<"
      renderOnZeroPageCount={null}
      className="paginationUL"
      activeClassName="active"
      forcePage={selected}
    />
  )
}