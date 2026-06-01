import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./page/AdminDashboard";
import UserDashboard from "./page/UserDashboard";
import MyMail from "./page/MyMail";
import SendMail from "./page/SendMail";
import Mail from "./page/Mail";
import ReplyMail from "./page/ReplyMail";
import RoleBasedRedirect from "./helper/RoleBasedRedirect";
import AdminRequests from "./page/AdminRequests";
import MailAdminSide from "./page/MailAdminSide";
import ReplyMailByAdmin from "./page/ReplyMailByAdmin";
import ProtectedRoute from "./components/ProtectRoute";
import UnAuthorize from "./page/UnAuthorize";
import Profile from "./page/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import AllUsers from "./page/AllUsers";
import About from "./components/About";
import Notification from "./page/Notification";
import "bootstrap/dist/css/bootstrap.min.css";
import MailDashboard from "./page/MailDashboard";
import MailChartAdmin from "./page/MailChartAdmin";
import Footer from "./components/Footer";
import AddBanners from "./page/AddBanners";
import BannerUserSide from "./page/BannerUserSide";
import { Toaster } from "sonner";
import Categories from "./page/Categories";
import AddProduct from "./page/AddProduct";
import CategoryUserSide from "./page/CategoryUserSide";
import Foods from "./page/Foods";
import CartPage from "./page/CartPage";
import Coupons from "./page/Coupons";
import VerifyOtp from "./page/VerifyOtp";
import ForgetPassVerify from "./page/ForgetPassVerify";
import ForgetPass from "./page/ForgetPass";

const App = () => {
  return (
    <Router>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{ className: "text-capitalize" }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleBasedRedirect />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/mymail" element={<MyMail />} />
        <Route
          path="/sendmail"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <SendMail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mail/:id"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <Mail />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/replymail" element={<ReplyMail />} /> */}
        <Route
          path="/adminrequest"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mailadminside/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <MailAdminSide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/replymailbyadmin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ReplyMailByAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/changepassword"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Employee"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maildashboard"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <MailDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mailchartadmin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <MailChartAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allusers"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banners"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AddBanners />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userbanner"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <BannerUserSide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/:CName"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/foodcategory"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <CategoryUserSide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foods/:id/:CName"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <Foods />
            </ProtectedRoute>
          }
        />
        <Route
          path="cartpage"
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="coupon"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Coupons />
            </ProtectedRoute>
          }
        />

        <Route
          path="verifyotp"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <VerifyOtp />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/forgetpassverify" element={<ForgetPassVerify />} />

        <Route path="/unauthorize" element={<UnAuthorize />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
