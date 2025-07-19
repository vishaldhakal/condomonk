"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { usePathname } from "next/navigation";
import useDeviceView from "../helper/useDeviceView";

const PreconstructionFilter = ({ cityName, citySlug }) => {
  const pathname = usePathname();
  const { isMobileView } = useDeviceView();

  // Define filter buttons
  const filterButtons = [
    {
      label: "Detached",
      href: `/${citySlug}/detached`,
      value: "detached",
    },
    {
      label: "Townhome",
      href: `/${citySlug}/townhomes`,
      value: "townhomes",
    },
    {
      label: "Condo",
      href: `/${citySlug}/condos`,
      value: "condos",
    },
  ];

  const priceRanges = [
    { value: "under-500k", label: "Under $500K" },
    { value: "under-600k", label: "Under $600K" },
    { value: "under-700k", label: "Under $700K" },
    { value: "under-800k", label: "Under $800K" },
    { value: "under-1-million", label: "Under $1M" },
    { value: "under-1.5-million", label: "Under $1.5M" },
  ];

  // Determine if a filter is active (not on base city page)
  const isFiltered = pathname !== `/${citySlug}`;

  // Determine which button is active
  const getActiveButton = () => {
    if (pathname.endsWith("/detached")) return "Detached";
    if (pathname.endsWith("/townhomes")) return "Townhome";
    if (pathname.endsWith("/condos")) return "Condo";
    for (const price of priceRanges) {
      if (pathname.endsWith(`-homes-${price.value}`)) return "Price Range";
    }
    return null;
  };
  const activeButton = getActiveButton();

  // Price Range popover state
  const [showPricePopover, setShowPricePopover] = useState(false);

  return (
    <div className="sticky bg-white z-30  ">
      <div className="flex md:space-x-3 space-x-1 items-center w-full">
        {filterButtons.map((btn) => (
          <Link
            key={btn.value}
            href={btn.href}
            className={`rounded-full md:px-4 px-2 md:py-3 py-2 md:text-sm text-xs font-bold transition border-2
            ${
              activeButton === btn.label
                ? "bg-[#14463B] text-white border-[#14463B] shadow-lg"
                : "bg-white text-[#14463B] border-gray-200 hover:bg-gray-100"
            }
          `}
          >
            {btn.label}
          </Link>
        ))}
        {/* Price Range Button with Popover */}
        <div className="relative">
          <button
            className={`rounded-full md:px-4 px-2 md:py-3 py-2 md:text-sm text-xs font-bold transition border-2 flex items-center
            ${
              activeButton === "Price Range"
                ? "border-blue-700 text-[#14463B] bg-white shadow-lg"
                : "bg-white text-[#14463B] border-gray-200 hover:bg-gray-100"
            }
          `}
            onClick={() => setShowPricePopover((v) => !v)}
            type="button"
          >
            Price Range
            <ChevronDown className="ml-0 h-5 w-5" />
          </button>
          {showPricePopover && (
            <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-56">
              {priceRanges.map((option) => (
                <Link
                  key={option.value}
                  href={`/${citySlug}-homes-${option.value}`}
                  className="block px-4 py-3 text-base text-[#14463B] hover:bg-gray-100"
                  onClick={() => setShowPricePopover(false)}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* Clear Filters Button */}
        {isFiltered &&
          (isMobileView ? (
            <Link
              href={`/${citySlug}`}
              className="rounded-full p-1 text-red-500 border-2 border-red-400 bg-white hover:bg-red-50 transition ml-2 flex items-center justify-center md:hidden"
              aria-label="Clear Filters"
            >
              <X className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/${citySlug}`}
              className="rounded-full px-8 py-4 text-lg font-bold border-2 border-red-400 text-red-500 bg-white hover:bg-red-50 transition ml-2 hidden md:inline-block"
            >
              Clear Filters
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PreconstructionFilter;
