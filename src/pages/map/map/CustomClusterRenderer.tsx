import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";

export class CustomClusterRenderer {
  
  render({ count, position }: Cluster) {
    // Crear el div con los estilos originales
    const div = document.createElement("div");
    div.className = "custom-cluster";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.innerText = count.toString(); // Asegura que el número se muestre correctamente

    const animatedDiv = document.createElement("div"); // Div adicional para aplicar la animación
    const root = createRoot(animatedDiv);

    // Renderizar `motion.div` que envuelve el div con los estilos originales
    root.render(
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: "inline-flex" }}
      >
        <div ref={(node) => node && node.appendChild(div)} /> {/* Añade el div original */}
      </motion.div>
    );

    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: animatedDiv, // El div animado es el contenedor principal
    });
  }
}
