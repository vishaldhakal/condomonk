"use client";

import { useState } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function PropertyGallery({ images, propertyAddress }) {
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
      {/* Mobile Gallery */}
      <div className="md:hidden">
        <div className="relative w-full">
          {/* Main Image */}
          <div className="relative w-full h-[300px]">
            <Image
              src={images[currentImageIndex].url}
              alt={`${propertyAddress} Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            aria-label="Previous image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
            aria-label="Next image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-2 px-2 overflow-x-auto pb-2 hide-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative flex-shrink-0 w-[80px] h-[60px] rounded-lg overflow-hidden ${
                  currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${propertyAddress} Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden md:block">
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
                  alt={`${propertyAddress} Image ${index + 1}`}
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
                alt={`${propertyAddress} Image ${index + 6}`}
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
    </div>
  );
}
