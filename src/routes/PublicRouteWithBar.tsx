import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";

const PublicRouteWithBar = ({ children }: any) => {
  const { user } = useAuthContext();

  const location = useLocation();

  return(
      <Layout>{children}</Layout>
  ) 
};

export default PublicRouteWithBar;