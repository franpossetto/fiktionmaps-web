import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";

export class CustomClusterRenderer {
  
  render({ count, position }: Cluster) {
    const div = document.createElement("div");
    div.className = "custom-cluster";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.width = "12px";
    div.style.height = "12px";

    // div.innerText = count.toString(); // Asegura que el número se muestre correctamente

    const animatedDiv = document.createElement("div");
    const root = createRoot(animatedDiv);

    root.render(
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: "inline-flex" }}
      >
        <div ref={(node) => node && node.appendChild(div)} />
      </motion.div>
    );

    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: animatedDiv,
    });
  }
}
