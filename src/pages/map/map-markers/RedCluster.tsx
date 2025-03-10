import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";

export class RedCluster {
  render({ count, position }: Cluster) {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="custom-cluster"
          style={{
            position: "relative", // Contenedor relativo
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <p style={{
            position: "absolute", // Posicionamiento absoluto
            bottom: "8px",
            left: "8px",
            whiteSpace: "nowrap",
          }}>
            + {count}
          </p> */}
        </motion.div>
      );
      
    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: container,
    });
  }
}
