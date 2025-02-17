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
  const generateLinks = (city) => {
    const citySlug = city.toLowerCase().replace(/ /g, "-");
    const links = [];

    // Open Houses
    links.push({
      href: `/resale/ontario/${citySlug}/open-houses`,
      text: `Open Houses in ${city}`,
    });

    // Basic property type links
    propertyTypes.forEach((propType) => {
      transactionTypes.forEach((transType) => {
        links.push({
          href: `/resale/ontario/${citySlug}/${propType.path}-for-${transType}`,
          text: `${propType.label} for ${transType} in ${city}`,
        });
      });
    });

    // Bedroom combinations
    bedrooms.forEach((beds) => {
      transactionTypes.forEach((transType) => {
        links.push({
          href: `/resale/ontario/${citySlug}/homes-for-${transType}/${beds}-plus-bed`,
          text: `${beds} bedroom homes for ${transType} in ${city}`,
        });
      });
    });

    // Bathroom combinations
    bathrooms.forEach((baths) => {
      transactionTypes.forEach((transType) => {
        links.push({
          href: `/resale/ontario/${citySlug}/homes-for-${transType}/${baths}-plus-bath`,
          text: `${baths} bathroom homes for ${transType} in ${city}`,
        });
      });
    });

    // Price range combinations
    priceRanges.forEach((range) => {
      propertyTypes.forEach((propType) => {
        if (range.minPrice && range.maxPrice) {
          links.push({
            href: `/resale/ontario/${citySlug}/${propType.path}-between-${range.label}`,
            text: `${
              propType.label
            } in ${city} between $${range.minPrice.toLocaleString()} - $${range.maxPrice.toLocaleString()}`,
          });
        } else if (range.maxPrice) {
          links.push({
            href: `/resale/ontario/${citySlug}/${propType.path}-under-${range.label}`,
            text: `${
              propType.label
            } in ${city} under $${range.maxPrice.toLocaleString()}`,
          });
        } else {
          links.push({
            href: `/resale/ontario/${citySlug}/${propType.path}-over-${range.label}`,
            text: `${
              propType.label
            } in ${city} over $${range.minPrice.toLocaleString()}`,
          });
        }
      });
    });

    // Combined bedroom and bathroom combinations
    bedrooms.forEach((beds) => {
      bathrooms.forEach((baths) => {
        transactionTypes.forEach((transType) => {
          links.push({
            href: `/resale/ontario/${citySlug}/homes-for-${transType}/${beds}-plus-bed/${baths}-plus-bath`,
            text: `${beds} bedroom, ${baths} bathroom homes for ${transType} in ${city}`,
          });
        });
      });
    });

    // Property types with bedrooms, bathrooms and price ranges
    propertyTypes.forEach((propType) => {
      bedrooms.forEach((beds) => {
        bathrooms.forEach((baths) => {
          priceRanges.forEach((range) => {
            if (range.minPrice && range.maxPrice) {
              links.push({
                href: `/resale/ontario/${citySlug}/${propType.path}/${beds}-plus-bed/${baths}-plus-bath/between-${range.label}`,
                text: `${beds} bedroom, ${baths} bathroom ${
                  propType.label
                } in ${city} between $${range.minPrice.toLocaleString()} - $${range.maxPrice.toLocaleString()}`,
              });
            } else if (range.maxPrice) {
              links.push({
                href: `/resale/ontario/${citySlug}/${propType.path}/${beds}-plus-bed/${baths}-plus-bath/under-${range.label}`,
                text: `${beds} bedroom, ${baths} bathroom ${
                  propType.label
                } in ${city} under $${range.maxPrice.toLocaleString()}`,
              });
            }
          });
        });
      });
    });

    return links;
  };

  // Sort cities alphabetically
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
          const links = generateLinks(cityObj.city);
          return (
            <div key={cityObj.city} className="space-y-2">
              <h2 className="text-xl font-bold mb-4">{cityObj.city}</h2>
              <div className="space-y-0">
                {links.map((link, index) => (
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
