import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "../page/Notification";

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);

  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const role = userObj?.userType;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    closeNavbar();
  };

  // ✅ Navbar close function
  const closeNavbar = () => {
    const nav = document.getElementById("navbarNav");
    if (nav?.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  // ✅ Outside click close
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeNavbar();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar navbar-expand-lg navbar-dark bg-dark fade-nav"
    >
      <div className="container-fluid">
        {/* BRAND */}
        <NavLink
          className="navbar-brand fw-bold"
          to={role === "Admin" ? "/" : role ? "/userdashboard" : "/login"}
          onClick={closeNavbar}
        >
          MyApp
        </NavLink>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ITEMS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {/* 🔐 NOT LOGGED IN */}
            {!role && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={closeNavbar}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    onClick={closeNavbar}
                  >
                    About
                  </NavLink>
                </li>
              </>
            )}

            {/* 👤 EMPLOYEE */}
            {role === "Employee" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link bi bi-person-fill text-info"
                    to="/changepassword"
                    onClick={closeNavbar}
                  ></NavLink>
                </li>

                <li onClick={closeNavbar}>
                  <NotificationBell />
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/userdashboard"
                    onClick={closeNavbar}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/sendmail"
                    onClick={closeNavbar}
                  >
                    Send Mail
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/mymail"
                    onClick={closeNavbar}
                  >
                    My Mail
                  </NavLink>
                </li>
              </>
            )}

            {/* 🛡️ ADMIN */}
            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link bi bi-person-fill text-info"
                    to="/changepassword"
                    onClick={closeNavbar}
                  ></NavLink>
                </li>
                <li onClick={closeNavbar}>
                  <NotificationBell />
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/adminrequest"
                    onClick={closeNavbar}
                  >
                    Requests
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    onClick={closeNavbar}
                  >
                    Create User
                  </NavLink>
                </li>
              </>
            )}

            {/* 🚪 LOGOUT */}
            {role && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm ms-lg-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
