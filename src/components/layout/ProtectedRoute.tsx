import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "../../routes/appRoutes";
import { isTokenExpired } from "../../utils/isJwtExpired";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to={appRoutes.signInPage} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
