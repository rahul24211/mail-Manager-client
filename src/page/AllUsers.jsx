import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const apiurl = import.meta.env.VITE_API_URL;

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${apiurl}/updateuserstatus`,
        { id, status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // UI update (important)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user,
        ),
      );
    } catch (error) {
      console.log(error.message);
      alert("Status update failed");
    }
  };

  const fetchUsers = async (value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiurl}/allusers?search=${value}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(search);
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow p-4 mt">
        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-2">
          Back
        </button>

        <div className="4 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-3">👥 All Users </h5>
          <input
            style={{ borderRadius: "20px", width: "250px" }}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search.."
          />
        </div>

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
          <div
            style={{ overflow: "auto", maxHeight: "400px" }}
            className="table-responsive"
          >
            <table className="table align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>LoginTime</th>
                  <th>LogoutTime</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((item, index) => {
                    const log = item.LoginLogs?.[0];
                    return (
                      <motion.tr
                        key={item.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        className="text-capitalize"
                      >
                        <td className="text-primary">#{item.id}</td>
                        <td className="fw-semibold">{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <motion.span
                            key={item.status}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`fw-bold ${
                              item.status === "Active"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {item.status}
                          </motion.span>

                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleToggleStatus(item.id, item.status)
                            }
                            className={`btn btn-sm ms-2 ${
                              item.status === "Active"
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            }`}
                          >
                            {item.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </motion.button>
                        </td>

                        <td>
                          <span className="badge bg-info">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success">
                            {log?.loginTime
                              ? new Date(
                                  item.LoginLogs[0].loginTime,
                                ).toLocaleString()
                              : "No-Login"}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-danger">
                            {!log
                              ? "No-Login"
                              : log.logoutTime
                                ? new Date(log.logoutTime).toLocaleString()
                                : "Active"}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
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
