import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import { useFictionService } from "../../services/useFictionService";

export interface Fiction {
  id: number;
  name: string;
  imgUrl: string;
  position: {
    lat: number;
    lng: number;
  };
  type: string;
}
export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { getFictionsByCity } = useFictionService();
  const { loading, data, error } = getFictionsByCity(1);
  const [fictions, setFiction] = useState<Fiction[]>([]);
  const [fictionFiltered, setfictionFiltered] = useState<Fiction[]>([]);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    console.log(data);
    if (data) {
      const f = data.map((f: any) => {
        const imgUrl = `http://localhost:8081${f.imgUrl}`;
        return {
          id: f.id,
          name: f.name,
          imgUrl: imgUrl,
          position: {
            lat: f.scenes[0].location.latitude,
            lng: f.scenes[0].location.longitude,
          },
          type: f.type,
        };
      });
      setFiction(f);
      setfictionFiltered(f);
    }
  }, [data]);

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const manhattanCoordinates = { lat: 40.7831, lng: -73.9712 };

  useEffect(() => {
    loader.load().then((google) => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: manhattanCoordinates,
          zoom: 15,
          disableDefaultUI: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#8ec3b9",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1a3646",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#4b6878",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#64779e",
                },
              ],
            },
            {
              featureType: "administrative.province",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#4b6878",
                },
              ],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#334e87",
                },
              ],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [
                {
                  color: "#023e58",
                },
              ],
            },
            {
              featureType: "poi",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#283d6a",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#6f9ba5",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#023e58",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#3C7680",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#304a7d",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#98a5be",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#2c6675",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#255763",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#b0d5ce",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#023e58",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#98a5be",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#283d6a",
                },
              ],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [
                {
                  color: "#3a4762",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#0e1626",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#4e6d70",
                },
              ],
            },
          ],
        });
        setMapInstance(map);
      }
    });
  }, []);

  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (mapInstance && fictionFiltered) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Agregar los nuevos marcadores
      fictionFiltered.forEach((fiction) => {
        console.log(fiction);
        const marker = new google.maps.Marker({
          position: fiction.position,
          title: fiction.name,
          map: mapInstance,
        });
        markersRef.current.push(marker);
      });
    }
  }, [mapInstance, fictionFiltered]);

  return (
    <div className="absolute h-[100%] w-[100%] flex ">
      <div className="w-[480px] bg-transparent z-10">
        {!loading && (
          <Search
            fictionList={fictions}
            setSelectedFiction={setfictionFiltered}
          />
        )}
      </div>
      <div ref={mapRef} className="absolute w-full h-full z-1" />
    </div>
  );
};
