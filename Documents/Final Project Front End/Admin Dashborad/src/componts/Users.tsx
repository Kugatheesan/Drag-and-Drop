import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Users.css'

// User interface
interface User {
  id: number;
  username: string;
  email: string;
}

const Users: React.FC = () => {      //React Functional component
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false); //conform deleted popup
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); //store by deleted user ID

  useEffect(() => {
    // Fetch users when component mounts
    axios
      .get("http://localhost:3000/api/users/get") 
      .then((response) => {
        setUsers(response.data.sort((a: User, b: User) => a.id - b.id)); //align the id order
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (id: number) => {
    setUserIdToDelete(id);
    setShowModal(true); //delete button poup
  };

  const confirmDelete = () => {
    if (userIdToDelete !== null) { //check the null
      axios
      .delete(`http://localhost:3000/api/users/get/${userIdToDelete}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter(user => user.id !== userIdToDelete));    
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setShowModal(false);
        });
    }
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div className="content">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this user?</h3>
            <div className="modal-actions">
              <button className="modal-button cancel" onClick={cancelDelete}>Cancel</button>
              <button className="modal-button confirm" onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
