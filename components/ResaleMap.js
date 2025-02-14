"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const ResaleMap = ({ address }) => {
  const [position, setPosition] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=0331f278a02e45db911e64943132b1a8`
    )
      .then((value) => value.json())
      .then((decodedObj) => {
        const latitude = decodedObj.features[0].properties.lat;
        const longitude = decodedObj.features[0].properties.lon;
        setPosition([latitude, longitude]);
      });
  }, []);
  let DefaultIcon = L.icon({
    iconUrl: "/icons/home_address.png",
    iconSize: [41, 41],
    iconAnchor: [41, 41],
    popupAnchor: [1, -34],
  });
  return (
    position.length == 2 && (
      <div className="">
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="z-10"
          style={{ height: 500, width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker icon={DefaultIcon} position={position}>
            <Popup>
              {/* <b>{props.title}</b> */}
              {/* <br /> */}
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  );
};

export default ResaleMap;
