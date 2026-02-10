import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MyMail = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMyMail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${apiurl}/usermails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMail(res.data.mails);
        setLoading(false);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load mails");
        setLoading(false);
      }
    };
    fetchMyMail();
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading)
    return (
      <motion.p
        className="text-center mt-5 fw-semibold"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Loading mails...
      </motion.p>
    );

  return (
    <div className="container">
      <motion.div
        className="card shadow-lg p-4 mt-4 border-0 rounded-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button onClick={()=> navigate(-1)} className="btn btn-secondary mb-2">Back</button>
        <h5 className="fw-bold mb-3 text-primary">📨 My Mails</h5>

       <div
  className="table-responsive"
  style={{
    maxHeight: "60vh",
    overflowY: "auto",
  }}
>
  <motion.table
    className="table align-middle mb-0"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <thead
      className="table-light"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <tr>
        <th>Subject</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>
      {mail && mail.length > 0 ? (
        mail.map((item, index) => (
          <motion.tr
            key={item.id || index}
            variants={rowVariants}
            whileHover={{
              scale: 1.01,
              backgroundColor: "#f8f9fa",
            }}
            className="text-capitalize"
            style={{ cursor: "pointer" }}
          >
            <td
              onClick={() => navigate(`/mail/${item.id}`)}
              className="fw-semibold text-decoration-underline text-primary"
            >
              {item.subject}
            </td>

            <td>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`badge px-3 py-2 ${
                  item.status === "Pending"
                    ? "bg-warning text-dark"
                    : item.status === "Approve"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {item.status}
              </motion.span>
            </td>

            <td>
              <span className="badge bg-info-subtle text-info fw-normal">
                {formatDate(item.createdAt)}
              </span>
            </td>
          </motion.tr>
        ))
      ) : (
        <tr>
          <td colSpan="3" className="text-center text-muted py-4">
            No mails found
          </td>
        </tr>
      )}
    </tbody>
  </motion.table>
</div>

      </motion.div>
    </div>
  );
};

export default MyMail;
