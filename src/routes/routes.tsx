import { BrowserRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { Login } from "../pages/auth/Login/Login";
import Introduction from "../pages/docs/guide/Introduction";
import Quickstart from "../pages/docs/guide/Quickstart";
import Authentication from "../pages/docs/guide/Authentication";
import { SignUp } from "../pages/auth/Signup";
import { AddFiction } from "../pages/fictions/add/AddFiction";
import APIDocs from "../pages/docs/APIDocs";
import Fictions from "../pages/docs/resources/Fictions";
import { FictionMap } from "../pages/fictions/map/FictionMap";
import { FictionFeed } from "../pages/fictions/feed/FictionFeed";
import Layout from "../components/shared/Layout/Layout";

const AppRouter = () => {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />

            <Route path="/search" element={
              <PrivateRoute>
                <FictionMap />
              </PrivateRoute>
            } />

          <Route path="/explore" element={
              <PrivateRoute>
                <FictionFeed />
              </PrivateRoute>
            } />

          <Route path="/add" element={<AddFiction />} />
          <Route path="/content" element={<Layout />} />
          <Route path="/api/docs" element={<APIDocs />}>
            <>
              <Route path="/api/docs/introduction" element={<Introduction />} />
              <Route path="/api/docs/quickstart" element={<Quickstart />} />
              <Route
                path="/api/docs/authentication"
                element={<Authentication />}
              />
              <Route path="/api/docs/fictions" element={<Fictions />} />
            </>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
