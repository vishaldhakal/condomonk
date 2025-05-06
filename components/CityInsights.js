"use client";
import React from "react";

//LIB
import Link from "next/link";

//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const CityInsights = ({ particularCity, cities }) => {
  const isActiveCity = (city) => {
    if (!particularCity && city === "all") return true;
    return city.includes(particularCity);
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 235;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 235;
  };

  return (
    <div className="relative">
      {/* <h3 className="insights-title">Insights on Particular City</h3> */}
      <div className="flex justify-between">
        <button
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft className="w-4 h-4" />
        </button>
        <button
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth py-4 px-8"
        id="slider"
      >
        {cities.map((city) => (
          <Link
            href={
              city?.redirectTo
                ? `${city?.redirectTo}`
                : `/blogs/category/${city.slug}`
            }
            className="flex-shrink-0"
            key={city.slug}
          >
            <div
              className={`px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 transition-colors ${
                isActiveCity(city.slug)
                  ? "bg-blue-500 text-white border-blue-500 hover:border-blue-600"
                  : "bg-white text-gray-700"
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
