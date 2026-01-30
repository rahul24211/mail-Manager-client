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
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Welcome, {user.name} 👋</h2>
        <p className="text-muted">
          This is your mail approval dashboard.  
          You can send mails and track their approval status.
        </p>
      </div>

    <div className="row justify-content-center">
  <div className="col-md-4 d-flex">
    <div className="card shadow text-center p-4 w-100 d-flex flex-column h-100">
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
    <div className="card shadow text-center p-4 w-100 d-flex flex-column h-100">
      <h5>📄 My Mails</h5>
      <p className="text-muted flex-grow-1">
        View all your mails and their approval status.
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
