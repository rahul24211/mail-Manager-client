import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clButton = (e) => {
    e.preventDefault();
    console.log("butotn clicked");

    setMessage("");
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(` ${apiUrl}/createuser`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", userType: "" });
      setTimeout(() => {
        setMessage("");
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating user");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel</h2>

      {message && (
        <div className="alert alert-info d-flex justify-contet-between align-items-center">
          {message} <i className="bi bi-x-lg" onClick={clButton}></i>
        </div>
      )}

      <div className="row">
        {/* LEFT SIDE – FORM */}
        <div className="col-md-7">
          <div className="card p-4">
            <h4 className="mb-3">Create User</h4>

            <form onSubmit={handleCreateUser}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>User Type</label>
                <input
                  type="text"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <button className="btn btn-dark w-100">Create User</button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE – BIG ICON */}
        <div className="col-md-5 d-flex align-items-center">
          <div className="card w-100 text-center p-4">
            <i
              className="bi bi-person-plus-fill text-primary"
              style={{ fontSize: "120px" }}
            ></i>

            <h5 className="mt-3">Add New User</h5>
            <p className="text-muted">
              Create users and assign roles easily from admin panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
