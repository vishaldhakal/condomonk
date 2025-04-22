"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const PreconstructionFilter = ({ cityName, citySlug }) => {
  const [openPopover, setOpenPopover] = useState(null);
  const closeTimeoutRef = useRef(null);
  const hoverElementRef = useRef(null);

  const projectTypes = [
    {
      value: "Detached",
      label: "Pre Construction Detached Homes",
      path: "/detached",
    },
    {
      value: "Townhome",
      label: "Pre Construction Townhomes",
      path: "/townhomes",
    },
    { value: "Condo", label: "Pre Construction Condos", path: "/condos" },
  ];

  const priceRanges = [
    { value: "under-500k", label: "Under $500K" },
    { value: "500k-600k", label: "$500K to $600K" },
    { value: "600k-700k", label: "$600K to $700K" },
    { value: "under-1-million", label: "Under $1M" },
    { value: "under-1.5-million", label: "Under $1.5M" },
  ];

  const statusOptions = [
    { value: "selling", label: "Selling Now", sectionId: "selling" },
    { value: "upcoming", label: "Upcoming", sectionId: "upcoming" },
    { value: "past", label: "Past Communities", sectionId: "soldout" },
  ];

  const propertyOptions = [
    {
      value: "homes-for-sale",
      label: "Homes for Sale",
      path: `/resale/ontario/${citySlug}/homes-for-sale`,
    },
  ];

  // New nearby cities data
  const nearbyCities = [
    { name: "Preconstruction homes Hamilton", slug: "hamilton" },
    { name: "Preconstruction homes Ottawa", slug: "ottawa" },
    { name: "Preconstruction homes Brampton", slug: "brampton" },
    { name: "Preconstruction homes Mississauga", slug: "mississauga" },
    { name: "Preconstruction homes Edmonton", slug: "edmonton" },
    { name: "Preconstruction homes Calgary", slug: "calgary" },
  ].filter((city) => city.slug !== citySlug);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenPopover(name);
    hoverElementRef.current = name;
  };

  const handleMouseLeave = (name) => {
    // Only set timeout if we're leaving the same element we're currently hovering
    if (hoverElementRef.current === name) {
      closeTimeoutRef.current = setTimeout(() => {
        // Only close if we're still on the same element when the timeout fires
        if (hoverElementRef.current === name) {
          setOpenPopover(null);
          hoverElementRef.current = null;
        }
      }, 500);
    }
  };

  const getLinkPath = (option, type) => {
    if (type === "project") {
      return `/${citySlug}${option.path}`;
    } else if (type === "price") {
      return `/${citySlug}-homes-${option.value}`;
    } else if (type === "status") {
      // For status, we're scrolling to sections on the same page
      return `#${option.sectionId}`;
    } else if (type === "property") {
      return option.path;
    }
    return `/`;
  };

  // For mobile dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Create a wrapper component for each filter to handle hover behaviors
  const FilterDropdown = ({ name, buttonText, children, className = "" }) => {
    return (
      <div
        className={className}
        onMouseEnter={() => handleMouseEnter(name)}
        onMouseLeave={() => handleMouseLeave(name)}
      >
        <Popover open={openPopover === name}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded-full px-3"
            >
              {buttonText}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {children}
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:flex space-x-2 justify-between items-center w-full">
        <div className="flex space-x-2">
          {/* Property Type Dropdown */}
          <FilterDropdown
            name="property"
            buttonText="Pre Construction"
            className={openPopover === "property" ? "z-10" : ""}
          >
            <div className="py-2">
              {propertyOptions.map((option) => (
                <Link
                  key={option.value}
                  href={getLinkPath(option, "property")}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </FilterDropdown>

          {/* Project Type Filter */}
          <FilterDropdown
            name="project"
            buttonText="Project Type"
            className={openPopover === "project" ? "z-10" : ""}
          >
            <div className="py-2">
              {projectTypes.map((option) => (
                <Link
                  key={option.value}
                  href={getLinkPath(option, "project")}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </FilterDropdown>

          {/* Price Range Filter */}
          <FilterDropdown
            name="price"
            buttonText="Price Range"
            className={openPopover === "price" ? "z-10" : ""}
          >
            <div className="py-2">
              {priceRanges.map((option) => (
                <Link
                  key={option.value}
                  href={getLinkPath(option, "price")}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </FilterDropdown>

          {/* Status Filter */}
          <FilterDropdown
            name="status"
            buttonText="Status"
            className={openPopover === "status" ? "z-10" : ""}
          >
            <div className="py-2">
              {statusOptions.map((option) => (
                <a
                  key={option.value}
                  href={getLinkPath(option, "status")}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  {option.label}
                </a>
              ))}
            </div>
          </FilterDropdown>
        </div>

        {/* Nearby Cities Dropdown */}
        <FilterDropdown
          name="nearby-cities"
          buttonText="Nearby Cities"
          className={openPopover === "nearby-cities" ? "z-10" : ""}
        >
          <div className="py-2 ">
            {nearbyCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="block px-4  py-2 text-sm hover:bg-gray-100 text-gray-700"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </FilterDropdown>
      </div>

      {/* Mobile Filter - Horizontally Scrollable */}
      <div className="md:hidden w-full">
        <div
          className="flex items-center overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Mobile dropdowns remain click-based as hover doesn't work well on mobile */}
          {/* Property Type Dropdown for Mobile */}
          <div className="mr-2 flex-shrink-0">
            <Popover
              open={openPopover === "property-mobile"}
              onOpenChange={() =>
                setOpenPopover(
                  openPopover === "property-mobile" ? null : "property-mobile"
                )
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 bg-gray-100 text-gray-800 font-medium text-sm px-3 whitespace-nowrap rounded-full"
                  size="sm"
                >
                  Pre Construction
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="py-2">
                  {propertyOptions.map((option) => (
                    <Link
                      key={option.value}
                      href={getLinkPath(option, "property")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Project Type Filter for Mobile */}
          <div className="mr-2 flex-shrink-0">
            <Popover
              open={openPopover === "project-mobile"}
              onOpenChange={() =>
                setOpenPopover(
                  openPopover === "project-mobile" ? null : "project-mobile"
                )
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium text-sm px-3 whitespace-nowrap rounded-full"
                  size="sm"
                >
                  Project Type
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="py-2">
                  {projectTypes.map((option) => (
                    <Link
                      key={option.value}
                      href={getLinkPath(option, "project")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Price Range Filter for Mobile */}
          <div className="mr-2 flex-shrink-0">
            <Popover
              open={openPopover === "price-mobile"}
              onOpenChange={() =>
                setOpenPopover(
                  openPopover === "price-mobile" ? null : "price-mobile"
                )
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium text-sm px-3 whitespace-nowrap rounded-full"
                  size="sm"
                >
                  Price Range
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="py-2">
                  {priceRanges.map((option) => (
                    <Link
                      key={option.value}
                      href={getLinkPath(option, "price")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Status Filter for Mobile */}
          <div className="mr-2 flex-shrink-0">
            <Popover
              open={openPopover === "status-mobile"}
              onOpenChange={() =>
                setOpenPopover(
                  openPopover === "status-mobile" ? null : "status-mobile"
                )
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium text-sm px-3 whitespace-nowrap rounded-full"
                  size="sm"
                >
                  Status
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="py-2">
                  {statusOptions.map((option) => (
                    <a
                      key={option.value}
                      href={getLinkPath(option, "status")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Nearby Cities Filter for Mobile */}
          <div className="flex-shrink-0">
            <Popover
              open={openPopover === "nearby-cities-mobile"}
              onOpenChange={() =>
                setOpenPopover(
                  openPopover === "nearby-cities-mobile"
                    ? null
                    : "nearby-cities-mobile"
                )
              }
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium text-sm px-3 whitespace-nowrap rounded-full"
                  size="sm"
                >
                  Nearby Cities
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="py-2">
                  {nearbyCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreconstructionFilter;
