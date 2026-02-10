import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  /* ---------------- VALIDATION ---------------- */

  const validate = (name, value) => {
    let error = "";

    if (name === "name" && value.trim().length < 3) {
      error = "Name must be at least 3 characters";
    }

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Enter a valid email address";
    }

    if (name === "userType" && !["Employee", "HR"].includes(value)) {
      error = "User type must be Employee or HR";
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  const isFormValid =
    Object.values(formData).every((v) => v) &&
    Object.values(errors).every((e) => !e);

  /* ---------------- SUBMIT ---------------- */

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const res = await axios.post(`${apiUrl}/createuser`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", userType: "" });
      setErrors({});
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating user");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button onClick={()=> navigate(-2)} className="btn btn-secondary mb-2">Back</button>
      <h2 className="mb-4 fw-bold">⚙️ Admin Panel</h2>

      {/* Alert */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="alert alert-info d-flex justify-content-between align-items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {message}
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer" }}
              onClick={() => setMessage("")}
            ></i>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="row">
        {/* FORM */}
        <motion.div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Create User</h4>

            <form onSubmit={handleCreateUser}>
              {/* NAME */}
              <div className="mb-3">
                <label>Name</label>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* USER TYPE */}
              <div className="mb-3">
                <label>User Type</label>
                <select
                  className={`form-select ${
                    errors.userType ? "is-invalid" : ""
                  }`}
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="Employee">Employee</option>
                  <option value="HR">HR</option>
                </select>
                {errors.userType && (
                  <div className="invalid-feedback">{errors.userType}</div>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <motion.button
                whileHover={isFormValid ? { scale: 1.03 } : {}}
                whileTap={isFormValid ? { scale: 0.95 } : {}}
                disabled={!isFormValid}
                className="btn btn-dark w-100"
              >
                Create User
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* SIDE CARD */}
        <motion.div className="col-md-5 d-flex align-items-center">
          <div className="card w-100 text-center p-4 shadow-sm">
            <motion.i
              className="bi bi-person-plus-fill text-primary"
              style={{ fontSize: "120px" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <h5 className="mt-3">Add New User</h5>
            <p className="text-muted">Only Employee & HR roles are allowed</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
