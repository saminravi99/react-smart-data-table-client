import React, { useEffect } from "react";
import { Form, Pagination } from "react-bootstrap";
import "./UserPagination.css"

export default function UserPagination({ pageCount, currentPage, setCurrentPage, totalUsers, setPageSize, dataRange, searchQuery, setSearchQuery }) {
  let active = currentPage;
  console.log(dataRange);
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
    <div className="d-flex justify-content-center">
      <span className="d-inline-block me-4 mt-1">
        <strong>{dataRange}</strong>
      </span>
      <Pagination>{items}</Pagination>
      <div className="ms-5 ">
        <span className="me-3">Show</span>
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
        <Form.Group className="mb-3 ms-4" controlId="exampleForm.ControlInput1">
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
