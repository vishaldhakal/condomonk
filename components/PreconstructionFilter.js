"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PreconstructionFilter({ cityName, citySlug }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Check for hash in URL on component mount and scroll if needed
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Property type links
  const projectTypes = [
    {
      value: "Detached",
      label: `Pre Construction Detached Homes`,
      path: `/detached`,
    },
    {
      value: "Townhome",
      label: `Pre Construction Townhomes`,
      path: `/townhomes`,
    },
    {
      value: "Condo",
      label: `Pre Construction Condos`,
      path: `/condos`,
    },
  ];

  // Price range links
  const priceRanges = [
    {
      value: "under-500k",
      label: `Under $500K`,
    },
    {
      value: "500k-600k",
      label: `$500K to $600K`,
    },
    {
      value: "600k-700k",
      label: `$600K to $700K`,
    },
    {
      value: "under-1-million",
      label: `Under $1M`,
    },
    {
      value: "under-1.5-million",
      label: `Under $1.5M`,
    },
  ];

  // Property status options
  const statusOptions = [
    {
      value: "selling",
      label: "Selling Now",
      sectionId: "selling",
    },
    {
      value: "upcoming",
      label: "Upcoming",
      sectionId: "upcoming",
    },
    {
      value: "past",
      label: "Past Communities",
      sectionId: "soldout",
    },
  ];

  const handleStatusClick = (sectionId) => {
    // Update URL with hash
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}#${sectionId}`;

    // Update the URL without a full page reload
    window.history.pushState({}, "", newUrl);

    // Scroll to section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setActiveDropdown(null);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-start">
      <div
        className="relative"
        onMouseEnter={() => setActiveDropdown("listingType")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className="px-2 py-1 text-sm bg-gray-100 border border-gray-200 rounded-full border-black focus:outline-none focus:ring-1 focus:ring-gray-300 flex items-center gap-2 min-w-[140px]">
          <span className="text-gray-700 font-medium">Pre construction</span>
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {activeDropdown === "listingType" && (
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <Link
              href={`/resale/ontario/${citySlug}/homes-for-sale`}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Homes for Sale
            </Link>
          </div>
        )}
      </div>

      {/* Property Type Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setActiveDropdown("type")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className="px-2 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 flex items-center gap-2 min-w-[140px]">
          <span className="text-gray-700"> Home Types</span>
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {activeDropdown === "type" && (
          <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {projectTypes.map((type) => (
              <Link
                key={type.value}
                href={`/${citySlug}${type.path}`}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {type.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setActiveDropdown("price")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className="px-2 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 flex items-center gap-2 min-w-[140px]">
          <span className="text-gray-700"> Price Ranges</span>
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {activeDropdown === "price" && (
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {priceRanges.map((range) => (
              <Link
                key={range.value}
                href={`/${citySlug}-homes-${range.value}`}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {range.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Property Status Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setActiveDropdown("status")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button className="px-2 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 flex items-center gap-2 min-w-[140px]">
          <span className="text-gray-700">Project Status</span>
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {activeDropdown === "status" && (
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusClick(status.sectionId)}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {status.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
