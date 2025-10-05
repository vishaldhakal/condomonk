"use client";
import Link from "next/link";
import { useState } from "react";

export default function RightSidebarLinks({
  cityName,
  citySlug,
  projectTypes,
  assignmentsCount,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");

  const CapitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    // Handle alert subscription logic here
    console.log("Alert email:", alertEmail);
    setAlertEmail("");
  };

  // Nearby cities for Ontario
  const nearbyCitiesOntario = {
    toronto: ["mississauga", "vaughan", "markham", "brampton", "richmond-hill"],
    mississauga: ["toronto", "brampton", "oakville", "vaughan", "burlington"],
    brampton: ["mississauga", "vaughan", "caledon", "toronto", "georgetown"],
    vaughan: ["toronto", "markham", "richmond-hill", "brampton", "king"],
    markham: [
      "richmond-hill",
      "vaughan",
      "pickering",
      "toronto",
      "whitchurch-stouffville",
    ],
    "richmond-hill": ["vaughan", "markham", "aurora", "newmarket", "toronto"],
    oakville: ["burlington", "mississauga", "milton", "hamilton", "toronto"],
    burlington: ["oakville", "hamilton", "milton", "mississauga", "dundas"],
    hamilton: ["burlington", "dundas", "stoney-creek", "ancaster", "grimsby"],
    kitchener: ["waterloo", "cambridge", "guelph", "woolwich", "stratford"],
    waterloo: ["kitchener", "cambridge", "woolwich", "guelph", "wilmot"],
    london: ["st-thomas", "strathroy", "woodstock", "ingersoll", "komoka"],
    ottawa: ["kanata", "orleans", "nepean", "gloucester", "gatineau"],
  };

  // Nearby cities for Alberta
  const nearbyCitiesAlberta = {
    calgary: ["airdrie", "cochrane", "okotoks", "chestermere", "canmore"],
    edmonton: [
      "st-albert",
      "sherwood-park",
      "spruce-grove",
      "leduc",
      "fort-saskatchewan",
    ],
  };

  const isAlbertaCity = ["calgary", "edmonton"].includes(
    citySlug.toLowerCase()
  );
  const nearbyCities = isAlbertaCity
    ? nearbyCitiesAlberta[citySlug.toLowerCase()] || []
    : nearbyCitiesOntario[citySlug.toLowerCase()] || [];

  const priceRanges = [
    { label: "Under $500K", value: "under-500k" },
    { label: "Under $600K", value: "under-600k" },
    { label: "Under $700K", value: "under-700k" },
    { label: "Under $800K", value: "under-800k" },
    { label: "Under $1M", value: "under-1-million" },
    { label: "Under $1.5M", value: "under-1.5-million" },
  ];

  const developers = [
    { name: "Mattamy Homes", slug: "mattamy-homes" },
    { name: "Tridel", slug: "tridel" },

    { name: "Concord Adex", slug: "concord-adex" },

    { name: "Great Gulf", slug: "great-gulf" },

    { name: "Empire Communities", slug: "empire-communities" },
    { name: "Minto Communities", slug: "minto-communities" },
    { name: "Brookfield Residential", slug: "brookfield-residential" },
    { name: "Truman", slug: "truman" },
  ];

  // Sidebar content component
  const SidebarContent = () => (
    <div className="space-y-1">
      {/* Alert Me Section */}
      <div className="bg-white rounded-lg p-4 pt-0">
        <p className="text-sm text-black mb-3">
          Be the first to hear about new properties
        </p>
        <button
          onClick={handleAlertSubmit}
          className="w-fit bg-white border border-teal-400 text-teal-500 rounded-lg px-4 py-2.5 text-sm hover:bg-teal-50 transition-colors flex items-center justify-start gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
          Alert Me of New Properties
        </button>
      </div>

      {/* Recommended Searches Section */}
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-sm font-semibold text-black mb-2 bg-[#f5f5f5] p-2 px-3 rounded-sm">
          Recommended searches
        </h3>
        <div className="space-y-1 ps-3">
          <Link
            href={`/${citySlug}/condos`}
            className="block text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            Studio Properties for sale in {cityName}
          </Link>
          <Link
            href={`/${citySlug}/condos`}
            className="block text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            1 Bedroom Properties for sale in {cityName}
          </Link>
          <Link
            href={`/${citySlug}/condos`}
            className="block text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            2 Bedroom Properties for sale in {cityName}
          </Link>
          <Link
            href={`/${citySlug}/townhomes`}
            className="block text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            3 Bedroom Properties for sale in {cityName}
          </Link>
          <Link
            href={`/${citySlug}/detached`}
            className="block text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            4 Bedroom Properties for sale in {cityName}
          </Link>
          <Link
            href={`/${citySlug}`}
            className="block text-sm text-gray-500 hover:text-gray-700 hover:underline mt-2"
          >
            View More
          </Link>
        </div>
      </div>

      {/* Invest in Off Plan Section */}
      <div className="bg-white rounded-lg p-4 ">
        <h3 className="text-sm font-semibold text-black mb-2 bg-[#f5f5f5] p-2 px-3 rounded-sm">
          Invest in Off Plan
        </h3>
        <div className="space-y-2 ps-3">
          <Link
            href={`/${citySlug}`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
          >
            Off Plan Properties in {cityName}
          </Link>
          <Link
            href={`/${citySlug}#upcoming`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
          >
            New Projects in {cityName}
          </Link>
        </div>
      </div>

      {/* Project Types - Compact Version */}
      <div className="bg-white rounded-lg p-4 ">
        <h3 className="text-sm font-semibold text-black mb-2 bg-[#f5f5f5] p-2 px-3 rounded-sm">
          Browse by Type
        </h3>
        <div className="space-y-2 ps-3">
          <Link
            href={`/${citySlug}/condos`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
          >
            Condos in {cityName}
          </Link>
          <Link
            href={`/${citySlug}/townhomes`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
          >
            Townhomes in {cityName}
          </Link>
          <Link
            href={`/${citySlug}/detached`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
          >
            Detached Homes in {cityName}
          </Link>
        </div>
      </div>

      {/* Price Ranges - Compact Version */}
      <div className="bg-white rounded-lg p-4 ">
        <h3 className="text-sm font-semibold text-black mb-2 bg-[#f5f5f5] p-2 px-3 rounded-sm">
          Browse by Price
        </h3>
        <div className="space-y-2 ps-3">
          {priceRanges.slice(0, 4).map((range) => (
            <Link
              key={range.value}
              href={`/${citySlug}-homes-${range.value}`}
              className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
            >
              Homes {range.label}
            </Link>
          ))}
          <Link
            href={`/${citySlug}`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline mt-2"
          >
            View All Price Ranges
          </Link>
        </div>
      </div>

      {/* Assignment Sales - Only if available */}
      {assignmentsCount > 0 && (
        <div className="bg-white rounded-lg p-4 ">
          <h3 className="text-sm font-semibold text-black mb-2 bg-[#f5f5f5] p-2 px-3 rounded-sm">
            Assignment Sales
          </h3>
          <Link
            href={`/assignment-sale/${citySlug}`}
            className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
          >
            {assignmentsCount} Assignment Sale{assignmentsCount > 1 ? "s" : ""}{" "}
            in {cityName}
          </Link>
        </div>
      )}

      {/* Nearby Cities - Compact Version */}
      {nearbyCities.length > 0 && (
        <div className="bg-white rounded-lg p-4 ">
          <h3 className="text-sm font-semibold text-black mb-2 bg-[#f5f5f5] p-2 px-3 rounded-sm">
            Nearby Areas
          </h3>
          <div className="space-y-2">
            {nearbyCities.slice(0, 4).map((city) => (
              <Link
                key={city}
                href={`/${city}`}
                className="block text-sm text-gray-700 hover:text-gray-700 hover:underline"
              >
                {CapitalizeFirst(city.replace(/-/g, " "))}
              </Link>
            ))}
            <Link
              href={`/cities`}
              className="block text-sm text-gray-700 hover:text-gray-700 hover:underline mt-2"
            >
              View All Cities
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button - Fixed at bottom */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed bottom-6 right-6 z-[9999] bg-teal-500 text-white p-4 rounded-full shadow-2xl hover:bg-teal-600 transition-all duration-300 flex items-center gap-2"
        aria-label="Open filters"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
        </svg>
        <span className="font-semibold">Filters</span>
      </button>

      {/* Backdrop/Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[10000] transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sliding Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[10001] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-6" onClick={closeMenu}>
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>
    </>
  );
}
