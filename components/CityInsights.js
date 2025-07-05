"use client";
import React from "react";
import Link from "next/link";

const CityInsights = ({ particularCity, cities }) => {
  const isActiveCity = (city) => {
    if (!particularCity && city === "all") return true;
    return city.includes(particularCity);
  };

  return (
    <div className="flex">
      {/* Sticky Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div
          className="
            sticky
            top-0
            h-screen
            bg-white
            border-r
            border-gray-200
            shadow-sm
            overflow-y-auto
            flex
            flex-col
            space-y-2
            py-4
            px-3
          "
        >
          {cities.map((city) => (
            <Link
              href={
                city?.redirectTo
                  ? `${city?.redirectTo}`
                  : `/blogs/category/${city.slug}`
              }
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1">{/* Your main content goes here */}</div>
    </div>
  );
};

export default CityInsights;
