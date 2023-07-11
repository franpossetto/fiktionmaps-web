import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useEffect, useState } from "react";

interface MapProps {
  lat: number;
  lng: number;
}

interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface Place {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

export const FictionFeed2 = () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    libraries: ["places"],
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activePlace, setActivePlace] = useState<Place | null>(null);

  useEffect(() => {
    setContainerWidth(mapRef.current?.offsetWidth || 0);
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      loader.load().then((google) => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            zoom: 14,
            styles: darkMapStyle,
            mapTypeControl: false,
          });

          const places: Place[] = [
            {
              id: 1,
              lat: 40.7562,
              lng: -73.9839,
              name: "Empire State Building",
            },
            {
              id: 2,
              lat: 40.7527,
              lng: -73.9772,
              name: "Grand Central Terminal",
            },
            { id: 3, lat: 40.7587, lng: -73.9787, name: "Bryant Park" },
            { id: 4, lat: 40.7691, lng: -73.9815, name: "Central Park" },
          ];

          const bounds = new google.maps.LatLngBounds();
          const markers: google.maps.Marker[] = [];
          const infoWindows: google.maps.InfoWindow[] = [];

          places.forEach((place) => {
            const marker = new google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              map: map,
              title: place.name,
            });

            markers.push(marker);

            const infoWindow = new google.maps.InfoWindow({
              content: place.name,
            });

            infoWindows.push(infoWindow);

            marker.addListener("click", () => {
              setActivePlace(place);
            });

            const position = marker.getPosition();
            if (position) {
              bounds.extend(position);
            }
          });

          if (activePlace) {
            const placeMarker = markers.find(
              (marker) => marker.getTitle() === activePlace.name
            );
            if (placeMarker) {
              const placeInfoWindow = infoWindows.find(
                (infoWindow) => infoWindow.getContent() === activePlace.name
              );
              if (placeInfoWindow) {
                placeInfoWindow.open(map, placeMarker);
              }
            }
          } else {
            map.fitBounds(bounds);
          }
        }
      });
    }
  }, [containerWidth, loader, activePlace]);

  const cards: Card[] = [
    {
      id: 1,
      image: "https://picsum.photos/id/10/300/300",
      title: "Empire State Building",
      description:
        "The Empire State Building is a 102-story landmark skyscraper.",
    },
    {
      id: 2,
      image: "https://picsum.photos/id/20/300/300",
      title: "Grand Central Terminal",
      description:
        "Grand Central Terminal is a commuter and intercity railroad terminal.",
    },
    {
      id: 3,
      image: "https://picsum.photos/id/30/300/300",
      title: "Bryant Park",
      description:
        "Bryant Park is a beloved, year-round New York City destination.",
    },
    {
      id: 4,
      image: "https://picsum.photos/id/40/300/300",
      title: "Central Park",
      description: "Central Park is an urban park in New York City.",
    },
  ];

  const handleCardClick = (place: Place) => {
    setActivePlace(place);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        className="col-3"
        style={{ height: "100vh", overflowY: "scroll", padding: "16px" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="card mb-3"
            onClick={() => handleCardClick(places[card.id - 1])}
          >
            <img src={card.image} className="card-img-top" alt={card.title} />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="col-9" ref={mapRef} style={{ height: "100vh" }}>
        <div style={{ width: "75%", height: "100%" }} />
      </div>
    </div>
  );
}

export default FictionFeed;
