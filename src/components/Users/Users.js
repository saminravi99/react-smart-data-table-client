import React, { useEffect, useState } from "react";
import UserPagination from "../Pagination/UserPagination";
import "./Users.css";
import UsersTable from "./UsersTable";

const Users = () => {
  const [pageCount, setPageCount] = useState(0);
  console.log(pageCount);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  console.log(pageSize);
  console.log(users);
  const [dataRange, setDataRange] = useState("");

  useEffect(() => {
    if (pageSize === "10") {
      fetch(`http://localhost:5000/users/count`)
        .then((res) => res.json())
        .then((data) => {
          setPageCount(Math.ceil(data.count / 10));
          setTotalUsers(data.count);
        });
    }
  }, [pageCount, pageSize]);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, [currentPage, pageSize, totalUsers, users]);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${pageSize}/${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .then(() => {
        if (pageSize !== "10") {
          setPageCount(Math.ceil(totalUsers / pageSize));
        }
      });
  }, [currentPage, pageSize, pageCount, totalUsers]);

  return (
    <div className="my-5">
      <UserPagination
        dataRange={dataRange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalUsers={totalUsers}
        pageSize={pageSize}
        setPageSize={setPageSize}
      ></UserPagination>
      <div className="container">
        <UsersTable
          users={users}
          allUsers={allUsers}
          setDataRange={setDataRange}
          totalUsers={totalUsers}
          searchQuery={searchQuery}
        ></UsersTable>
      </div>
    </div>
  );
};

export default Users;
