import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationType = {
  curentPage: number;
  setCurentPage: (i: number) => void;
};

const Pagination: React.FC<PaginationType> = ({ curentPage, setCurentPage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => setCurentPage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={curentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
