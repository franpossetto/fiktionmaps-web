import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }: any) => {
  const { user } = useAuthContext();

  const location = useLocation();

  return (
    user ? children : <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};

export default PrivateRoute;
