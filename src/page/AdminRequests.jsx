import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container mt-4">
      <h4 className="fw-bold mb-3">Mail Requests</h4>

      <div className="card shadow-sm p-3">
        {/* Tabs */}
        <div className="btn-group flex-wrap mb-3">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              className={`btn btn-outline-primary ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()} ({data[tab].length})
            </button>
          ))}
        </div>

        {/* Responsive Table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {getActiveMails().length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No Data Found
                  </td>
                </tr>
              ) : (
                getActiveMails().map((mail) => (
                  <tr key={mail.id}>
                    <td>{mail.sender?.email || "-"}</td>

                    <td onClick={() => navigate(`/mailadminside/${mail.id}`)} className="">{mail.subject?.slice(0, 40)}</td>

                    <td
                      className=""
                    >
                      {mail.compose_mail?.slice(0, 40)}...
                    </td>

                    <td>
                      <span
                        className={`badge ${badgeClass(mail.status)}`}
                        style={{ minWidth: "100px" }}
                      >
                        {mail.status.toUpperCase()}
                      </span>
                    </td>

                    {/* <td>
                      {mail.status === "pending" && (
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-success btn-sm"
                            style={{ minWidth: "90px" }}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ minWidth: "90px" }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;
