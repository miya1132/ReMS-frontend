import { LayerGroup, MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ children }: { children: React.ReactNode }) => {
  const center = new LatLng(33.5256198, 130.42547847);
  const zoom = 13;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <LayerGroup>{children}</LayerGroup>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
