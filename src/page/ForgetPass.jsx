import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const sendOtp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${apiUrl}/forgetpass`, {email});
      if (res.data.success === true) {
        navigate("/forgetpassverify");
      }
      localStorage.setItem("verifyEmail", email);
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
          <form onSubmit={sendOtp} className="card card-body">
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="btn btn-primary form-control mt-2">
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
