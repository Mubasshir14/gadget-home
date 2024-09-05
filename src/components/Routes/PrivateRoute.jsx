import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Loader from "../Loader/Loader";

const allowedEmails = [
  'mubasshiralkasshaf22@gmail.com',
  'cse12105003brur@gmail.com',
  'mubasshiralkasshaf02@gmail.com',
];

const adminRoutes = ['/add', '/update', '/manage', '/manage-order', '/all-users'];

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  // Check if user is loaded and if their email is in the allowed list
  if (loading) return <Loader />;
  if (user) {
    const isAdmin = allowedEmails.includes(user.email);
    
    // If admin, allow access to all routes including admin routes
    if (isAdmin || !adminRoutes.includes(location.pathname)) {
      return children;
    }
    
    // Redirect to unauthorized page if trying to access admin routes
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  }

  // Redirect to login if not logged in
  return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoute;
