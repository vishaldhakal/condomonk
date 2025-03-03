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

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [preconResponse, propertyResponse] = await Promise.all([
          axios.get(
            "https://api.condomonk.ca/api/all-precons-search/?search=" +
              searchTerm.toLowerCase()
          ),
          searchTerm.length >= 2
            ? fetch(`/api/search?term=${encodeURIComponent(searchTerm)}`).then(
                (res) => res.json()
              )
            : Promise.resolve({ value: [] }),
        ]);

        // Limit each category to 5 items
        setData({
          cities: (preconResponse.data.cities || []).slice(0, 5),
          projects: (preconResponse.data.projects || []).slice(0, 5),
          resaleCities: allCities,
          properties: propertyResponse.value || [],
        });

        // Also update search results directly with limits
        setSearchResults({
          cities: (preconResponse.data.cities || []).slice(0, 5),
          projects: (preconResponse.data.projects || []).slice(0, 5),
          resaleCities: allCities
            .filter((cityObj) =>
              cityObj.city.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5), // Limit resale cities to 5
          properties: propertyResponse.value || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Only fetch if searchTerm has at least 2 characters
    if (searchTerm.length >= 2) {
      fetchData();
    } else {
      // Clear results if search term is too short
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
    }
  }, [searchTerm]);

  // Add this useEffect to handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsFocused(false);
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
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
    // Handle different option types
    if (option.name) {
      setSearchTerm(option.name); // Pre-construction city
    } else if (option.project_name) {
      setSearchTerm(option.project_name); // Project
    } else if (option.city) {
      setSearchTerm(option.city); // Resale city
    }
    setSearchResults({
      cities: [],
      projects: [],
      resaleCities: [],
      properties: [],
    });
  };

  const handleTabClick = (type) => {
    setSearchType(type);
    // Ensure input stays focused
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    // Check if the related target is within our dropdown
    if (dropdownRef.current?.contains(e.relatedTarget)) {
      // If clicking within dropdown, keep focus
      inputRef.current?.focus();
      return;
    }

    // Otherwise, close after a short delay
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
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
                {/* Resale Cities */}
                {searchResults.resaleCities.map((city, index) => (
                  <Link
                    href={`/resale/ontario/${city.city
                      .toLowerCase()
                      .replace(/ /g, "-")}/homes-for-sale`}
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <i className="fa-solid fa-location-dot text-gray-400 text-xs w-6"></i>
                    <span className="text-xs text-gray-700">{city.city}</span>
                  </Link>
                ))}

                {/* Resale Properties */}
                {searchResults.properties.map((property, index) => (
                  <Link
                    href={`/resale/listing/${property.ListingKey}`}
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <i className="fa-solid fa-location-dot text-gray-400 text-xs w-6"></i>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-700 truncate">
                        {property.UnparsedAddress}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {property.City}
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}

            {searchType === "preconstruction" && (
              <>
                {/* Pre-Construction Cities */}
                {searchResults.cities.map((city, index) => (
                  <Link
                    href={"/" + city.slug}
                    key={index}
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
                <div className="py-6 text-center">
                  <div className="text-xs text-gray-400">
                    No results found for "{searchTerm}"
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;
