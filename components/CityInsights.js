"use client";
import React from "react";
import Link from "next/link";

const CityInsights = ({ particularCity, cities }) => {
  const isActiveCity = (city) => {
    if (!particularCity && city === "all") return true;
    return city.includes(particularCity);
  };

  return (
    <div className="w-full">
      <div
        className="
          flex 
          flex-row 
          md:flex-col 
          space-x-2 
          md:space-x-0 
          md:space-y-2 
          py-2 px-2 
          overflow-x-auto 
          md:overflow-x-visible 
          hide-scrollbar
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
  );
};

export default CityInsights;
