import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container mt-5 fade-in">
      {/* Welcome Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold slide-down">
          Welcome, {user.name} 👋
        </h2>
        <p className="text-muted">
          Manage your mails, send requests and track approval status easily.
        </p>
      </div>

      {/* Stats */}
      <div className="row mb-4 text-center">
        <div className="col-md-4">
          <div className="card shadow-sm p-3 hover-card">
            <h6 className="text-muted">Role</h6>
            <h5 className="fw-bold text-primary">{user.userType}</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 hover-card">
            <h6 className="text-muted">Status</h6>
            <h5 className="fw-bold text-success">Active</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 hover-card">
            <h6 className="text-muted">Dashboard</h6>
            <h5 className="fw-bold text-dark">User Panel</h5>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="row justify-content-center g-4">
        <div className="col-md-4 d-flex">
          <div className="card shadow text-center p-4 w-100 d-flex flex-column hover-card">
            <h5>📧 Send Mail</h5>
            <p className="text-muted flex-grow-1">
              Compose a new mail and send it for admin approval.
            </p>
            <button
              className="btn btn-primary w-100 mt-auto"
              onClick={() => navigate("/sendmail")}
            >
              Send Mail
            </button>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card shadow text-center p-4 w-100 d-flex flex-column hover-card">
            <h5>📄 My Mails</h5>
            <p className="text-muted flex-grow-1">
              View all your mails and track approval status.
            </p>
            <button
              className="btn btn-success w-100 mt-auto"
              onClick={() => navigate("/mymail")}
            >
              My Mails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
