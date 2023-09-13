import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MapContext } from "@react-google-maps/api";
import { MapController } from "./contexts/MapContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MapController>
    <App />
  </MapController>
);
