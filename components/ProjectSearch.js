"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { allCities } from "@/data/ontarioCities";

const SearchWithAutocomplete = () => {
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

  // Add this helper function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let propertyResponse = { value: [] };

        // Only fetch properties if searchTerm is 2 or more characters
        if (searchTerm.length >= 2) {
          const capitalizedTerm = capitalizeWords(searchTerm);
          const response = await fetch(
            `/api/search?term=${encodeURIComponent(capitalizedTerm)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          propertyResponse = await response.json();
        }

        // Only fetch preconstruction data if in preconstruction tab
        let preconResponse = { data: { cities: [], projects: [] } };
        if (searchType === "preconstruction") {
          preconResponse = await axios.get(
            "https://api.condomonk.ca/api/all-precons-search/?search=" +
              searchTerm.toLowerCase()
          );
        }

        // Update the data state
        setData({
          cities: (preconResponse.data.cities || []).slice(0, 5),
          projects: (preconResponse.data.projects || []).slice(0, 5),
          resaleCities: allCities,
          properties: propertyResponse.value || [],
        });

        // Update search results
        setSearchResults({
          cities: (preconResponse.data.cities || []).slice(0, 5),
          projects: (preconResponse.data.projects || []).slice(0, 5),
          resaleCities: allCities
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
      return; // Don't keep focus, just return
    }

    // Close immediately without delay
    setIsFocused(false);
  };

  // Modify the clearSearch function
  const clearSearch = () => {
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

  return (
    <div className="position-relative">
      <div className="position-relative">
        <input
          type="text"
          className="form-control py-2 w-mine5 pe-5"
          id="searchInput"
          placeholder="Search for a city or project..."
          autoComplete="off"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
        <i
          className="fa-solid fa-magnifying-glass position-absolute top-50 translate-middle-y"
          style={{ color: "#FFC007", right: "15px" }}
        ></i>
      </div>

      {/* Dropdown Panel */}
      {isFocused && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-3"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleTabClick("resale")}
              onMouseDown={(e) => e.preventDefault()}
              className={`flex-1 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
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
              className={`flex-1 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                searchType === "preconstruction"
                  ? "border-[#FFC007] text-[#FFC007]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pre Construction
            </button>
          </div>

          {/* Results Section */}
          <div className="max-h-[400px] overflow-y-auto">
            {searchType !== "preconstruction" && (
              <>
                {/* Properties Section */}
                {searchResults.properties.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-1 text-xs font-medium text-gray-500">
                      Properties
                    </div>
                    {searchResults.properties.map((property, index) => (
                      <Link
                        href={`/resale/listing/${property.ListingKey}`}
                        key={index}
                        onClick={clearSearch}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <i className="fa-solid fa-home text-gray-400 text-xs w-6"></i>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-gray-700 truncate">
                            {property.UnparsedAddress}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {property.City} - $
                            {property.ListPrice?.toLocaleString()}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Resale Cities Section */}
                {searchResults.resaleCities.length > 0 && (
                  <div className="py-2 border-t border-gray-100">
                    <div className="px-4 py-1 text-xs font-medium text-gray-500">
                      Cities
                    </div>
                    {searchResults.resaleCities.map((city, index) => (
                      <Link
                        href={`/resale/ontario/${city.city
                          .toLowerCase()
                          .replace(/ /g, "-")}/homes-for-sale`}
                        key={index}
                        onClick={clearSearch}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <i className="fa-solid fa-location-dot text-gray-400 text-xs w-6"></i>
                        <span className="text-xs text-gray-700">
                          {city.city}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {searchType === "preconstruction" && (
              <>
                {/* Pre-Construction Cities */}
                {searchResults.cities.map((city, index) => (
                  <Link
                    href={"/" + city.slug}
                    key={index}
                    onClick={clearSearch}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <i className="fa-solid fa-location-dot text-gray-400 text-xs w-6"></i>
                    <span className="text-xs text-gray-700">{city.name}</span>
                  </Link>
                ))}

                {/* Pre-Construction Projects */}
                {searchResults.projects.map((project, index) => (
                  <Link
                    href={"/" + project.city.slug + "/" + project.slug}
                    key={index}
                    onClick={clearSearch}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <i className="fa-solid fa-building text-gray-400 text-xs w-6"></i>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-700 truncate">
                        {project.project_name}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {project.city.name}
                      </div>
                    </div>
                  </Link>
                ))}
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
                      <div className="text-sm text-gray-500">Searching...</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <i className="fas fa-search text-2xl text-gray-300"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">
                          No matches found
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
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
