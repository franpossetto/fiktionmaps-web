import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/layout/Layout";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { Profile } from "../pages/profile/Profile";
import { Home } from "../pages/map/Home";
import { CollaborationView } from "../pages/collaboration/CollaborationView";
import { PlaceController } from "../contexts/PlaceContext";
import { Interests } from "../pages/interests";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/interests"
          element={
            <PrivateRoute>
              <Layout>
                <Interests />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/collaboration/*"
          element={
            <PrivateRoute>
              <PlaceController>
                <CollaborationView />
              </PlaceController>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
