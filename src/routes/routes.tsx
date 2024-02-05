import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { Profile } from "../pages/profile/Profile";
import { MapView } from "../pages/map/MapView";
import { PlaceController } from "../contexts/PlaceContext";
import Layout from "../components/layout/Layout";
import PlaceTable from "../components/places/placeTable/PlaceTable";
import CollaborationView from "../pages/collaboration/CollaborationView";
import PlaceTableCollab from "../pages/collaboration/places/PlaceTableSections/PlaceTableCollab";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MapView />
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
          path="/home"
          element={
            <Layout>
              <MapView />
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
