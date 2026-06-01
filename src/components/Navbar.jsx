import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "../page/Notification";
import axios from "axios";
import { toast } from "sonner";
import { Cart, Cart2, Cart4, CartCheckFill, CartX } from "react-bootstrap-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);

  const [img, setImg] = useState({});
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const role = userObj?.userType;
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchImg = async () => {
      const res = await axios.get(`${apiUrl}/userdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImg(res.data.userDetails.image);
    };
    fetchImg();
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      closeNavbar();

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.res?.data?.message);
    }
  };

  const closeNavbar = () => {
    const nav = document.getElementById("navbarNav");
    if (nav?.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

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
          Mail-Manager
        </NavLink>

        {/* 🔔 PROFILE + NOTIFICATION OUTSIDE COLLAPSE */}
        {role && (
          <div className="d-flex align-items-center gap-3 ms-auto me-2 order-lg-2">
            <div onClick={closeNavbar}>
              <NotificationBell />
            </div>

            <NavLink to="/changepassword">
              <img
                src={`${apiUrl}${img}`}
                className="rounded-circle"
                onClick={closeNavbar}
                style={{
                  height: "35px",
                  width: "35px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </NavLink>
          </div>
        )}

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

            {role === "Employee" && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/cartpage"
                    onClick={closeNavbar}
                  >
                    <Cart4/>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/foodcategory"
                    onClick={closeNavbar}
                  >
                    Order-Books
                  </NavLink>
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

            {role === "Admin" && (
              <>
              <li className="nav-item">
                  <NavLink className="nav-link" to="/coupon" onClick={closeNavbar}>
                   Coupons
                  </NavLink>
                </li>
              <li className="nav-item">
                  <NavLink className="nav-link" to="/categories" onClick={closeNavbar}>
                   Books-Categories
                  </NavLink>
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
