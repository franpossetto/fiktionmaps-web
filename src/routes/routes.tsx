import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/Signup";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { Profile } from "../pages/user/Profile";
import Home from "../pages/home/Home";
import { AddScene } from "../pages/scenes/AddScene";
import { Map } from "../pages/map/Map";
import { AddFiction } from "../pages/fictions/AddFiction";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
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
            path="/search"
            element={
              <PrivateRoute>
                <Map />
              </PrivateRoute>
            }
          />

          <Route
            path="/home"
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
            path="/scenes/add"
            element={
              <PrivateRoute>
                <AddScene />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
