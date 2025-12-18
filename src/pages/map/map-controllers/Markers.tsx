import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { SquareClusterV2 } from "../map-markers/SquareClusterV2";
import { SquareMarker } from "../map-markers/SquareMarker";
import PlaceView from "@/components/places/placeView/PlaceView";
import { RedCluster } from "../map-markers/RedCluster";
import { useMapController } from "@/contexts/MapContext";
import { useFirebaseStorageMultiple } from "@/hooks/shared/useImage/useFirebaseStorageMultiple";
import { PlaceCarousel } from "@/components/places/placeCarousel/PlaceCarousel";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";

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

    const imagePaths = useMemo(
        () => places.map(p => p.screenshot ?? null),
        [places]
    );

    // function getResizedPath(original: string, size: number): string {
    //     const parts = original.split('/');
    //     const file = parts.pop()!;
    //     const [name] = file.split('.');
    //     const dir = [...parts, 'resized'].join('/');
    //     return `${dir}/${name}_${size}x${size}.webp`;
    //   }
      

    // const resizedPaths = imagePaths.map(p => getResizedPath(p, 40));
    const { urls: imageUrls, loading: imagesLoading } = useFirebaseStorageMultiple(imagePaths);


    const createRenderer = useCallback(() => {
        return mapZoom
          ? new SquareClusterV2({ imageUrls, places })
          : new RedCluster();
      }, [mapZoom, places, imageUrls]);
    
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
                        requestAnimationFrame(() => animateZoom(zoom + 1));
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
                    requestAnimationFrame(() => animateZoom(zoom + 1));
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

        // Find the clicked place and center the map on it
        const clickedPlace = places.find(place => place.placeId?.toString() === placeId);
        if (clickedPlace && map) {
            const position = {
                lat: clickedPlace.latitude ?? 0,
                lng: clickedPlace.longitude ?? 0
            };
            map.panTo(position);
        }
    }, [places, map]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setClickedPlaceId(undefined);
    }, []);

    if (!places?.length) {
        return null;
    }

    // // Don't render markers until all images are loaded to avoid fallback image flashing
    if (imagesLoading) {
        return <LoadingOverlay message="SEARCHING PLACES..." />;
        return null;
    }

    return (
        <>
            {places.map((place, index) => {
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
                        title={placeId} 
                    >
                        <SquareMarker imageUrl={imageUrls[index]} />
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
            {places && places.length > 0 && !imagesLoading && (
                <PlaceCarousel places={places} imageUrls={imageUrls} />
            )}
        </>
    );
};
  