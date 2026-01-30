import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MailAdminSide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);
 const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchMail = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${apiurl}/fetchmailbyid?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMail(res.data.mail);
    };

    fetchMail();
  }, [id]);

  const updateStatus = async (status) => {
    const token = localStorage.getItem("token");

    await axios.patch(
      `${apiurl}/updatestatus/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    alert(`Mail ${status} successfully`);
    navigate("/adminrequest");
  };

  if (!mail) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h5 className="mb-3">{mail.subject}</h5>

        <p className="text-muted">
          <strong>From:</strong> {mail.sender?.email}
        </p>

        <hr />

        <p>{mail.compose_mail}</p>

        <hr />

        {mail.status === "Pending" && (
          <div className="d-flex gap-3">
            <button
              className="btn btn-success"
              onClick={() => updateStatus("Approve")}
            >
              Approve
            </button>

            <button
              className="btn btn-danger"
              onClick={() => updateStatus("Reject")}
            >
              Reject
            </button>
          </div>
        )}

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/replymailbyadmin", { state: mail })}
        >
          Reply
        </button>
        <button className="btn btn-dark mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

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

export default MailAdminSide;
