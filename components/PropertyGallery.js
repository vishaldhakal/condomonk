"use client";

import { useState } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function PropertyGallery({ images }) {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let lightGalleryInstance = null;

  const onInit = (detail) => {
    lightGalleryInstance = detail.instance;
  };

  if (!images?.length) return null;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <LightGallery
        onInit={onInit}
        speed={0}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="grid grid-cols-4 gap-2 mb-8"
        mode="lg-fade"
        cssEasing="none"
        hideScrollbar={true}
        closable={true}
        escKey={true}
        showZoomInOutIcons={false}
        actualSize={false}
        startAnimationDuration={0}
        backdropDuration={0}
        zoomFromOrigin={false}
        addClass="lg-thumb-align-middle"
      >
        {images.slice(0, 5).map((image, index) => (
          <a
            key={index}
            href={image.url}
            className={`relative cursor-pointer group ${
              index === 0 ? "col-span-2 row-span-2" : ""
            } ${index >= 5 ? "hidden" : ""}`}
            data-lg-size="1600-2400"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt={image.description || `Property image ${index + 1}`}
                fill
                className="object-cover"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </a>
        ))}

        {/* Hidden images for LightGallery */}
        {images.slice(5).map((image, index) => (
          <a
            key={`hidden-${index}`}
            href={image.url}
            className="hidden"
            data-lg-size="1600-2400"
          >
            <Image
              src={image.url}
              alt={image.description || `Property image ${index + 6}`}
              width={1600}
              height={2400}
            />
          </a>
        ))}
      </LightGallery>

      {images.length > 5 && (
        <button
          onClick={() => lightGalleryInstance?.openGallery(4)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
        >
          +{images.length - 5} more photos
        </button>
      )}
    </div>
  );
}
