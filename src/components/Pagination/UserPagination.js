import React, { useEffect } from "react";
import { Form, Pagination } from "react-bootstrap";
import "./UserPagination.css"

export default function UserPagination({ pageCount, currentPage, setCurrentPage, totalUsers, setPageSize, dataRange, searchQuery, setSearchQuery }) {
  let active = currentPage;
  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item 
      onClick={() => setCurrentPage(number)}
      key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    setSearchQuery("");

  }
  , [currentPage]);

  const paginationBasic = (
    <div className="d-flex flex-lg-row flex-column justify-content-center">
      <span className="d-inline-block me-lg-4 mt-1 mx-lg-0 mx-auto mb-lg-0 mb-4">
        <strong>{dataRange}</strong>
      </span>
      <Pagination className="pagination-list mx-lg-0 mx-auto">{items}</Pagination>
      <div className="ms-lg-5 mx-lg-0 mx-auto mb-lg-0 mb-4">
        <span className="me-lg-3 me-2">Show</span>
        <Form.Select
          onChange={(e) => {
            setPageSize(e.target.value);
            setCurrentPage(1);
          }}
          className="select-pagination d-inline-block"
          aria-label="Default select example"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value={totalUsers}>All</option>
        </Form.Select>
        <span className="ms-2">entries</span>
      </div>
      <Form>
        <Form.Group className="mb-lg-3 ms-lg-4 search-input" controlId="exampleForm.ControlInput1">
          <Form.Control 
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
           type="text" placeholder="Search" />
        </Form.Group>
        
      </Form>
    </div>
  );

  return paginationBasic;
}
