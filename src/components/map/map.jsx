import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";

function Map({ items }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // if (!navigator.geolocation) {
    //   console.log("Géolocalisation non supportée");
    //   return;
    // }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  if (!position) return <p>Chargement de la carte...</p>;

  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
