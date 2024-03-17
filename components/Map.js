"use client"
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


export default function Map (props){
  const [position, setPosition] = useState([0, 0]); // Initial position

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(props.project_address)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
      }
    };

    fetchData();
  }, [props.project_address]);

  return (
   <>
    <MapContainer center={position} zoom={13} style={{ height: '500px' }}>
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

      {position[0] !== 0 && position[1] !== 0 && (
        <Marker position={position}>
          <Popup>{props.project_address}</Popup>
        </Marker>
      )}
    </MapContainer>
   </>
  );
};

