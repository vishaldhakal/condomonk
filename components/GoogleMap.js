"use client";
import { useEffect, useState, useRef } from "react";

const GoogleMap = ({
  width = 600,
  height = 400,
  location = "University of Oxford",
  zoom = 20,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef(null);
  const mapSrc = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(
    location
  )}&t=m&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative text-right max-w-full" ref={mapRef}>
      <div
        className="overflow-hidden bg-none"
        style={{ height: `${height}px` }}
      >
        {isVisible ? (
          <iframe
            className="w-full h-full"
            height={height}
            width={width}
            src={mapSrc}
            title="Google Map"
            loading="lazy"
          ></iframe>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-200"
            style={{ height: `${height}px` }}
          >
            <div className="text-gray-500">Map loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMap;
