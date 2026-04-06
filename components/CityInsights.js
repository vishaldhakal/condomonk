"use client";
import React, { useState } from "react";
import Link from "next/link";

const CityInsights = ({ particularCity, cities }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isActiveCity = (city) => {
    if (!particularCity && city === "all") return true;
    return city.includes(particularCity);
  };

  const activeCity = cities?.find((c) => isActiveCity(c.slug));

  return (
    <>
      {/* Mobile - collapsible dropdown */}
      <div className="md:hidden w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
        >
          <span>{activeCity?.name || "All Cities"}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 relative max-h-60 overflow-y-auto">
            {cities.map((city) => (
              <Link
                href={city?.redirectTo ? city.redirectTo : `/blogs/category/${city.slug}`}
                key={city.slug}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={`px-4 py-2 text-sm transition-colors ${
                    isActiveCity(city.slug)
                      ? "text-blue-600 font-medium bg-blue-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {city.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop - vertical list */}
      <div className="hidden md:flex flex-col space-y-1 py-2">
        {cities.map((city) => (
          <Link
            href={city?.redirectTo ? city.redirectTo : `/blogs/category/${city.slug}`}
            key={city.slug}
          >
            <div
              className={`px-3 py-2 rounded cursor-pointer text-sm transition-colors whitespace-nowrap ${
                isActiveCity(city.slug)
                  ? "text-blue-600 font-medium bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {city.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CityInsights;