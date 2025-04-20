"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      // Create a custom red icon
      const redIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Initialize the map only if it hasn't been initialized yet
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current, {
          scrollWheelZoom: false,
          dragging: true,
        }).setView([43.653226, -79.383184], 13); // Default to Toronto

        // Define the base layers
        const streetLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }
        );

        const satelliteLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            maxZoom: 19,
          }
        );

        // Add the street layer by default
        streetLayer.addTo(mapInstanceRef.current);

        // Create and add layer control
        const baseLayers = {
          "Street View": streetLayer,
          "Satellite View": satelliteLayer,
        };

        L.control.layers(baseLayers).addTo(mapInstanceRef.current);
      }

      // Remove existing marker if any
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Geocode the address and set the map view
      if (location) {
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.length > 0) {
              const { lat, lon } = data[0];
              mapInstanceRef.current.setView([lat, lon], 15);
              markerRef.current = L.marker([lat, lon], { icon: redIcon })
                .addTo(mapInstanceRef.current)
                .bindPopup(location);
            }
          })
          .catch((error) => {
            console.error("Error geocoding address:", error);
          });
      }
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);

  return (
    <div
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    />
  );
};

export default Map;
