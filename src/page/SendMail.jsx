import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendMail = () => {
 const apiurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [mail, setMail] = useState({
    subject: "",
    composeMail: "",
    toEmailId: "",
  });

  const handleChange = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")
    const res = await axios.post(
      `${apiurl}/registerRequest`,
      {
        toEmailId: mail.toEmailId,
        subject: mail.subject,
        composeMail: mail.composeMail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Mail sent for approval");
    setMail({ subject: "", message: "" });
    navigate("/mymail")
  };

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>

      <div className="card shadow p-4 mt-3">
        <h5>Send Mail</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">To-Email-Id</label>
            <input
              type="text"
              className="form-control"
              name="toEmailId"
              value={mail.toEmailId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={mail.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="composeMail"
              rows="4"
              value={mail.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary">Send</button>
        </form>
      </div>

     
    </div>
  );
};

export default SendMail;
