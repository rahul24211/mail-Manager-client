import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Mail = () => {
  const { id } = useParams();
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchMail = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${apiurl}/fetchmailbyid?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setMail(res.data.mail);
        // console.log("mmm", res.data.mail);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMail();
  }, [id]);

  const deleteMail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${apiurl}/deletemailbyuser?id=${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert(res.data.message);
      navigate("/mymail");
      setMail((prev) => prev.filter((mail) => mail.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!mail) return <p className="text-center mt-5">Mail not found</p>;

  return (
    <div className="container mt-4">
      <button className="mb-2 btn btn-secondary" onClick={()=> navigate(-1)}>Back</button>
      <div className="card shadow-lg border-0 rounded-4">
        {/* Header */}
        <div className="card-header bg-white border-bottom">
          <h5 className="mb-0 fw-bold text-capitalize">{mail.subject}</h5>
          <small className="text-muted">
            {new Date(mail.createdAt).toLocaleString("en-IN")}
          </small>
        </div>

        {/* Sender / Receiver */}
        <div className="card-body border-bottom">
          <div className="d-flex justify-content-between">
            <div>
              <p className="mb-1">
                <b>From:</b>{" "}
                <span className="text-primary">{mail.sender?.email}</span>
              </p>
              <p className="mb-0">
                <b>To:</b>{" "}
                <span className="text-success">{mail.receiver?.email}</span>
              </p>
            </div>

            <span
              className={`badge px-3 py-4 ${
                mail.status === "Pending"
                  ? "bg-warning"
                  : mail.status === "Approve"
                    ? "bg-success"
                    : "bg-danger"
              }`}
            >
              {mail.status}
            </span>
          </div>
        </div>

        {/* Mail Body */}
        <div className="card-body text-capitalize">
          <p style={{ whiteSpace: "pre-line" }}>{mail.compose_mail}</p>
        </div>

        {/* Footer Buttons (Optional) */}
        <div className="card-footer bg-light d-flex gap-2 justify-content-end">
          {/* <button
            onClick={() => navigate("/replymail", { state: mail })}
            className="btn btn-outline-secondary btn-sm"
          >
            Reply
          </button> */}
          <button
            onClick={() => deleteMail(mail.id)}
            className="btn btn-outline-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* -------------------- */}

      {mail.replies.length > 0 && (
        <div className="replies card shadow-lg border-0 rounded-4 mt-5">
          <div className="card-header bg-secondary border-bottom">
          <h5>Replies</h5>

          {mail.replies.map((reply) => (
            <div key={reply.id} className="reply-card">
              <p>
                <b>From:</b> {reply.sender?.email}
              </p>
              <p>
                <b>Status:</b> {reply.status}
              </p>
              <p className="text-capitalize">
                <b>Message:</b> {reply.compose_mail}
              </p>
            
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mail;
