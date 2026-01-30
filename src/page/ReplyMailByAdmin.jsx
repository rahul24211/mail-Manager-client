// ReplyMail.jsx
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReplyMailByAdmin = () => {
  const { state } = useLocation(); // yahan mail data aayega
  const navigate = useNavigate();

  const [composeMail, setComposeMail] = useState("");
 const apiurl = import.meta.env.VITE_API_URL;
  const sendReply = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${apiurl}/sendreply`,
        {
          toUserId: state.sender.id,
          subject: `Re: ${state.subject}`,
          composeMail: composeMail,
          parentMailId: state.id,
          status: "Reply",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Reply sent successfully");
      navigate(-2);
    } catch (error) {
      console.log(error);
    }
  };

  if (!state) return <p>No mail data</p>;

  return (
    <div className="container mt-4">
      <h5>Reply to {state.sender.email}</h5>

      <input
        className="form-control mb-2"
        value={`Re: ${state.subject}`}
        disabled
      />

      <textarea
        className="form-control mb-2"
        rows="6"
        placeholder="Write your reply..."
        value={composeMail}
        onChange={(e) => setComposeMail(e.target.value)}
      />

      {/* Old mail */}
      <div className="border p-2 text-muted small">
        <hr />
        <p>{state.compose_mail}</p>
      </div>

      <button onClick={sendReply} className="btn btn-primary mt-2">
        Send Reply
      </button>
    </div>
  );
};

export default ReplyMailByAdmin;
