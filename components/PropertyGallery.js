"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function PropertyGallery({ images }) {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images?.length) return null;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Grid */}
      <div className="relative grid grid-cols-4 gap-4 mb-8">
        {images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentImageIndex(index);
              setShowGallery(true);
            }}
            className={`relative cursor-pointer group ${
              index === 0 ? "col-span-2 row-span-2" : ""
            } ${index >= 5 ? "hidden" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt={image.description || `Property image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>
        ))}
        {images.length > 5 && (
          <button
            onClick={() => {
              setCurrentImageIndex(4);
              setShowGallery(true);
            }}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            +{images.length - 5} more photos
          </button>
        )}
      </div>

      {/* Full Screen Gallery */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            ←
          </button>

          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={images[currentImageIndex].url}
              alt={
                images[currentImageIndex].description ||
                `Property image ${currentImageIndex + 1}`
              }
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
