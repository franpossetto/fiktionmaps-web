import { BrowserRouter, Route, Routes } from "react-router-dom";
import APIDcos from "./pages/api/APIDocs";
import { AddFictionForm } from "./pages/fictions/AddFictionForm";
import Introduction from "./pages/api/guide/Introduction";

import Fictions from "./pages/api/resources/Fictions";
import { SignUp } from "./pages/user/Signup";
import { Login } from "./pages/user/Login";
import { SearchMap } from "./pages/search/SearchMap";
import { SearchCard } from "./pages/search/SearchCard";
import Quickstart from "./pages/api/guide/Quickstart";
import Authentication from "./pages/api/guide/Authentication";

// Importa tus páginas adicionales aquí

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/search" element={<SearchMap />} />
        <Route path="/explore" element={<SearchCard />} />

        <Route path="/add" element={<AddFictionForm />} />

        <Route path="/api/docs" element={<APIDcos />}>
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
    </BrowserRouter>
  );
};

export default AppRouter;
