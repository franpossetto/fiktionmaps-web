import { Cluster } from "@googlemaps/markerclusterer";

export class CustomClusterRenderer {
  render({ count, position }: Cluster) {
    const div = document.createElement("div");
    div.className = "custom-cluster";
    div.innerText = count.toString();
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    
    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: div,
    });
  }
}
