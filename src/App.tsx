import "./styles.css";
import AppRouter from "./routes/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapController } from "./contexts/MapContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MapController>
            <AppRouter />
          </MapController>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
