import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MailDashboard from "./MailDashboard";
import MailChartAdmin from "./MailChartAdmin";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
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
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Welcome Admin 👋</h2>

          <motion.span
            onClick={() => navigate("/banners")}
            style={{ marginRight: "5px", cursor: "pointer" }}
            className="fw-bold d-flex align-items-center gap-2"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <i className="bi bi-images text-primary fs-4"></i>
            Banners
          </motion.span>
        </div>

        <p className="text-muted mt-1">
          Manage users, requests and system activity from here
        </p>
      </div>

      {/* Info Cards */}
      <div className="row g-4">
        {/* Users */}
        <div className="col-md-3">
         <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/allusers")}
            className="info-card animate"
          >
            <i className="bi bi-people-fill icon text-primary"></i>

            <h5>Total Users</h5>
            <h3>{details.AllUser || 0}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div style={{cursor : "pointer"}}
            onClick={() => navigate("/adminrequest")}
            className="info-card animate delay-2"
          >
            <i className="bi bi-list-task icon text-secondary "></i>
            <h5>All Requests</h5>
            <h3>{details.AllRequest}</h3>
          </div>
        </div>

        {/* Pending */}
        <div style={{cursor : "pointer"}}
          onClick={() => navigate(`/adminrequest?tab=pending`)}
          className="col-md-3"
        >
          <div className="info-card animate delay-1">
            <i className="bi bi-hourglass-split icon text-warning"></i>
            <h5>Pending Requests</h5>
            <h3>{details.AllRequestPending}</h3>
          </div>
        </div>

        {/* Approved */}
        <div style={{cursor : "pointer"}}
          onClick={() => navigate("/adminrequest?tab=approved")}
          className="col-md-3"
        >
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
