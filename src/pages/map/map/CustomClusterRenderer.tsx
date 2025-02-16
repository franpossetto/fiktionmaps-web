import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";

export class CustomClusterRenderer {
  props: any;
  constructor(props: { imageUrl: string; places: any; }) {
    this.props = props;
  }
  render({ count, position }: Cluster) {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center rounded-xl w-[2.5em] h-[2.5em] relative bg-gray-200 text-black text-2xl font-bold p-[.1em]"
      >
       <div className="absolute -top-4 -right-1 bg-blue-700 text-white text-xs font-bold 
                flex items-center justify-center w-6 h-6 rounded-full">
          {count}
        </div>
        <img
          src={this.props.imageUrl || "https://github.com/shadcn.png"}
          alt="@shadcn"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
        border-r-[.4em] border-r-transparent border-b-[.4em] border-b-gray-200"></div>
      </motion.section>
    );

    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: container,
    });
  }
}
