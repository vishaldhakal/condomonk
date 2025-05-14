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
    let slider = document.getElementById("citySlider");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const slideRight = () => {
    let slider = document.getElementById("citySlider");
    slider.scrollLeft = slider.scrollLeft + 200;
  };

  return (
    <div className="relative">
      <button
        onClick={slideLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
      >
        <SlArrowLeft className="w-3 h-3 text-black" />
      </button>

      <div className="w-full overflow-x-auto no-scrollbar" id="citySlider">
        <div className="flex space-x-4 py-2 px-8 min-w-full">
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
                className={`px-2 py-2 whitespace-nowrap text-sm ${
                  isActiveCity(city.slug)
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {city.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={slideRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
      >
        <SlArrowRight className="w-3 h-3 text-black" />
      </button>
    </div>
  );
};

export default CityInsights;
