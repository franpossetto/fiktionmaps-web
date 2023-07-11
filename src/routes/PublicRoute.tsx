import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const PublicRoute = ({ children }: any) => {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    !user ? children : <Navigate to="/search" state={{ from: location }} replace={true} />
  );
};

export default PublicRoute;