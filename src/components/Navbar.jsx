import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const role = userObj?.userType; // Admin | Employee | undefined

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fade-nav">
      <div className="container-fluid">
        {/* BRAND */}
        <NavLink
          className="navbar-brand fw-bold"
          to={role === "Admin" ? "/" : role ? "/userdashboard" : "/login"}
        >
          MyApp
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {/* 🔐 NOT LOGGED IN */}
            {!role && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
              </>
            )}

            {/* 👤 EMPLOYEE / USER */}
            {role === "Employee" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link bi bi-person-fill text-info" to="/changepassword">
                    
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/userdashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/sendmail">
                    Send Mail
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/mymail">
                    My Mail
                  </NavLink>
                </li>
              </>
            )}

            {/* 🛡️ ADMIN */}
            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminrequest">
                    Requests
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Create User
                  </NavLink>
                </li>
              </>
            )}

            {/* 🚪 LOGOUT (only if logged in) */}
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
