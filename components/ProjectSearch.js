"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { allCities } from "@/data/ontarioCities";
import { cityRegions } from "@/data/postalCodeCities";
import { useRouter } from "next/navigation";

const SearchWithAutocomplete = ({
  isHomepage = false,
  searchType = "sale",
  setSearchType = () => {},
  showOnlyPreconstruction = false,
  generateCityUrl,
  onNavigationStart,
  defaultCities = [],
  customInputClasses = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    cities: [],
    projects: [],
    resaleCities: [],
    properties: [],
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState({
    cities: [],
    projects: [],
    resaleCities: allCities,
    properties: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isTabbing, setIsTabbing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Add localSearchType state at component level
  const [localSearchType, setLocalSearchType] = useState(searchType);

  // Add this helper function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Update the generateListingUrl function
  const generateListingUrl = (property) => {
    if (
      !property ||
      !property.streetNumber ||
      !property.streetName ||
      !property.listingId
    )
      return "";

    // Create URL-friendly address by safely handling each part
    const streetNumber = property.streetNumber.toString().trim();
    const streetName = property.streetName.toString().trim();

    // Create the address part with error handling
    const addressPart = `${streetNumber}-${streetName.replace(
      /\s+/g,
      "-"
    )}`.toUpperCase();

    // Add the listing ID
    const listingPart = property.listingId;

    // Combine them
    return `/resale/listing/${addressPart}-${listingPart}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let propertyResponse = { cities: [], properties: [] };
        let preconResponse = { cities: [], projects: [] };

        if (searchTerm.length >= 2) {
          // Fetch data based on search type
          if (
            localSearchType !== "preconstruction" &&
            !showOnlyPreconstruction
          ) {
            const response = await fetch(
              `/api/search?term=${encodeURIComponent(searchTerm)}&type=sale`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            propertyResponse = await response.json();
          }

          // Fetch preconstruction data if in preconstruction mode
          if (
            localSearchType === "preconstruction" ||
            showOnlyPreconstruction
          ) {
            const response = await fetch(
              `/api/search?term=${encodeURIComponent(
                searchTerm
              )}&type=preconstruction`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            preconResponse = await response.json();
          }
        }

        // Update data based on current searchType
        setData({
          cities:
            localSearchType === "preconstruction"
              ? preconResponse.cities || []
              : propertyResponse.cities || [],
          projects:
            localSearchType === "preconstruction"
              ? preconResponse.projects || []
              : [],
          resaleCities:
            localSearchType !== "preconstruction"
              ? propertyResponse.cities || []
              : [],
          properties:
            localSearchType !== "preconstruction"
              ? propertyResponse.properties || []
              : [],
        });

        // Update search results
        setSearchResults({
          cities:
            localSearchType === "preconstruction"
              ? preconResponse.cities || []
              : [],
          projects:
            localSearchType === "preconstruction"
              ? preconResponse.projects || []
              : [],
          resaleCities:
            localSearchType !== "preconstruction"
              ? propertyResponse.cities || []
              : [],
          properties:
            localSearchType !== "preconstruction"
              ? propertyResponse.properties || []
              : [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults({
          cities: [],
          projects: [],
          resaleCities: [],
          properties: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Clear results when searchType changes
    if (!searchTerm) {
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
    } else {
      // Debounce the search
      const timeoutId = setTimeout(() => {
        fetchData();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, localSearchType, showOnlyPreconstruction]);

  // Modify the handleRouteChange function in useEffect
  useEffect(() => {
    const handleRouteChange = () => {
      setIsFocused(false);
      setSearchTerm("");
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
      // Remove focus from the input
      inputRef.current?.blur();
    };

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Add cleanup effect for navigation state
  useEffect(() => {
    // Cleanup function to reset navigation state
    return () => {
      setIsNavigating(false);
    };
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);

    if (term.trim() === "") {
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
      return;
    }

    // Filter from existing data and limit to 5 results each
    const filteredCities = data.cities
      .filter((city) => {
        // Handle both string and object formats
        const cityName =
          typeof city === "string" ? city : city.city || city.name;
        return cityName.toLowerCase().includes(term);
      })
      .slice(0, 5);

    const filteredProjects = data.projects
      .filter((project) => project.project_name?.toLowerCase().includes(term))
      .slice(0, 5);

    const filteredResaleCities = data.resaleCities
      .filter((cityObj) => {
        const cityName =
          typeof cityObj === "string" ? cityObj : cityObj.city || cityObj.name;
        return cityName.toLowerCase().includes(term);
      })
      .slice(0, 5);

    setSearchResults({
      cities: filteredCities,
      projects: filteredProjects,
      resaleCities: filteredResaleCities,
      properties: data.properties,
    });
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (type) => {
    setLocalSearchType(type);
    setIsDropdownOpen(false);
    setSearchTerm("");
    setSearchResults({
      cities: [],
      projects: [],
      resaleCities: [],
      properties: [],
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Modify the handleBlur function
  const handleBlur = (e) => {
    // Check if the related target is within our dropdown
    if (dropdownRef.current?.contains(e.relatedTarget)) {
      return; // Don't close dropdown if clicking within it
    }

    // Only close if not clicking a link
    if (!e.relatedTarget?.href) {
      setIsFocused(false);
    }
  };

  // Modify the clearSearch function
  const clearSearch = () => {
    // Add a small delay to ensure navigation happens first
    setTimeout(() => {
      setIsFocused(false);
      setSearchTerm("");
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
      inputRef.current?.blur();
    }, 100);
  };

  // Update handleLinkClick function
  const handleLinkClick = async (e, href) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await router.push(href);

      // Clear states
      setIsFocused(false);
      setSearchTerm("");
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  // Update handleTouchStart function
  const handleTouchStart = (e, href) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate and reset state
    router.push(href);
  };

  // Apply different classes based on whether this is the homepage or not
  const inputClasses = isHomepage
    ? `w-full px-8  text-sm rounded-r-full border-0 shadow-lg focus:outline-none ${customInputClasses}`
    : "w-full md:py-3 py-4 px-10 text-black text-xs rounded-r-full bg-white border border-l-0 border-gray-300 focus:outline-none   transition-all duration-200 ease-in-out placeholder:text-gray-400";

  const iconClasses = isHomepage
    ? "absolute top-1/2 -translate-y-1/2 right-4 text-2xl"
    : "absolute top-1/2 -translate-y-1/2 right-4 text-[#FFA725] text-xl";

  const iconStyle = isHomepage
    ? { color: "#f8a100", right: "30px" }
    : { color: "#FFC007", right: "15px" };

  const placeholderText = isHomepage
    ? "Enter location, neighborhood, or property"
    : "Search for a city or project...";

  return (
    <div className={`relative ${isHomepage ? "w-full" : "w-[380px]"}`}>
      <div className="relative flex text-xs ">
        <div className="relative ">
          <button
            onClick={handleDropdownClick}
            className="h-full px-3 py-3 bg-yellow-300 text-black font-medium rounded-l-full border-y border-l border-gray-200 flex items-center gap-2 hover: transition-colors "
          >
            {localSearchType === "preconstruction"
              ? "Pre Construction"
              : "Resale Homes"}
            <i
              className={`fas fa-chevron-down transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            ></i>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
              <button
                onClick={() => handleOptionSelect("preconstruction")}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100  transition-colors ${
                  localSearchType === "preconstruction"
                    ? "text-black"
                    : "text-gray-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  {localSearchType === "preconstruction" && (
                    <i className="fas fa-check text-black"></i>
                  )}
                  Pre Construction
                </span>
              </button>
              <button
                onClick={() => handleOptionSelect("sale")}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                  localSearchType === "sale" ? "text-black" : "text-gray-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  {localSearchType === "sale" && (
                    <i className="fas fa-check text-black"></i>
                  )}
                  Resale Homes
                </span>
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            className={inputClasses}
            id="searchInput"
            placeholder={placeholderText}
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleBlur(e);
              // Add small delay to allow click events to register
              setTimeout(() => setIsDropdownOpen(false), 200);
            }}
            ref={inputRef}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
        </div>
      </div>

      {isFocused && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-30 transform-gpu animate-slideDown"
          style={{
            transformOrigin: "top",
            animation: "slideDown 0.2s ease-out forwards",
          }}
        >
          {/* Show default cities when no search term and on homepage */}
          {isHomepage && !searchTerm && defaultCities.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-black text-left">
                Popular Cities
              </div>
              <div className="grid grid-cols-2 gap-1">
                {defaultCities.map((city, index) => {
                  // Generate the appropriate URL based on search type
                  const cityUrl =
                    localSearchType === "preconstruction"
                      ? `/${city.slug}`
                      : `/resale/ontario/${city.slug}/homes-for-sale`;

                  return (
                    <Link
                      href={cityUrl}
                      key={index}
                      onClick={(e) => handleLinkClick(e, cityUrl)}
                      onTouchStart={(e) => handleTouchStart(e, cityUrl)}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <i className="fa-solid fa-location-dot text-gray-400 text-sm w-6"></i>
                      <span className="text-sm text-gray-700">{city.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Show search results when there's a search term */}
          {searchTerm && (
            <div
              className={`${
                isHomepage ? "max-h-[450px]" : "max-h-[400px]"
              } overflow-y-auto`}
            >
              {localSearchType === "preconstruction" ? (
                <>
                  {/* Pre-Construction Cities */}
                  {searchResults.cities?.length > 0 && (
                    <div className="py-2 border-t border-gray-100">
                      <div className="px-4 py-1 text-xs font-medium text-black text-left">
                        Cities
                      </div>
                      {searchResults.cities.map((city, index) => (
                        <Link
                          href={`/${city.slug}`}
                          key={index}
                          onClick={(e) => handleLinkClick(e, `/${city.slug}`)}
                          onTouchStart={(e) =>
                            handleTouchStart(e, `/${city.slug}`)
                          }
                          className="flex items-start px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <i className="fa-solid fa-location-dot text-gray-400 text-xs w-6"></i>
                          <span className="text-xs text-gray-700">
                            {city.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {/* Pre-Construction Projects */}
                  {searchResults.projects?.length > 0 && (
                    <div className="py-2">
                      <div className="px-4 py-1 text-xs font-medium text-black text-left">
                        Projects
                      </div>
                      {searchResults.projects.map((project, index) => (
                        <Link
                          href={`/${project.city.slug}/${project.slug}`}
                          key={index}
                          onClick={(e) =>
                            handleLinkClick(
                              e,
                              `/${project.city.slug}/${project.slug}`
                            )
                          }
                          onTouchStart={(e) =>
                            handleTouchStart(
                              e,
                              `/${project.city.slug}/${project.slug}`
                            )
                          }
                          className="flex items-start px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <i className="fa-solid fa-building text-gray-400 text-xs w-6"></i>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-700 truncate">
                              {project.project_name}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              • {capitalizeWords(project.city.slug)}
                              <span className="pl-2">
                                - {project.project_type}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Resale Cities Section */}
                  {searchResults.resaleCities.length > 0 && (
                    <div className="py-2">
                      <div
                        className={`px-4 py-1 ${
                          isHomepage ? "text-sm" : "text-xs"
                        } font-medium text-gray-500 text-left`}
                      >
                        Cities
                      </div>
                      {searchResults.resaleCities.map((city, index) => {
                        const cityPath =
                          city.city.toLowerCase() === "stoney creek"
                            ? "stoney-creek"
                            : city.city.toLowerCase().replace(/ /g, "-");
                        const href = generateCityUrl
                          ? generateCityUrl(cityPath)
                          : `/resale/ontario/${cityPath}/homes-for-sale`;
                        return (
                          <Link
                            href={href}
                            key={index}
                            onClick={(e) => handleLinkClick(e, href)}
                            onTouchStart={(e) => handleTouchStart(e, href)}
                            className={`flex items-start px-4 ${
                              isHomepage ? "py-3 text-left" : "py-2"
                            } hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0`}
                          >
                            <i
                              className={`fa-solid fa-location-dot text-gray-400 ${
                                isHomepage ? "text-sm" : "text-xs"
                              } w-6`}
                            ></i>
                            <span
                              className={`${
                                isHomepage ? "text-sm" : "text-xs"
                              } text-gray-700`}
                            >
                              {city.city}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Properties Section */}
                  {searchResults.properties.length > 0 && (
                    <div className="py-2 border-t border-gray-100">
                      <div
                        className={`px-4 py-1 ${
                          isHomepage ? "text-sm" : "text-xs"
                        } font-medium text-gray-500 text-left`}
                      >
                        Properties
                      </div>
                      {searchResults.properties.map((property, index) => {
                        const href = generateListingUrl(property);
                        return (
                          <Link
                            href={href}
                            key={index}
                            onClick={(e) => handleLinkClick(e, href)}
                            onTouchStart={(e) => handleTouchStart(e, href)}
                            className={`flex items-start px-4 ${
                              isHomepage ? "py-3 text-left" : "py-2"
                            } hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0`}
                          >
                            <i
                              className={`fa-solid fa-home text-gray-400 ${
                                isHomepage ? "text-sm" : "text-xs"
                              } w-6`}
                            ></i>
                            <div className="min-w-0 flex-1">
                              <div
                                className={`${
                                  isHomepage ? "text-sm" : "text-xs"
                                } text-gray-700 truncate`}
                              >
                                {property.address}
                              </div>
                              <div
                                className={`${
                                  isHomepage ? "text-xs" : "text-[10px]"
                                } text-gray-500`}
                              >
                                {property.city} - $
                                {property.price?.toLocaleString()}
                                {property.bedrooms &&
                                  ` • ${property.bedrooms} bed`}
                                {property.bathrooms &&
                                  ` • ${property.bathrooms} bath`}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* No results message */}
          {searchTerm &&
            !isLoading &&
            !searchResults.properties.length &&
            !searchResults.cities.length &&
            !searchResults.resaleCities.length &&
            !searchResults.projects.length && (
              <div className="py-8 text-center">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <i
                      className={`fas fa-search ${
                        isHomepage ? "text-3xl" : "text-2xl"
                      } text-gray-300`}
                    ></i>
                  </div>
                  <div>
                    <div
                      className={`${
                        isHomepage ? "text-base" : "text-sm"
                      } font-medium text-gray-600`}
                    >
                      No matches found
                    </div>
                    <div
                      className={`${
                        isHomepage ? "text-sm" : "text-xs"
                      } text-gray-400 mt-1`}
                    >
                      Try adjusting your search terms
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;
