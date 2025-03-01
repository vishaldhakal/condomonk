"use client";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/formatting";

export default function SimilarHomes({ properties }) {
  if (!properties?.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg py-12 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Similar {properties[0].PropertySubType} in {properties[0].City} with{" "}
        {properties[0].BedroomsTotal} bedrooms
      </h2>

      {/* Scrollable Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-min pb-1">
          {properties.map((property) => (
            <Link
              href={`/resale/listing/${property.StreetNumber}-${property.StreetName}-${property.ListingKey}`}
              key={property.ListingKey}
              className="flex-none md:w-[180px] w-[150px] group transition-all duration-300 rounded-xl overflow-hidden bg-white border hover:border-gray-300"
            >
              {/* Property Image Container */}
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src={property.images?.[0] || "/placeholder-house.png"}
                  alt={`${property.StreetNumber} ${property.StreetName}`}
                  className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                />
                {/* Price Tag Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                  <div className="font-bold text-white text-xl">
                    ${formatPrice(property.ListPrice)}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="py-2 px-3">
                {/* Location with truncate */}
                <div className="text-sm font-medium text-gray-900 truncate">
                  {property.StreetNumber} {property.StreetName}{" "}
                  {property.StreetSuffix}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {property.City}, {property.StateOrProvince}
                </div>

                {/* Specs Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-3">
                    <span className="flex items-center text-gray-700">
                      <img
                        src="/bedrooms.svg"
                        className="w-3 h-3 mr-1 opacity-75"
                        alt="bedrooms"
                      />
                      {property.BedroomsTotal}
                    </span>
                    <span className="flex items-center text-gray-700">
                      <img
                        src="/bathrooms.svg"
                        className="w-3 h-3 mr-1 opacity-75"
                        alt="bathrooms"
                      />
                      {(property.WashroomsType1Pcs || 0) +
                        (property.WashroomsType2Pcs || 0)}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500  py-1 rounded-full">
                  MLS #{property.ListingKey}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
