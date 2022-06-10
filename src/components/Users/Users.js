import React, { useEffect, useState } from "react";
import UserPagination from "../Pagination/UserPagination";
import "./Users.css";
import UsersTable from "./UsersTable";

const Users = () => {
  const [pageCount, setPageCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [dataRange, setDataRange] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (pageSize === "10") {
      fetch(`https://react-smart-data-table.herokuapp.com/users/count`)
        .then((res) => res.json())
        .then((data) => {
          setPageCount(Math.ceil(data.count / 10));
          setTotalUsers(data.count);
        });
    }
  }, [pageCount, pageSize]);

  useEffect(() => {
    fetch(`https://react-smart-data-table.herokuapp.com/users`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, [currentPage, pageSize, totalUsers, users]);

  useEffect(() => {
    setReload(true);
    fetch(
      `https://react-smart-data-table.herokuapp.com/users/${pageSize}/${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setReload(false);
      })
      .then(() => {
        if (pageSize !== "10") {
          setPageCount(Math.ceil(totalUsers / pageSize));
        }
      });
  }, [currentPage, pageSize, pageCount, totalUsers]);

  return (
    <div className="my-5">
      <div className="nav-bar">
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
      </div>
      <div className="container">
        <UsersTable
          users={users}
          allUsers={allUsers}
          setDataRange={setDataRange}
          reload={reload}
          totalUsers={totalUsers}
          searchQuery={searchQuery}
        ></UsersTable>
      </div>
    </div>
  );
};

export default Users;
