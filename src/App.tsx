import "./styles.css";
import AppRouter from "./routes/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapController, useMapController } from "./contexts/MapContext";
import { useCityService } from "./services/useCityService";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <AuthProvider>
        <MapController>
            <AppRouter />
        </MapController>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
