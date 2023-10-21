import "./styles.css";
import AppRouter from "./routes/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapController, useMapController } from "./contexts/MapContext";
import { useCityService } from "./services/useCityService";
import { useEffect } from "react";

function App() {
  return (
    <>
      <AuthProvider>
        <MapController>
          <AppRouter />
        </MapController>
      </AuthProvider>
    </>
  );
}

export default App;
