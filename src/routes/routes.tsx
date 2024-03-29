import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { Profile } from "../pages/user/Profile";
import Home from "../pages/admin/Admin";
import { AddScene } from "../pages/scenes/AddScene";
import { AddFiction } from "../pages/fictions/AddFiction";
import FictionTable from "../pages/fictions/FictionTable";
import { MapView } from "../pages/map/MapView";
import SceneTable from "../pages/scenes/SceneTable";
import { SceneController } from "../contexts/SceneContext";
import CityTable from "../pages/cities/CityTable";
import LocationTable from "../pages/locations/LocationTable";
import Layout from "../components/layout/Layout";

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
          path="/admin"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/fictions/add"
          element={
            <PrivateRoute>
              <AddFiction />
            </PrivateRoute>
          }
        />
        <Route
          path="/fictions/table"
          element={
            <PrivateRoute>
              <FictionTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/scenes/table"
          element={
            <PrivateRoute>
              <SceneController>
                <SceneTable />
              </SceneController>
            </PrivateRoute>
          }
        />
        <Route
          path="/cities/table"
          element={
            <PrivateRoute>
              <CityTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/scenes/add"
          element={
            <PrivateRoute>
              <SceneController>
                <AddScene />
              </SceneController>
            </PrivateRoute>
          }
        />
        <Route
          path="/locations/table"
          element={
            <PrivateRoute>
              <LocationTable />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
