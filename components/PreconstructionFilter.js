"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, CircleX, X } from "lucide-react";
import { usePathname } from "next/navigation";
import useDeviceView from "../helper/useDeviceView";
import SearchWithAutocomplete from "./ProjectSearch";

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
    <div className=" bg-white z-[9999] md:z-30  ">
      <div className="flex flex-col md:flex-row md:space-x-3 space-x-1 items-center w-full">
        <div className="flex items-center h-30 md:h-12">
          {/* <SearchWithAutocomplete
            searchType={"preconstruction"}
            cityName={cityName}
            searchTypeOption={false}
          /> */}
        </div>
        <div className="flex flex-row mt-2 md:mt-0 space-x-2 w-full justify-start py-2">
          {filterButtons.map((btn) => (
            <Link
              key={btn.value}
              href={btn.href}
              className={`rounded-full md:px-4 px-2 md:py-2 py-1 flex items-center text-sm font-normal transition border-[1px]
        ${
          activeButton === btn.label
            ? "bg-[#14463B] text-white border-[#14463B] shadow-lg"
            : "bg-white text-[#14463B] border-gray-400 hover:bg-gray-100"
        }
      `}
            >
              {btn.label}
            </Link>
          ))}
          {/* Price Range Button with Popover */}
          <div className="relative">
            <button
              className={`rounded-full md:px-4 px-2 md:py-2 py-1 flex litems-center text-sm font-normal transition border-[1px] 
        ${
          activeButton === "Price Range"
            ? "border-blue-700 text-[#14463B] bg-white shadow-lg"
            : "bg-white text-[#14463B] border-gray-400 hover:bg-gray-100"
        }
      `}
              onClick={() => setShowPricePopover((v) => !v)}
              type="button"
            >
              Price Range
              <ChevronDown className="ml-1 md:h-4 md:w-4 h-3 w-3 inline" />
            </button>
            {showPricePopover && (
              <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-40">
                {priceRanges.map((option) => (
                  <Link
                    key={option.value}
                    href={`/${citySlug}-homes-${option.value}`}
                    className="block px-4 py-2 text-base text-[#14463B] hover:bg-gray-100"
                    onClick={() => setShowPricePopover(false)}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Clear Filters Button */}
        {isFiltered &&
          (isMobileView ? (
            <div className="w-full mt-2 md:hidden">
              <Link
                href={`/${citySlug}`}
                className="rounded-full py-1 px-2 text-red-500 border-2 border-red-400 bg-white hover:bg-red-50 transition w-auto text-sm"
                aria-label="Clear Filters"
              >
                {/* <X className="w-4 h-4" /> */}
                Clear
              </Link>
            </div>
          ) : (
            <Link
              href={`/${citySlug}`}
              className="rounded-full px-3 py-2 text-base font-semibold border-[1px] border-red-400 text-red-500 bg-white hover:bg-red-50 transition ml-2 hidden md:flex md:items-center w-auto "
            >
              <CircleX className="w-4 h-4 inline mr-1" />
              Clear Filters
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PreconstructionFilter;
