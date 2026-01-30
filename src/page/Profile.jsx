import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Profile = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [details, setDetails] = useState({});

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
 const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const res = await axios.get(`${apiurl}/userdetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDetails(res.data.userDetails);
        
      };
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const clButton = (e) => {
    e.preventDefault();
    setMessage("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${apiurl}/changepassword`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating user");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      {message && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          {message} <i className="bi bi-x-lg" onClick={clButton}></i>
        </div>
      )}

      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-lg rounded-4 border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center  mb-4 fw-bold"
                    >
                      👤 My Profile
                    </motion.h3>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`${details.status === "Inactive"} ? hello : motion-heading  text-left mb-4`}
                    >
                      {details.status}
                    </motion.h3>
                  </div>

                  {/* User Details */}
                  <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                  >
                    <h5 className="fw-semibold mb-3">User Details</h5>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={details.name}
                        disabled
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={details.email}
                        disabled
                      />
                    </div>
                  </motion.div>

                  <hr />

                  {/* Change Password */}
                  <motion.form
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onSubmit={handlePasswordChange}
                  >
                    <h5 className="fw-semibold mb-3">🔒 Change Password</h5>
                    <div className="mb-3">
                      <label className="form-label">Old Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="oldPassword"
                        value={form.oldPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <button className="btn btn-primary w-100 rounded-pill">
                      Update Password
                    </button>
                  </motion.form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
