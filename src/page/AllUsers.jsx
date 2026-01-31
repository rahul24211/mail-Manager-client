import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiurl}/allusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow p-4 mt-4">
        <h5 className="fw-bold mb-3">👥 All Users</h5>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="text-center py-4 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading users...
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        {!loading && (
          <div className="table-responsive">
            <table className="table align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((item, index) => (
                    <motion.tr
                      key={item.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className="text-capitalize"
                    >
                      <td>{item.id}</td>
                      <td className="fw-semibold">{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className={`badge px-3 py-2 ${
                            item.status === "Active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </motion.span>
                      </td>
                      <td>
                        <span className="badge bg-info">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllUsers;
