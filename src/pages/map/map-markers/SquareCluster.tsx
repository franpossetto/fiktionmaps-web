import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";
import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";

export interface SquareClusterProps {
  imageUrl: string;
  places: PlaceCoordinatesResponseDTO[];
}

export class SquareCluster {
  props: SquareClusterProps;
  private previousCount: number = 0;

  constructor(props: SquareClusterProps) {
    this.props = props;
  }

  render(cluster: Cluster): google.maps.marker.AdvancedMarkerElement {
    const { count, position } = cluster;
    const container = document.createElement("div");
    const root = createRoot(container);

    // Only animate if the count has changed
    const shouldAnimate = count !== this.previousCount;
    this.previousCount = count;

    root.render(
      <AnimatePresence>
        <motion.section
          key={count}
          initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center rounded-xl w-[2.8em] h-[2.8em] relative dark:bg-gray-200 bg-white text-black text-2xl font-bold p-[.1em]"
        >
          <div className="absolute -top-4 -right-1 bg-[#fa1f52] text-white text-xs font-bold 
                  flex items-center justify-center w-6 h-6 rounded-full">
            {count}
          </div>
          <img
            src={this.props.imageUrl || "https://github.com/shadcn.png"}
            alt="Cluster thumbnail"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
            border-r-[.4em] border-r-transparent border-b-[.4em] dark:border-b-gray-200 border-b-white shadow-2xl"></div>
        </motion.section>
      </AnimatePresence>
    );

    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: container,
    });
  }
}
