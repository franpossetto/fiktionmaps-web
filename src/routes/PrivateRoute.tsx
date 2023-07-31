import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";

const PrivateRoute = ({ children }: any) => {
  const { user } = useAuthContext();

  const location = useLocation();

  return user ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};

export default PrivateRoute;
