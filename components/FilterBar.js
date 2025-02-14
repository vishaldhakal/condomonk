"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MapPin,
  Home,
  Bed,
  Bath,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { allCities } from "@/data/ontarioCities";

const priceRanges = [
  { label: "Under $500k", path: "homes-under-500k", maxPrice: 500000 },
  {
    label: "$500k - $750k",
    path: "homes-between-500k-750k",
    minPrice: 500000,
    maxPrice: 750000,
  },
  {
    label: "$750k - $1M",
    path: "homes-between-750k-1000k",
    minPrice: 750000,
    maxPrice: 1000000,
  },
  {
    label: "$1M - $1.5M",
    path: "homes-between-1000k-1500k",
    minPrice: 1000000,
    maxPrice: 1500000,
  },
  { label: "Over $1.5M", path: "homes-over-1500k", minPrice: 1500000 },
];

const propertyTypes = [
  { label: "Detached", path: "detached-homes", subtypes: ["Detached"] },
  {
    label: "Semi-Detached",
    path: "semi-detached-homes",
    subtypes: ["Semi-Detached"],
  },
  { label: "Townhouse", path: "townhouses", subtypes: ["Att/Row/Townhouse"] },
  {
    label: "Condo Townhouse",
    path: "condo-townhouses",
    subtypes: ["Condo Townhouse"],
  },
  { label: "Condos", path: "condos", subtypes: ["Condo Apartment"] },
];

const bedOptions = [
  { label: "1+ Bed", value: 1 },
  { label: "2+ Beds", value: 2 },
  { label: "3+ Beds", value: 3 },
  { label: "4+ Beds", value: 4 },
  { label: "5+ Beds", value: 5 },
];

const bathOptions = [
  { label: "1+ Bath", value: 1 },
  { label: "2+ Baths", value: 2 },
  { label: "3+ Baths", value: 3 },
  { label: "4+ Baths", value: 4 },
];

