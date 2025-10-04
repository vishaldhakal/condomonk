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

  const CapitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
    <div className="space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Project Types */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Projects by Type
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href={`/${citySlug}/condos`}
              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              Condos in {cityName}
            </Link>
          </li>
          <li>
            <Link
              href={`/${citySlug}/townhomes`}
              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              Townhomes in {cityName}
            </Link>
          </li>
          <li>
            <Link
              href={`/${citySlug}/detached`}
              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              Detached Homes in {cityName}
            </Link>
          </li>
        </ul>
      </div>

      {/* Project Status */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Projects by Status
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href={`/${citySlug}#selling`}
              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              Selling Now
            </Link>
          </li>
          <li>
            <Link
              href={`/${citySlug}#upcoming`}
              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              Launching Soon
            </Link>
          </li>
          <li>
            <Link
              href={`/${citySlug}#soldout`}
              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              Sold Out Communities
            </Link>
          </li>
        </ul>
      </div>

      {/* Price Ranges */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Projects by Price
        </h3>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range.value}>
              <Link
                href={`/${citySlug}-homes-${range.value}`}
                className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                Homes {range.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Assignment Sales */}
      {assignmentsCount > 0 && (
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Assignment Sales
          </h3>
          <Link
            href={`/assignment-sale/${citySlug}`}
            className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
            {assignmentsCount} Assignment Sale{assignmentsCount > 1 ? "s" : ""}{" "}
            in {cityName}
          </Link>
        </div>
      )}

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Preconstruction Homes Near {cityName}
          </h3>
          <ul className="space-y-2">
            {nearbyCities.map((city) => (
              <li key={city}>
                <Link
                  href={`/${city}`}
                  className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                  Preconstruction Homes in{" "}
                  {CapitalizeFirst(city.replace(/-/g, " "))}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top Developers */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Projects by Developers
        </h3>
        <ul className="space-y-2">
          {developers.map((dev) => (
            <li key={dev.slug}>
              <Link
                href={`/builders/${dev.slug}`}
                className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                New Projects by {dev.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button - Fixed at bottom */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed bottom-6 right-6 z-[9999] bg-[#fa5757] text-white p-4 rounded-full shadow-2xl hover:bg-[#e14646] transition-all duration-300 flex items-center gap-2"
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
