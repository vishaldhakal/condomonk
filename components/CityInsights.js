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
    <div className="city-insights-container position-relative">
      {/* <h3 className="insights-title">Insights on Particular City</h3> */}
      <div className="btns d-flex justify-space-between">
        <button
          className="scroll-left position-absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} />
        </button>
        <button
          className="scroll-right position-absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} />
        </button>
      </div>
      <div className="city-list d-flex" id="slider">
        {cities.map((city) => (
          <Link
            href={
              city?.redirectTo
                ? `${city?.redirectTo}`
                : `/blogs/category/${city.slug}`
            }
            className="city-link"
            key={city.slug}
          >
            <div
              className={`city-item ${isActiveCity(city.slug) ? "active" : ""}`}
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
