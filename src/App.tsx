import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { AddFictionForm } from "./pages/fictions/AddFictionForm";
import FictionFeedMap from "./pages/search/FictionFeedMap";
import HomeAPIDocs from "./pages/api/APIDocs";
import AppRouter from "./routes";
import "./styles.css";

function App() {
  return <AppRouter />;
}

export default App;
