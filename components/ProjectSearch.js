"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { allCities } from "@/data/ontarioCities";
import { cityRegions } from "@/data/postalCodeCities";
import { useRouter } from "next/navigation";

const SearchWithAutocomplete = ({ isHomepage = false }) => {
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
  const [searchType, setSearchType] = useState("all"); // "all", "resale", or "preconstruction"
  const [isTabbing, setIsTabbing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Add this helper function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Update the generateListingUrl function to handle UnparsedAddress when StreetNumber/StreetName are missing
  const generateListingUrl = (property) => {
    const parts = [];

    // If we have UnparsedAddress but no StreetNumber/StreetName, parse it
    if (
      property.UnparsedAddress &&
      (!property.StreetNumber || !property.StreetName)
    ) {
      // Split address into parts and take the first two parts as street number and name
      const addressParts = property.UnparsedAddress.split(" ");
      if (addressParts.length >= 2) {
        const streetNumber = addressParts[0];
        const streetName = addressParts[1];

        if (streetNumber) parts.push(streetNumber.replace("/", "-"));
        if (streetName) parts.push(streetName.trim().replace(/ /g, "-"));
      }
    } else {
      // Use existing StreetNumber and StreetName if available
      if (property.StreetNumber)
        parts.push(property.StreetNumber.replace("/", "-"));
      if (property.StreetName)
        parts.push(property.StreetName.trim().replace(/ /g, "-"));
    }

    // Always add the ListingKey
    if (property.ListingKey) parts.push(property.ListingKey);

    return parts.filter(Boolean).join("-");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let propertyResponse = { value: [] };

        if (searchTerm.length >= 2) {
          const capitalizedTerm = capitalizeWords(searchTerm);
          const response = await fetch(
            `/api/search?term=${encodeURIComponent(capitalizedTerm)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          propertyResponse = await response.json();

          // Process the property data to ensure we have street information
          propertyResponse.value = propertyResponse.value.map((property) => {
            if (
              property.UnparsedAddress &&
              (!property.StreetNumber || !property.StreetName)
            ) {
              const addressParts = property.UnparsedAddress.split(" ");
              if (addressParts.length >= 2) {
                return {
                  ...property,
                  StreetNumber: addressParts[0],
                  StreetName: addressParts[1],
                };
              }
            }
            return property;
          });
        }

        // Only fetch preconstruction data if in preconstruction tab
        let preconResponse = { data: { cities: [], projects: [] } };
        if (searchType === "preconstruction") {
          preconResponse = await axios.get(
            "https://api.condomonk.ca/api/all-precons-search/?search=" +
              searchTerm.toLowerCase()
          );
        }

        // Don't add cityRegions here since they're already in allCities
        const combinedCities = allCities;

        // Update the data state
        setData({
          cities: (preconResponse.data.cities || []).slice(0, 5),
          projects: (preconResponse.data.projects || []).slice(0, 5),
          resaleCities: combinedCities,
          properties: propertyResponse.value || [],
        });

        // Update search results with filtered cities including postal code regions
        setSearchResults({
          cities: (preconResponse.data.cities || []).slice(0, 5),
          projects: (preconResponse.data.projects || []).slice(0, 5),
          resaleCities: combinedCities
            .filter((cityObj) =>
              cityObj.city.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5),
          properties: propertyResponse.value || [],
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

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchType]);

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
      .filter((city) => city.name.toLowerCase().includes(term))
      .slice(0, 5);

    const filteredProjects = data.projects
      .filter((project) => project.project_name.toLowerCase().includes(term))
      .slice(0, 5);

    const filteredResaleCities = data.resaleCities
      .filter((cityObj) => cityObj.city.toLowerCase().includes(term))
      .slice(0, 5);

    setSearchResults({
      cities: filteredCities,
      projects: filteredProjects,
      resaleCities: filteredResaleCities,
      properties: data.properties,
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsFocused(false);
    setSearchResults({
      cities: [],
      projects: [],
      resaleCities: [],
      properties: [],
    });

    // Handle different option types
    if (option.name) {
      setSearchTerm(option.name); // Pre-construction city
    } else if (option.project_name) {
      setSearchTerm(option.project_name); // Project
    } else if (option.city) {
      setSearchTerm(option.city); // Resale city
    }
  };

  // Modify the handleTabClick function
  const handleTabClick = (type) => {
    setSearchType(type);
    // Remove the auto-focus line
    // inputRef.current?.focus();
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

  // Update the handleLinkClick function
  const handleLinkClick = async (e, href) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent the dropdown from closing immediately
    e.persist();

    try {
      // Use router.push and wait for it to complete
      await router.push(href);

      // Clear the search after successful navigation
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

  // Add this new function to handle touch events
  const handleTouchStart = (e, href) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate immediately on touch
    router.push(href);
  };

  // Apply different classes based on whether this is the homepage or not
  const inputClasses = isHomepage
    ? "form-control py-3 pe-5 fs-5 rounded-lg w-100 border-0 focus:outline-none"
    : "form-control py-2 w-mine5 pe-5";

  const iconClasses = isHomepage
    ? "fa-solid fa-magnifying-glass position-absolute top-50 translate-middle-y fs-4 search-icon"
    : "fa-solid fa-magnifying-glass position-absolute top-50 translate-middle-y";

  const iconStyle = isHomepage
    ? { color: "#FFC007", right: "20px" }
    : { color: "#FFC007", right: "15px" };

  const placeholderText = isHomepage
    ? "Search for cities or project..."
    : "Search for a city or project...";

  return (
    <div
      className={`position-relative pe-2 ${
        isHomepage ? "w-100 search-container" : ""
      }`}
    >
      <div className="position-relative">
        <input
          type="text"
          className={inputClasses}
          id="searchInput"
          placeholder={placeholderText}
          autoComplete="off"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          style={isHomepage ? { outline: "none", boxShadow: "none" } : {}}
        />
        <i className={iconClasses} style={iconStyle}></i>
      </div>

      {/* Add the CSS for the glass effect */}
      {isHomepage && (
        <style jsx global>{`
          .search-glass {
            background: rgba(255, 255, 255, 0.2) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
            color: #333 !important;
            transition: all 0.3s ease !important;
          }

          .search-glass::placeholder {
            color: rgba(51, 51, 51, 0.8) !important;
          }

          .search-glass:focus {
            background: rgba(255, 255, 255, 0.25) !important;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2) !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            outline: none !important;
          }

          .search-icon {
            color: rgba(51, 51, 51, 0.8) !important;
            transition: all 0.3s ease !important;
          }

          .search-container:hover .search-glass {
            background: rgba(255, 255, 255, 0.25) !important;
          }

          /* Remove focus ring */
          input:focus {
            outline: none !important;
            box-shadow: none !important;
          }

          /* Fix city alignment in dropdown */
          .px-4.py-1 {
            text-align: left !important;
          }
        `}</style>
      )}

      {/* Dropdown Panel */}
      {isFocused && (
        <div
          ref={dropdownRef}
          className={`absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-3   ${
            isHomepage ? "max-h-[450px]" : "max-h-[400px]"
          }`}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleTabClick("resale")}
              onMouseDown={(e) => e.preventDefault()}
              className={`flex-1 px-4 py-2.5 ${
                isHomepage ? "py-3 text-sm" : "text-xs"
              } font-medium border-b-2 transition-colors ${
                searchType !== "preconstruction"
                  ? "border-[#FFA725] text-[#FFA725]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Homes for Sale
            </button>
            <button
              onClick={() => handleTabClick("preconstruction")}
              onMouseDown={(e) => e.preventDefault()}
              className={`flex-1 px-4 py-2.5 ${
                isHomepage ? "py-3 text-sm" : "text-xs"
              } font-medium border-b-2 transition-colors ${
                searchType === "preconstruction"
                  ? "border-[#FFC007] text-[#FFC007]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pre Construction
            </button>
          </div>

          {/* Results Section */}
          <div
            className={`${
              isHomepage ? "max-h-[450px]" : "max-h-[400px]"
            } overflow-y-auto`}
          >
            {searchType !== "preconstruction" && (
              <>
                {/* Resale Cities Section - Moved to top */}
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
                      const href = `/resale/ontario/${cityPath}/homes-for-sale`;

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
                      const href = `/resale/listing/${generateListingUrl(
                        property
                      )}`;
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
                              {property.UnparsedAddress}
                            </div>
                            <div
                              className={`${
                                isHomepage ? "text-xs" : "text-[10px]"
                              } text-gray-500`}
                            >
                              {property.City} - $
                              {property.ListPrice?.toLocaleString()}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {searchType === "preconstruction" && (
              <>
                {/* Pre-Construction Cities */}
                {searchResults.cities.map((city, index) => {
                  const href = "/" + city.slug;
                  return (
                    <Link
                      href={href}
                      key={index}
                      onClick={(e) => handleLinkClick(e, href)}
                      onTouchStart={(e) => handleTouchStart(e, href)}
                      className={`flex items-center px-4 ${
                        isHomepage ? "py-3" : "py-2"
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
                        {city.name}
                      </span>
                    </Link>
                  );
                })}

                {/* Pre-Construction Projects */}
                {searchResults.projects.map((project, index) => {
                  const href = "/" + project.city.slug + "/" + project.slug;
                  return (
                    <Link
                      href={href}
                      key={index}
                      onClick={(e) => handleLinkClick(e, href)}
                      onTouchStart={(e) => handleTouchStart(e, href)}
                      className={`flex items-center px-4 ${
                        isHomepage ? "py-3" : "py-2"
                      } hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0`}
                    >
                      <i
                        className={`fa-solid fa-building text-gray-400 ${
                          isHomepage ? "text-sm" : "text-xs"
                        } w-6`}
                      ></i>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`${
                            isHomepage ? "text-sm" : "text-xs"
                          } text-gray-700 truncate`}
                        >
                          {project.project_name}
                        </div>
                        <div
                          className={`${
                            isHomepage ? "text-xs" : "text-[10px]"
                          } text-gray-500`}
                        >
                          {project.city.name}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}

            {/* No Results Message */}
            {!searchResults.properties.length &&
              !searchResults.cities.length &&
              !searchResults.resaleCities.length &&
              !searchResults.projects.length &&
              searchTerm && (
                <div className="py-8 text-center">
                  {isLoading ? (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC007]"></div>
                      </div>
                      <div
                        className={`${
                          isHomepage ? "text-base" : "text-sm"
                        } text-gray-500`}
                      >
                        Searching...
                      </div>
                    </div>
                  ) : (
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
                  )}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;
