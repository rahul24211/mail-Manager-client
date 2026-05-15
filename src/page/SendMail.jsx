import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SendMail = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [mail, setMail] = useState({
    toEmailId: "",
    subject: "",
    composeMail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mail.toEmailId.includes("@")) {
      return toast.error("Please enter a valid email address");
    }

    if (mail.subject.length < 3) {
      return toast.error("Subject must be at least 3 characters");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(`${apiurl}/registerRequest`, mail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      setMail({ toEmailId: "", subject: "", composeMail: "" });

      setTimeout(() => {
        navigate("/mymail");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 fade-in">
      <div className="text-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mb-2 form-control"
        >
          Back
        </button>
        <h2 className="fw-bold slide-down">📧 Send Mail</h2>
        <p className="text-muted">
          Compose your mail and send it for admin approval
        </p>
      </div>

      <div className="card shadow p-4 hover-card">
        <form onSubmit={handleSubmit}>
          {/* TO EMAIL */}
          <div className="mb-3">
            <label className="form-label">To Email</label>
            <input
              type="email"
              className="form-control"
              name="toEmailId"
              value={mail.toEmailId}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* SUBJECT */}
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={mail.subject}
              onChange={handleChange}
              placeholder="Mail subject"
              required
            />
          </div>

          {/* MESSAGE */}
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="composeMail"
              rows="5"
              value={mail.composeMail}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Mail"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMail;
