import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "./UsersTable.css";

const UsersTable = ({
  users,
  allUsers,
  setDataRange,
  totalUsers,
  searchQuery,
}) => {
  //Filter index of the users from all users
  console.log(users);
  // const [initialIndex, setInitialIndex]   = useState(0);
  // const [finalIndex, setFinalIndex]       = useState(0);

  const firstUserIndex = allUsers.findIndex(
    (user) => user._id === users[0]._id
  );
  const lastUserIndex = allUsers.findIndex(
    (user) => user._id === users[users.length - 1]._id
  );

  let filteredUsers;
  //USe Search query to filter users by any field
  if (searchQuery !== "") {
      filteredUsers = allUsers.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.age
            .toString()
            .toLowerCase()
            .includes(searchQuery.toString().toLowerCase()) ||
          user.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  }
  console.log(filteredUsers)

  useEffect(() => {
    setDataRange(`
        Showing ${firstUserIndex + 1} to ${lastUserIndex + 1} 
         of ${totalUsers} entries`);
  }, [totalUsers, firstUserIndex, lastUserIndex]);

  let usersList;

  if (!filteredUsers) {
    usersList = users.map((user) => {
      return (
        <tr className="text-center" key={user._id}>
          <td>{allUsers.findIndex((x) => x._id === user._id) + 1}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
          <td>{user.address}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.company}</td>
          <td>{user.slary}</td>
        </tr>
      );
    });
  } else {
    usersList = filteredUsers.map((user) => {
      return (
        <tr className="text-center" key={user._id}>
          <td>{allUsers.findIndex((x) => x._id === user._id) +1}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
          <td>{user.address}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.company}</td>
          <td>{user.slary}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
