"use client";

import React from "react";
import Link from "next/link";
import { allCities } from "@/data/ontarioCities";

const propertyTypes = [
  { label: "Detached", path: "detached-homes" },
  { label: "Semi-Detached", path: "semi-detached-homes" },
  { label: "Townhouse", path: "townhouses" },
  { label: "Condo Townhouse", path: "condo-townhouses" },
  { label: "Condos", path: "condos" },
];

const bedrooms = [1, 2, 3, 4, 5];
const bathrooms = [1, 2, 3, 4];

const priceRanges = [
  { maxPrice: 500000, label: "500k" },
  { minPrice: 500000, maxPrice: 750000, label: "500k-750k" },
  { minPrice: 750000, maxPrice: 1000000, label: "750k-1M" },
  { minPrice: 1000000, maxPrice: 1500000, label: "1M-1.5M" },
  { minPrice: 1500000, label: "1.5M" },
];

const transactionTypes = ["sale", "lease"];

export default function OntarioCitiesGrid() {
  const generateCategorizedLinks = (city) => {
    const citySlug = city.toLowerCase().replace(/ /g, "-");

    // Organize links by category
    const categories = {
      openHouses: [
        {
          href: `/resale/ontario/${citySlug}/open-houses`,
          text: `Open Houses in ${city}`,
        },
      ],
      propertyTypes: propertyTypes.map((propType) => ({
        href: `/resale/ontario/${citySlug}/${propType.path}-for-sale`,
        text: `${propType.label} for sale in ${city}`,
      })),
      priceRanges: propertyTypes.flatMap((propType) =>
        priceRanges
          .filter((range) => range.maxPrice || range.minPrice) // Only include valid price ranges
          .map((range) => {
            if (range.minPrice && range.maxPrice) {
              return {
                href: `/resale/ontario/${citySlug}/${propType.path}-between-${range.label}`,
                text: `${
                  propType.label
                } in ${city} between $${range.minPrice.toLocaleString()} - $${range.maxPrice.toLocaleString()}`,
              };
            } else if (range.maxPrice) {
              return {
                href: `/resale/ontario/${citySlug}/${propType.path}-under-${range.label}`,
                text: `${
                  propType.label
                } in ${city} under $${range.maxPrice.toLocaleString()}`,
              };
            } else {
              return {
                href: `/resale/ontario/${citySlug}/${propType.path}-over-${range.label}`,
                text: `${
                  propType.label
                } in ${city} over $${range.minPrice.toLocaleString()}`,
              };
            }
          })
      ),
      bedrooms: bedrooms.map((beds) => ({
        href: `/resale/ontario/${citySlug}/homes-for-sale/${beds}-plus-bed`,
        text: `${beds} bedroom homes for sale in ${city}`,
      })),
    };

    return categories;
  };

  const sortedCities = [...allCities].sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="md:text-4xl text-2xl font-bold mb-1 pt-4">
          Explore Real Estate Properties in Ontario
        </h1>
        <p className="text-gray-700 pb-14 md:text-lg text-sm">
          Discover homes and properties in cities throughout Ontario
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedCities.map((cityObj) => {
          const categories = generateCategorizedLinks(cityObj.city);
          return (
            <div key={cityObj.city} className="space-y-4">
              <Link
                href={`/resale/ontario/${cityObj.city
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                <h2 className="text-3xl font-bold mb-6 text-black hover:text-blue-800 pt-6">
                  {cityObj.city}
                </h2>
              </Link>

              {/* Open Houses */}
              <div className="">
                {categories.openHouses.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-blue-800 text-[14px]"
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Property Types */}
              <div className="">
                <h3 className="text-[16px] font-semibold">
                  Homes for sale by Property Type
                </h3>
                {categories.propertyTypes.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-blue-800 text-[14px]"
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Price Ranges */}
              <div className="">
                <h3 className="text-[16px] font-semibold">
                  Homes for sale by Price Range
                </h3>
                {categories.priceRanges.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-blue-800 text-[14px]"
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Bedrooms */}
              <div className="">
                <h3 className="text-[16px] font-semibold">
                  Homes for sale by Number of Bedrooms
                </h3>
                {categories.bedrooms.map((link, index) => (
                  <div key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-blue-800 text-[14px]"
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
