import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MailDashboard from "./MailDashboard";
import MailChartAdmin from "./MailChartAdmin";

const AdminDashboard = () => {
  const [details, setDetails] = useState({});
  const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${apiurl}/getsummary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDetails(res.data.AllDetails);
      } catch (error) {
        console.error("Summary error", error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Welcome Admin 👋</h2>
        <p className="text-muted">
          Manage users, requests and system activity from here
        </p>
      </div>

      {/* Info Cards */}
      <div className="row g-4">
        {/* Users */}
        <div className="col-md-3">
          <div className="info-card animate">
            <Link to="/allusers">
              {" "}
              <i className="bi bi-people-fill icon text-primary"></i>
            </Link>
            <h5>Total Users</h5>
            <h3>{details.AllUser || 0}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="info-card animate delay-2">
            <i className="bi bi-list-task icon text-secondary"></i>
            <h5>All Requests</h5>
            <h3>{details.AllRequest}</h3>
          </div>
        </div>

        {/* Pending */}
        <div className="col-md-3">
          <div className="info-card animate delay-1">
            <i className="bi bi-hourglass-split icon text-warning"></i>
            <h5>Pending Requests</h5>
            <h3>{details.AllRequestPending}</h3>
          </div>
        </div>

        {/* Approved */}
        <div className="col-md-3">
          <div className="info-card animate delay-2">
            <i className="bi bi-check-circle-fill icon text-success"></i>
            <h5>Approved</h5>
            <h3>{details.AllRequestApprove}</h3>
          </div>
        </div>
      </div>
      <MailChartAdmin />
      {/* Bottom Section */}
      <div className="card mt-5 p-4 animate delay-3">
        <h5>Quick Actions</h5>
        <ul className="mb-0">
          <li>Create new users</li>
          <li>Check pending mails</li>
          <li>Manage roles & permissions</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
