import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  /* ---------------- VALIDATION ---------------- */

  const validate = (name, value) => {
    let error = "";

    if (
      name === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = "Enter a valid email address";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setLoading(true);

      const res = await axios.post(`${apiUrl}/login`, formData);

      const { token, user, message } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(message);
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        if (user.userType === "Admin") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }
      }, 800);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Alert */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="alert alert-info d-flex justify-content-between align-items-center text-capitalize"
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

      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
        <motion.div
          className="card shadow p-4"
          style={{ width: "400px" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-center mb-3 fw-bold">🔐 Login</h3>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${
                  errors.email ? "is-invalid" : ""
                }`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={!isFormValid || loading}
              whileHover={isFormValid ? { scale: 1.03 } : {}}
              whileTap={isFormValid ? { scale: 0.95 } : {}}
              className="btn btn-dark w-100"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="text-center mt-3 mb-0 text-muted">
            Don’t have an account? Contact your senior
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
