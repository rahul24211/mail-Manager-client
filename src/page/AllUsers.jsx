import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const mail = [
    {
      name: "rahul",
      email: "rahul@gmail.com",
      status: "Active",
    },
  ];

  const [user, setUser] = useState([]);
 const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const fetchUsers = async () => {
        const res = await axios.get(`${apiurl}/allusers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.users);
      };
      fetchUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <h5>All Users</h5>

        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>status</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {user !== null ? (
              user.map((item, index) => (
                <tr className="text-capitalize" key={item.id || index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        item.status === "Active"
                          ? "bg-success"
                          : item.status === "Inactive"
                            ? "bg-danger"
                            : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span className="badge bg-info">{item.createdAt}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>no mail found</td>
                <td>
                  <span className="badge bg-warning">no status</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
