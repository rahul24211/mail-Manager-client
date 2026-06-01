import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgetPassVerify = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    otp: "",
    password: "",
  });
  const navigate = useNavigate();
  const email = localStorage.getItem("verifyEmail");

  const onchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const verifyOtp = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${apiUrl}/forgetpassverify`, {
        email,
        otp: form.otp,
        password: form.password,
      });

      if (res.data.success === true) {
        navigate("/userdashboard");
      }
      localStorage.removeItem("verifyEmail");
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <form onSubmit={verifyOtp} className="card card-body">
            <input
              className="form-control"
              type="email"
              placeholder={`OTP Sent TO ${email}`}
              readOnly
            />
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Enter Password"
              value={form.password}
              onChange={onchange}
              name="password"
            />
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={onchange}
              name="otp"
            />
            <button className="btn btn-primary form-control mt-2">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassVerify;
