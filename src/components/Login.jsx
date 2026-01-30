import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${apiUrl}/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      if (user.userType === "Admin") {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account, contect your seniour
          {/* <a href="/register">Register</a> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
