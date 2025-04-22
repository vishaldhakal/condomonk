"use client";

import React, { useState } from "react";
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

  const handleTogglePopover = (name) => {
    setOpenPopover(openPopover === name ? null : name);
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

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:flex space-x-2 justify-start items-center">
        {/* Property Type Dropdown */}
        <Popover
          open={openPopover === "property"}
          onOpenChange={() => handleTogglePopover("property")}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 bg-gray-100 text-gray-800 font-medium rounded-full px-3"
            >
              Pre Construction
              <ChevronDown className="ml-2 h-4 w-4" />
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

        {/* Project Type Filter */}
        <Popover
          open={openPopover === "project"}
          onOpenChange={() => handleTogglePopover("project")}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded-full px-3"
            >
              Project Type
              <ChevronDown className="ml-2 h-4 w-4" />
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

        {/* Price Range Filter */}
        <Popover
          open={openPopover === "price"}
          onOpenChange={() => handleTogglePopover("price")}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded-full px-3"
            >
              Price Range
              <ChevronDown className="ml-2 h-4 w-4" />
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

        {/* Status Filter */}
        <Popover
          open={openPopover === "status"}
          onOpenChange={() => handleTogglePopover("status")}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded-full px-3"
            >
              Status
              <ChevronDown className="ml-2 h-4 w-4" />
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

      {/* Mobile Filter - Horizontally Scrollable */}
      <div className="md:hidden w-full">
        <div
          className="flex items-center overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Property Type Dropdown for Mobile */}
          <div className="mr-2 flex-shrink-0">
            <Popover
              open={openPopover === "property-mobile"}
              onOpenChange={() => handleTogglePopover("property-mobile")}
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
              onOpenChange={() => handleTogglePopover("project-mobile")}
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
              onOpenChange={() => handleTogglePopover("price-mobile")}
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
          <div className="flex-shrink-0">
            <Popover
              open={openPopover === "status-mobile"}
              onOpenChange={() => handleTogglePopover("status-mobile")}
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
        </div>
      </div>
    </>
  );
};

export default PreconstructionFilter;
