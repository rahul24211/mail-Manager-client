import axios from "axios";
import React from "react";
import { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOtp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("verifyEmail");

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${apiUrl}/verifyotp`,
        {
          otp,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success === true) {
        navigate("/register");
        localStorage.removeItem("verifyEmail");
      }

      toast.success(res.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
      console.log(error);
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
              readOnly
              placeholder={`${email}`}
            />
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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

export default VerifyOtp;
