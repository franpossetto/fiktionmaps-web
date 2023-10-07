import "./styles.css";
import AppRouter from "./routes/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapController } from "./contexts/MapContext";

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
