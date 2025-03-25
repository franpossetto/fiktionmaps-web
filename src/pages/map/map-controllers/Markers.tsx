import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState, useCallback } from "react";
import { SquareCluster } from "../map-markers/SquareCluster";
import { SquareMarker } from "../map-markers/SquareMarker";
import PlaceView from "@/components/places/placeView/PlaceView";
import { RedCluster } from "../map-markers/RedCluster";
import { useMapController } from "@/contexts/MapContext";

const DEFAULT_CLUSTER_IMAGE = "https://github.com/shadcn.png";

interface MarkersProps {
    places: PlaceCoordinatesResponseDTO[];
}

interface MarkerState {
    [key: string]: Marker;
}

export const Markers = ({ places }: MarkersProps) => {
    const map = useMap("map-view");
    const [markers, setMarkers] = useState<MarkerState>({});
    const clusterer = useRef<MarkerClusterer | null>(null);
    const [clickedPlaceId, setClickedPlaceId] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const { setMapZoom, mapZoom } = useMapController();

    // Memoize the renderer creation to prevent unnecessary recreations
    const createRenderer = useCallback(() => {
        return mapZoom
            ? new SquareCluster({ imageUrl: DEFAULT_CLUSTER_IMAGE, places })
            : new RedCluster();
    }, [mapZoom, places]);

    // Single useEffect for clusterer management
    useEffect(() => {
        if (!map) return;

        // Cleanup previous clusterer
        if (clusterer.current) {
            clusterer.current.clearMarkers();
            clusterer.current.setMap(null);
            clusterer.current = null;
        }

        // Create new clusterer
        const renderer = createRenderer();
        
        clusterer.current = new MarkerClusterer({
            map,
            renderer,
            onClusterClick: (event, cluster, map) => {
                const clusterCenter = cluster.position;
                if (clusterCenter) {
                    map.panTo(clusterCenter);
                    const currentZoom = map.getZoom() || 13;
                    const targetZoom = Math.min(currentZoom + 4.5, 19);
                    const animateZoom = (zoom: number) => {
                        if (zoom >= targetZoom) return;
                        map.setZoom(zoom + 1);
                        setTimeout(() => animateZoom(zoom + 1), 200);
                    };
                    animateZoom(currentZoom);
                }
            }
        });

        // Add markers to clusterer
        clusterer.current.addMarkers(Object.values(markers));

        // Add cluster click listener
        clusterer.current.addListener("clusterclick", (cluster: any) => {
            const clusterCenter = cluster.position;
            if (clusterCenter) {
                map.panTo(clusterCenter);
                let currentZoom = map.getZoom() || 13;
                const targetZoom = Math.min(currentZoom + 4.5, 19);
                const animateZoom = (zoom: number) => {
                    if (zoom >= targetZoom) return;
                    map.setZoom(zoom + 1);
                    setTimeout(() => animateZoom(zoom + 1), 200);
                };
                animateZoom(currentZoom);
            }
        });

        // Cleanup function
        return () => {
            if (clusterer.current) {
                clusterer.current.clearMarkers();
                clusterer.current.setMap(null);
                clusterer.current = null;
            }
        };
    }, [map, createRenderer]);

    // Update markers in clusterer when markers state changes
    useEffect(() => {
        if (clusterer.current) {
            clusterer.current.clearMarkers();
            clusterer.current.addMarkers(Object.values(markers));
        }
    }, [markers]);

    const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
        if (!key) return;
        
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;
        if (marker == null) {
            setMarkers({});
            return;
        }

        setMarkers((prev) => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    }, [markers]);

    const handleMarkerClick = useCallback((placeId: string) => {
        if (!placeId) return;
        setClickedPlaceId(placeId);
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setClickedPlaceId(undefined);
    }, []);

    if (!places?.length) {
        return null;
    }

    return (
        <>
            {places.map((place) => {
                const placeId = place.placeId?.toString();
                const position = {
                    lat: place?.latitude ?? 0,
                    lng: place?.longitude ?? 0
                };

                if (!placeId || !position.lat || !position.lng) {
                    return null;
                }

                return (
                    <AdvancedMarker
                        key={placeId}
                        position={position}
                        ref={(marker) => setMarkerRef(marker, placeId)}
                        onClick={() => handleMarkerClick(placeId)}
                    >
                        <SquareMarker place={place} />
                    </AdvancedMarker>
                );
            })}
            {clickedPlaceId && (
                <PlaceView 
                    id={clickedPlaceId} 
                    open={isOpen} 
                    setOpen={handleClose} 
                />
            )}
        </>
    );
};
  