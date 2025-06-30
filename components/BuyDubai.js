import React from "react";
import Image from "next/image";

export default function BuyDubai() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-cyan-100 pt-16 md:pb-40 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Buy in Dubai
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mt-4">
          Find 100+ premium off-plan properties across UAE at Homebaba.ae.
        </p>
      </div>

      {/* Image Row */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-8">
        {/* Left Image */}
        <div className="transform -rotate-12 sm:hover:rotate-0 transition duration-500 ease-in-out">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/dubai1.avif"
              alt="dubai image 1"
              width="200"
              height="300"
              className="w-[100px] h-[150px] sm:w-[200px] sm:h-[300px] object-cover"
            />
          </div>
        </div>

        {/* Center Image */}
        <div className="transform sm:scale-105 sm:hover:scale-110 transition duration-500">
          <div className="overflow-hidden rounded-2xl shadow-xl border-4 border-white">
            <img
              src="/dubai2.webp"
              alt="dubai image 2"
              width="300"
              height="400"
              className="w-[120px] h-[180px] sm:w-[300px] sm:h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="transform rotate-12 sm:hover:rotate-0 transition duration-500 ease-in-out">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/dubai3.avif"
              alt="dubai image 3"
              width="200"
              height="300"
              className="w-[100px] h-[150px] sm:w-[200px] sm:h-[300px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-14 sm:mt-20">
        <button className="rounded-full bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-semibold shadow-md hover:bg-blue-700 transition">
          Explore Off Plan Properties
        </button>
      </div>
    </section>
  );
}
