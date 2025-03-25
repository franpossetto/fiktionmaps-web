import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";

export class RedCluster {
  private previousCount: number = 0;

  render({ count, position }: Cluster) {
    const container = document.createElement("div");
    const root = createRoot(container);

    // Only animate if the count has changed
    const shouldAnimate = count !== this.previousCount;
    this.previousCount = count;

    root.render(
      <AnimatePresence>
        <motion.div
          key={count}
          initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
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
      </AnimatePresence>
    );
      
    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: container,
    });
  }
}
