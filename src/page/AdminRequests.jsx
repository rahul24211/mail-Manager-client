import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminRequests = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    all: [],
    pending: [],
    approved: [],
    rejected: [],
  });

  const [activeTab, setActiveTab] = useState("all");
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMail = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiurl}/getallrequest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.data);
    };
    fetchMail();
  }, []);

  const getActiveMails = () => data[activeTab] || [];

  const badgeClass = (status) => {
    if (status === "Approve") return "bg-success";
    if (status === "Reject") return "bg-danger";
    if (status === "Pending") return "bg-info";
    return "bg-warning text-dark";
  };

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="fw-bold mb-3">📩 Mail Requests</h4>

      <div className="card shadow-sm p-3">
        {/* Tabs */}
        <div className="btn-group flex-wrap mb-3">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              key={tab}
              className={`btn btn-outline-primary ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()} ({data[tab].length})
            </motion.button>
          ))}
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              <motion.tbody
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {getActiveMails().length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  getActiveMails().map((mail, index) => (
                    <motion.tr
                      key={mail.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{mail.sender?.email || "-"}</td>

                      <td
                        onClick={() =>
                          navigate(`/mailadminside/${mail.id}`)
                        }
                        className="text-primary fw-semibold"
                      >
                        {mail.subject?.slice(0, 40)}
                      </td>

                      <td>{mail.compose_mail?.slice(0, 40)}...</td>

                      <td>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className={`badge ${badgeClass(mail.status)}`}
                          style={{ minWidth: "100px" }}
                        >
                          {mail.status.toUpperCase()}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRequests;
