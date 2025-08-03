"use client";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "@/helper/timeAgo";
import React, { useState } from "react";

const NO_IMAGE_URL = "/noimage.webp";

function getTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const minutes = Math.floor((now - date) / (1000 * 60));

  if (minutes < 30) return `${minutes} minutes ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
}

function isNewListing(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const minutes = Math.floor((now - date) / (1000 * 60));
  return minutes < 30;
}

export default function PropertyCard({ property }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasImage = property.imageUrl?.medium;
  const totalBathrooms =
    (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0);
  const timeAgo = getTimeAgo(property.ModificationTimestamp);
  const isNew = isNewListing(property.ModificationTimestamp);

  // Generate URL-friendly street and MLS string
  const streetAndMLS = (() => {
    const parts = [];
    if (property.StreetNumber)
      parts.push(property.StreetNumber.replace("/", "-"));
    if (property.StreetName)
      parts.push(property.StreetName.trim().replace(/ /g, "-"));
    if (property.ListingKey) parts.push(property.ListingKey);
    return parts.filter(Boolean).join("-");
  })();

  // Calculate price drop amount and percentage
  const priceDropInfo = React.useMemo(() => {
    if (
      !property.PreviousListPrice ||
      property.ListPrice >= property.PreviousListPrice
    ) {
      return null;
    }

    const dropAmount = property.PreviousListPrice - property.ListPrice;
    const dropPercentage = (dropAmount / property.PreviousListPrice) * 100;

    return {
      amount: dropAmount,
      percentage: dropPercentage.toFixed(1),
    };
  }, [property.ListPrice, property.PreviousListPrice]);

  // useEffect(() => {
  //   setLoadingImage(true);
  //   getImageUrls({ MLS: curElem.ListingKey, thumbnailOnly: true }).then(
  //     (urls) => {
  //       setImgUrl(urls[0]);
  //       setLoadingImage(false);
  //     }
  //   );
  // }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImgError(false);
  };
  const handleImageError = (e) => {
    if (!imageLoaded) {
      setImgError(true);
      e.target.onerror = null;
      e.target.src = NO_IMAGE_URL;
    }
  };

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-2xl p-0 hover:shadow-lg hover:rounded-t-2xl hover:-translate-y-1 overflow-hidden">
      <Link href={`/resale/listing/${streetAndMLS}`} className="text-black">
        <div className="lg:px-0 h-full w-full">
          <div className="flex flex-col overflow-hidden relative">
            <div className="h-36 sm:h-52 overflow-hidden relative">
              <div className="h-36 sm:h-52 relative z-10 rounded-t-2xl rounded-b-2xl overflow-hidden">
                <img
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                  src={`https://pillar9.homebaba.ca/property-images/images/${property.ListingKey}-0.jpg`}
                  onLoad={handleImageLoad}
                  alt="property image"
                  onError={handleImageError}
                />
              </div>

              {/* Property Type Badge */}
              <div className="absolute bottom-3 left-2 flex sm:flex-row z-20">
                {property.PropertySubType?.trim() && (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                    {property.PropertySubType?.trim()}
                  </div>
                )}
                {isNew ? (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#f0fff4] items-center flex gap-1">
                    <span className="relative flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
                    </span>
                    <span>Just Listed</span>
                  </div>
                ) : (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white items-center flex gap-1">
                    <TimeAgo timestamp={property.ModificationTimestamp} />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 sm:px-3 pt-2  px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {/* Price section with drop percentage */}
                <div className="flex flex-col">
                  {priceDropInfo && (
                    <div className="text-green-500 text-[13px] d-flex">
                      <span className="text-red-500 font-extrabold pe-1">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>{" "}
                      ${priceDropInfo.amount.toLocaleString()}
                      <span className="text-black ps-1">
                        {" "}
                        ({priceDropInfo.percentage}% reduced)
                      </span>
                    </div>
                  )}
                  <span className="font-bold text-2xl sm:text-2xl items-center justify-start mt-0 sm:my-2">
                    ${property.ListPrice.toLocaleString()}
                    {property.TransactionType === "For Lease" && (
                      <span className="text-xs text-gray-600"> /mo</span>
                    )}
                  </span>
                </div>
              </div>

              <span className="text-black text-xs">
                <div className="flex flex-row justify-start">
                  {property.BedroomsTotal && (
                    <div className="flex items-center mr-2">
                      <img
                        src="/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(property.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {totalBathrooms > 0 && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/bathrooms.svg"
                        className="w-4 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {totalBathrooms}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}
                  {property.LivingAreaRange && (
                    <div className="flex items-center">
                      <img
                        src="/scan.svg"
                        className="w-4  inline"
                        alt="ruler"
                      />
                      <span className="">{property.LivingAreaRange} Sqft.</span>
                    </div>
                  )}
                </div>
              </span>

              <div className="text-dark text-xs mt-1 truncate">
                {property.StreetNumber} {property.StreetName}{" "}
                {property.StreetSuffix} {property.City},{" "}
                {property.StateOrProvince}
              </div>
              <p className="text-[10px] text-gray-600 mt-0 whitespace-nowrap">
                Listed by : {property.ListOfficeName}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <button className="absolute top-[0.5rem] right-2 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="w-6 h-6"
          style={{
            fill: "rgba(0, 0, 0, 0.5)",
            stroke: "white",
            strokeWidth: "2",
            overflow: "visible",
          }}
        >
          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
        </svg>
      </button>
    </section>
  );
}
