// components/NotificationBell.jsx
import { useState } from "react";
import { Bell } from "react-bootstrap-icons";
import NotificationPanel from "./NotificationPanal";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bell Icon */}
      <div
        style={{
          cursor: "pointer",
          position: "relative",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
        onClick={() => setOpen(!open)}
      >
        <Bell size={20} />
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            height: 8,
            width: 8,
            background: "red",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Side Panel */}
      <NotificationPanel open={open} close={() => setOpen(false)} />
    </>
  );
};

export default NotificationBell;
