import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";
import { Cluster } from "@googlemaps/markerclusterer";

export interface SquareClusterV2Props {
  imageUrls: (string | null)[];
  places: PlaceCoordinatesResponseDTO[];
}

const ImageCarousel = ({ images }: { images: string[] }) => {
  const displayItems = images.length > 0 ? images : ["#E5E7EB"];
  const randomIndex = Math.floor(Math.random() * displayItems.length);
  const selectedImage = displayItems[randomIndex];
  const isImage = (item: string) => item.startsWith("http");

  return (
    <div className="w-full h-full overflow-hidden rounded-xl relative">
      {isImage(selectedImage) ? (
        <img
          src={selectedImage}
          alt="cluster"
          className="w-full h-full object-cover absolute rounded-xl"
        />
      ) : (
        <div
          className="w-full h-full absolute rounded-xl"
          style={{ backgroundColor: selectedImage }}
        />
      )}
    </div>
  );
};

export class SquareClusterV2 {
  props: SquareClusterV2Props;
  private previousCount = 0;

  constructor(props: SquareClusterV2Props) {
    this.props = props;
  }

  render(cluster: Cluster): google.maps.marker.AdvancedMarkerElement {
    const container = document.createElement("div");
    const root = createRoot(container);

    const shouldAnimate = cluster.count !== this.previousCount;
    this.previousCount = cluster.count;

    const initialProps = shouldAnimate ? { opacity: 0, scale: 0.5 } : {};
    const animateProps = shouldAnimate ? { opacity: 1, scale: 1 } : {};

    const markerElems = cluster.markers as unknown as HTMLElement[];
    const markerIds = markerElems.map(el => el.getAttribute('aria-label'));
    const markerIdSet = new Set(markerIds);

    const clusterImages = this.props.places.reduce<string[]>((acc, place, i) => {
      if (markerIdSet.has(place.placeId.toString()) && this.props.imageUrls[i]) {
        acc.push(this.props.imageUrls[i]!);
  }
  return acc;
}, []);
    
    root.render(
      <motion.section
        key={cluster.position.toString()}
        initial={initialProps}
        animate={animateProps}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center rounded-xl w-[2.8em] h-[2.8em] relative dark:bg-gray-200 bg-white text-black text-2xl font-bold p-[.1em]"
      >
        <div className="absolute -top-4 -right-1 z-50 bg-[#fa1f52] text-white text-xs font-bold 
            flex items-center justify-center w-6 h-6 rounded-full">
          {cluster.count}
        </div>
        <ImageCarousel images={clusterImages} />
        <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
            border-r-[.4em] border-r-transparent border-b-[.4em] dark:border-b-gray-200 border-b-white shadow-2xl"></div>
      </motion.section>
    );

    return new google.maps.marker.AdvancedMarkerElement({
      position: cluster.position,
      content: container,
    });
  }
}
