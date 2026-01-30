import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "../utils/Auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuth = isAuthenticated();
  const user = getUser();

  // not logged in
  if (!isAuth || !user) {
    return <Navigate to="/login" replace />;
  }

  // role not allowed
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/unauthorize" replace />;
  }

  return children;
};

export default ProtectedRoute;