export default function FilterBar({ currentFilters }) {
  const baseUrl = "/resale/ontario";
  const cityPath = currentFilters.city
    ? `/${currentFilters.city.toLowerCase().replace(/ /g, "-")}`
    : "";

  const getFilterUrl = (newFilter) => {
    const base = baseUrl;
    let filters = { ...currentFilters };

    // Apply new filters while maintaining others
    Object.entries(newFilter).forEach(([key, value]) => {
      if (value === null) {
        delete filters[key];
      } else {
        filters[key] = value;
      }
    });

    // Build URL parts in a specific order
    let urlPath = "";

    // If we have a city, it should be the first part of the path
    if (filters.city && filters.city !== "Ontario") {
      urlPath = filters.city.toLowerCase().replace(/ /g, "-") + "/";
    }

    // Add property type or 'homes'
    if (filters.propertyType) {
      const propertyPath = propertyTypes.find(
        (p) => p.label === filters.propertyType
      )?.path;
      urlPath += propertyPath || "homes";
    } else {
      urlPath += "homes";
    }

    // Add price range if present
    if (filters.maxPrice && !filters.minPrice) {
      urlPath += `-under-${(filters.maxPrice / 1000).toFixed(0)}k`;
    } else if (filters.minPrice && !filters.maxPrice) {
      urlPath += `-over-${(filters.minPrice / 1000).toFixed(0)}k`;
    } else if (filters.minPrice && filters.maxPrice) {
      urlPath += `-between-${(filters.minPrice / 1000).toFixed(0)}k-${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`;
    }

    // Add transaction type
    urlPath += `-for-${
      filters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // Add beds and baths as additional path segments only if they exist
    const specParts = [];
    if (filters.minBeds) {
      specParts.push(`${filters.minBeds}-plus-bed`);
    }
    if (filters.minBaths) {
      specParts.push(`${filters.minBaths}-plus-bath`);
    }

    // Combine all parts
    let finalUrl = `${base}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  const getBaseUrl = () => {
    return `${baseUrl}${cityPath}/homes-for-${
      currentFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;
  };

  // Update the "All" selection handlers
  const handleAllProperties = () => {
    const { propertyType, ...restFilters } = currentFilters;
    let urlPath = "homes";

    // Add price range if present
    if (restFilters.maxPrice && !restFilters.minPrice) {
      urlPath += `-under-${(restFilters.maxPrice / 1000).toFixed(0)}k`;
    } else if (restFilters.minPrice && !restFilters.maxPrice) {
      urlPath += `-over-${(restFilters.minPrice / 1000).toFixed(0)}k`;
    } else if (restFilters.minPrice && restFilters.maxPrice) {
      urlPath += `-between-${(restFilters.minPrice / 1000).toFixed(0)}k-${(
        restFilters.maxPrice / 1000
      ).toFixed(0)}k`;
    }

    urlPath += `-for-${
      restFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    let finalUrl = `${baseUrl}${cityPath}/${urlPath}`;

    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  const handleAnyBeds = () => {
    const { minBeds, ...restFilters } = currentFilters;
    return getFilterUrl({ minBeds: null });
  };

  const handleAnyBaths = () => {
    const { minBaths, ...restFilters } = currentFilters;
    return getFilterUrl({ minBaths: null });
  };

  const handleAnyPrice = () => {
    // Remove both minPrice and maxPrice while keeping all other filters
    const { minPrice, maxPrice, ...restFilters } = currentFilters;

    // Build URL parts in a specific order
    let urlPath = "";

    // 1. Start with base path (homes or property type)
    if (restFilters.propertyType) {
      const propertyPath = propertyTypes.find(
        (p) => p.label === restFilters.propertyType
      )?.path;
      urlPath = propertyPath || "homes";
    } else {
      urlPath = "homes";
    }

    // 2. Add transaction type
    urlPath += `-for-${
      restFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // 3. Add beds and baths as additional path segments
    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    // Combine all parts
    let finalUrl = `${baseUrl}${cityPath}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  return (
    <div className="bg-white">
      <div className="flex items-center gap-2 py-1">
        {/* Price Range Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-gray-300 hover:bg-gray-50 min-w-[120px] justify-between"
            >
              <span className="text-gray-700">
                {currentFilters.minPrice || currentFilters.maxPrice
                  ? `${
                      currentFilters.minPrice && currentFilters.maxPrice
                        ? `$${(currentFilters.minPrice / 1000).toFixed(0)}k-$${(
                            currentFilters.maxPrice / 1000
                          ).toFixed(0)}k`
                        : currentFilters.maxPrice
                        ? `Under $${(currentFilters.maxPrice / 1000).toFixed(
                            0
                          )}k`
                        : `Over $${(currentFilters.minPrice / 1000).toFixed(
                            0
                          )}k`
                    }`
                  : "Any Price"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="shadow-lg mt-2">
            <DropdownMenuItem className="p-0">
              <Link
                href={handleAnyPrice()}
                className="px-3 py-2 w-full text-black hover:bg-gray-50"
              >
                Any Price
              </Link>
            </DropdownMenuItem>
            {priceRanges.map((range) => (
              <DropdownMenuItem key={range.path} className="p-0">
                <Link
                  href={getFilterUrl({
                    minPrice: range.minPrice,
                    maxPrice: range.maxPrice,
                  })}
                  className="px-3 text-black py-2 w-full hover:bg-gray-50"
                >
                  {range.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Beds Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-lg border-gray-300 hover:bg-gray-50 min-w-[100px] justify-between ${
                currentFilters.minBeds ? "bg-gray-200" : ""
              }`}
            >
              <span className="text-gray-700">
                {currentFilters.minBeds
                  ? `${currentFilters.minBeds}+ Beds`
                  : "All Beds"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-lg mt-2">
            <DropdownMenuItem className="p-0">
              <Link
                href={handleAnyBeds()}
                className="px-3 py-2 w-full text-black hover:bg-gray-50"
              >
                Any Beds
              </Link>
            </DropdownMenuItem>
            {bedOptions.map((option) => (
              <DropdownMenuItem key={option.value} className="p-0">
                <Link
                  href={getFilterUrl({ minBeds: option.value })}
                  className="px-3 py-2 w-full text-black hover:bg-gray-50"
                >
                  {option.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Property Types Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-gray-300 hover:bg-gray-50 min-w-[140px] justify-between"
            >
              <span className="text-gray-700">
                {currentFilters.propertyType || "All Home Types"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="shadow-lg mt-2">
            <DropdownMenuItem className="p-0">
              <Link
                href={handleAllProperties()}
                className="px-3 py-2 w-full text-black hover:bg-gray-50"
              >
                All Properties
              </Link>
            </DropdownMenuItem>
            {propertyTypes.map((type) => (
              <DropdownMenuItem key={type.path} className="p-0">
                <Link
                  href={getFilterUrl({ propertyType: type.label })}
                  className="px-3 py-2 w-full text-black hover:bg-gray-50"
                >
                  {type.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* More Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-gray-300 hover:bg-gray-50 min-w-[100px] justify-between"
            >
              <span className="text-gray-700">More</span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="shadow-lg mt-2">
            {/* Baths Filter */}
            <DropdownMenuItem className="p-0">
              <Link
                href={handleAnyBaths()}
                className="px-3 py-2 w-full text-black hover:bg-gray-50"
              >
                Any Baths
              </Link>
            </DropdownMenuItem>
            {bathOptions.map((option) => (
              <DropdownMenuItem key={option.value} className="p-0">
                <Link
                  href={getFilterUrl({ minBaths: option.value })}
                  className="px-3 py-2 w-full text-black hover:bg-gray-50"
                >
                  {option.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Save Search Button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg text-black hover:bg-white"
        >
          Save Search
        </Button>
      </div>
    </div>
  );
}
