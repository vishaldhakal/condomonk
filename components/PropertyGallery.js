"use client";

import { useState } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Modal } from "./ShadcnModal";
import GoogleMap from "./GoogleMap";

export default function PropertyGallery({
  images,
  propertyAddress,
  virtualTours = [],
}) {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMapModal, setShowMapModal] = useState(false);
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

            {/* Bottom Left Buttons */}
            <div className="absolute bottom-4 left-4 flex flex-row gap-2 items-center">
              <div className="flex flex-col gap-2">
                {virtualTours.map((tour, index) => (
                  <a
                    key={index}
                    href={tour.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-black items-center px-2 py-2 bg-white backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center px-3 py-2 bg-white backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  View Map
                </button>
              </div>
            </div>
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

                {/* Bottom Left Buttons (only on first image) */}
                {index === 0 && (
                  <div
                    className="absolute bottom-4 left-4 flex flex-row gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-2">
                      {virtualTours.map((tour, index) => (
                        <a
                          key={index}
                          href={tour.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-black items-center px-2 py-2 bg-white backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              tour.url,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {tour.type.charAt(0).toUpperCase() +
                            tour.type.slice(1)}{" "}
                          Tour
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowMapModal(true);
                        }}
                        className="inline-flex text-black items-center px-4 py-2 bg-white backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        View Map
                      </button>
                    </div>
                  </div>
                )}
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

      {/* Map Modal */}
      <Modal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        title={propertyAddress}
      >
        <div className="w-full h-[600px] z-3">
          <GoogleMap
            location={propertyAddress}
            width="100%"
            height={600}
            zoom={17}
          />
        </div>
      </Modal>
    </div>
  );
}
