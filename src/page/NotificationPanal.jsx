import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotificationPanel = ({ open, close }) => {
  const [notifications, setNotifications] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!open) return;

    const fetchNotifications = async () => {
      const res = await axios.get(`${apiUrl}/getallnotification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data.notification || []);
    };

    fetchNotifications();
  }, [open]);

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`${apiUrl}/deletenotification?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔥 turant UI se remove
      setNotifications((prev) => prev.filter((notify) => notify.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ✅ OVERLAY (outside click = close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              background: "black",
              zIndex: 998,
            }}
          />

          {/* ✅ NOTIFICATION PANEL */}
          <motion.div
            initial={{ x: 350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 350, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // 👈 inside click safe
            style={{
              position: "fixed",
              top: "56px",
              right: 0,
              width: "350px",
              height: "calc(100vh - 56px)",
              background: "#fff",
              boxShadow: "-4px 0 15px rgba(0,0,0,0.15)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
              <h6 className="m-0 fw-bold">
                Notifications
                <span className="badge bg-primary ms-2">
                  {notifications.length}
                </span>
              </h6>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={close}
              >
                ✕
              </button>
            </div>

            {/* Welcome */}
            <div className="text-center p-2 border-bottom bg-dark text-white">
              <strong>Welcome 🎉</strong>
              <p className="mb-0 small">Your Account Notifications</p>
            </div>

            {/* Body */}
            <div
              className="p-3"
              style={{
                overflowY: "auto",
                flex: 1,
              }}
            >
              {notifications.length === 0 && (
                <p className="text-center text-muted mt-5">
                  No notifications found
                </p>
              )}

              {notifications.map((notify, index) => (
                <motion.div
                  key={notify.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded p-2 mb-2 d-flex justify-content-between align-items-start"
                >
                  {/* Left */}
                  <div>
                    <strong className="d-block">{notify.tital}</strong>

                    <small
                      onClick={() => {
                        close(); // ✅ navigate se pehle close
                        user.userType === "Employee"
                          ? navigate(`/mail/${notify.requestId}`)
                          : navigate(`/mailadminside/${notify.requestId}`);
                      }}
                      className="fw-semibold text-decoration-underline text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      {`${notify.subject.slice(0, 32)}...`}
                    </small>
                  </div>

                  {/* Delete */}
                  <button
                    className="btn btn-sm btn-outline-danger bi bi-trash"
                    onClick={() => handleDeleteNotification(notify.id)}
                  ></button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
