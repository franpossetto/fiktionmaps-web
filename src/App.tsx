import "./styles.css";
import AppRouter from "./routes/routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapController } from "./contexts/MapContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
    },
  },
})



// Clear old query keys on app start
queryClient.clear();

function App() {
  return (
    <>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <APIProvider apiKey={import.meta.env.VITE_GMAPS_API_KEY}>
              <MapController>
                <AppRouter />
              </MapController>
              </APIProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
        <ToastContainer />
    </>
  );
}

export default App;
