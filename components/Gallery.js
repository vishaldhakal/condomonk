"use client";
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://api.condomonk.ca";
const PLACEHOLDER = "https://condomonk.ca/noimage.webp";

function normalizeImages(images = []) {
  const list = Array.isArray(images) ? images : [];

  const normalized = list.map((item) => ({
    id: item.id,
    src: item.image
      ? item.image.startsWith("http")
        ? item.image
        : `${BASE_URL}${item.image}`
      : PLACEHOLDER,
  }));

  while (normalized.length < 7) {
    normalized.push({
      id: `placeholder-${normalized.length}`,
      src: PLACEHOLDER,
    });
  }

  return normalized.slice(0, 7);
}

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-white/60 text-sm tabular-nums">
          {current + 1}&nbsp;/&nbsp;{images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center relative px-14 md:px-20 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 md:left-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <img
          key={current}
          src={images[current].src}
          alt={`Photo ${current + 1}`}
          className="max-h-full max-w-full object-contain rounded-lg select-none gallery-fade"
          draggable={false}
        />

        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 md:right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="flex-shrink-0 px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 overflow-x-auto justify-center no-scrollbar pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-white opacity-100 scale-105"
                  : "opacity-40 hover:opacity-75"
              }`}
            >
              <img
                src={img.src}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery({ images, project_name, project_address }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const displayImages = normalizeImages(images);
  const altBase = project_name
    ? `${project_name}${project_address ? ` at ${project_address}` : ""}`
    : "Property";

  return (
    <>
      <section aria-label={`${project_name} photos`} className="my-3">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 md:gap-2">
          {/* Hero image */}
          <button
            onClick={() => setLightboxIndex(0)}
            className="col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full min-h-[220px] md:min-h-[308px] rounded-xl overflow-hidden cursor-zoom-in relative p-0 border-0"
          >
            <img
              src={displayImages[0].src}
              alt={`${altBase} — main view`}
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
            />
            <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 pointer-events-none select-none z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
              View all photos
            </span>
          </button>

          {/* 6 thumbnails */}
          <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-1.5 md:gap-2">
            {displayImages.slice(1, 7).map((image, index) => (
              <button
                key={image.id}
                onClick={() => setLightboxIndex(index + 1)}
                className="aspect-[4/3] w-full rounded-xl overflow-hidden cursor-zoom-in p-0 border-0"
              >
                <img
                  src={image.src}
                  alt={`${altBase} — photo ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={displayImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
