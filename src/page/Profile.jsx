import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [address, setAddress] = useState({
    phoneN: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
  });

  const [addDetails, setAddDetails] = useState({});
  const navigate = useNavigate();

  const [details, setDetails] = useState({});
  const token = localStorage.getItem("token");
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    const res = await axios.get(`${apiurl}/userdetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDetails(res.data.userDetails);
  };

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
      toast.success(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating user");
    }
  };

  const fetchAddDetails = async () => {
    const res = await axios.get(`${apiurl}/getaddress`, {
      headers: { Authorization: `bearer ${token}` },
    });
    setAddDetails(res.data);
  };

  useEffect(() => {
    fetchAddDetails();
  }, []);

  const editeProfile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.patch(`${apiurl}/updateprofilephoto`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      setRefreshKey(Date.now());
      await fetchDetails();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onchange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isEmpty = (obj) => {
    return Object.values(obj).every((value) => value === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEmpty(address)) {
        toast.error("Please Fill Atleast One Field");
        return;
      }
      const res = await axios.post(`${apiurl}/addaddress`, address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      setAddress({
        phoneN: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
      });
      fetchAddDetails();
    } catch (error) {
      toast.error(error.res?.data?.message || "Error creating user");
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-secondary mb-2 form-control mt-2"
              >
                Back
              </button>
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

                    <div className="col-md-4">
                      <div className="position-relative d-inline-block">
                        <img
                          src={`${apiurl}${details.image}?t=${refreshKey}`}
                          className="rounded-circle"
                          style={{
                            height: "120px",
                            width: "120px",
                            objectFit: "cover",
                          }}
                          alt="Profile"
                        />

                        <input
                          id="fileUpload"
                          className="d-none"
                          type="file"
                          accept="image/*"
                          onChange={(e) => editeProfile(e.target.files[0])}
                        />
                        <label
                          htmlFor="fileUpload"
                          className="position-absolute rounded-circle p-2"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </label>
                      </div>
                    </div>
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
                        // placeholder={`Your Password : ${details.password}`}
                        minLength={6}
                        required
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
                        minLength={6}
                        required
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

      <div className="container d-flex gap-5 mt-5 ">
        <motion.div
          initial={{ x: -40, opacity: 0, y: 50 }}
          animate={{ x: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          id="addCard"
          className="card-body card shadow-lg rounded-4 border-0 p-4 d-flex justify-content-between align-items-center "
        >
          <h3>Add & Update Your Address Details</h3>
          <form onSubmit={handleSubmit} className="m-auto w-100">
            <input
              className="form-control text-capitalize "
              type="text"
              name="phoneN"
              value={address.phoneN}
              placeholder="enter phoneN"
              onChange={onchange}
            />
            <input
              className="form-control mt-2 text-capitalize"
              type="text"
              name="line1"
              value={address.line1}
              placeholder="enter line1"
              onChange={onchange}
            />
            <input
              className="form-control mt-2 text-capitalize"
              type="text"
              name="line2"
              value={address.line2}
              placeholder="enter line2"
              onChange={onchange}
            />
            <input
              className="form-control mt-2 text-capitalize"
              type="text"
              name="city"
              value={address.city}
              placeholder="enter city"
              onChange={onchange}
            />
            <input
              className="form-control mt-2 text-capitalize"
              type="text"
              value={address.state}
              name="state"
              placeholder="enter state"
              onChange={onchange}
            />
            <button className="form-control mt-2 btn btn-success">
              Submite
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0, y: 50 }}
          animate={{ x: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          id="addCard"
          className="card-body card shadow-lg rounded-4 border-0 p-4  "
        >
          <h3 className="text-center"> Your Address Details</h3>

          <form>
            <label className="ms-1">Phone Number</label>
            <input
              className="form-control"
              type="text"
              value={addDetails.checkAddress?.phoneN || "Add Your Number"}
              readOnly
            />
            <label className="ms-1">Line 1</label>
            <input
              className="form-control"
              type="text"
              value={addDetails.checkAddress?.line1 || "Add Your Details.."}
              readOnly
            />
            <label className="ms-1">Line 2</label>
            <input
              className="form-control"
              type="text"
              value={addDetails.checkAddress?.line2 || "Add Your Details.."}
              readOnly
            />
            <label className="ms-1">City</label>
            <input
              className="form-control"
              type="text"
              value={addDetails.checkAddress?.city || "Add Your City.."}
              readOnly
            />
            <label className="ms-1">State</label>
            <input
              className="form-control"
              type="text"
              value={addDetails.checkAddress?.state || "Add Your State.. "}
              readOnly
            />
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
