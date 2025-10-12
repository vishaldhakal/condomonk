"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import citiesWithProvinces, { allCities } from "@/data/ontarioCities";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

const SearchWithAutocomplete = ({
  isHomepage = false,
  searchType = "sale",
  setSearchType = () => {},
  showOnlyPreconstruction = false,
  generateCityUrl,
  onNavigationStart,
  defaultCities = [],
  animatedPlaceholder,
  customInputClasses = "",
  cityName = "",
  searchTypeOption = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    cities: [],
    projects: [],
    resaleCities: [],
    properties: [],
  });
  const [data, setData] = useState({
    cities: [],
    projects: [],
    resaleCities: allCities,
    properties: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  // Add localSearchType state at component level - always set to preconstruction
  const [localSearchType, setLocalSearchType] = useState("preconstruction");
  const [localCityName, setLocalCityName] = useState(cityName);

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

  // Recent searches helpers
  const RECENT_KEY = "cm_recent_searches";
  const MAX_RECENTS = 8;

  const loadRecentSearches = () => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveRecentSearches = (items) => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const addRecentSearch = (item) => {
    if (!item || !item.href || !item.label) return;
    setRecentSearches((prev) => {
      const withoutDup = prev.filter((r) => r.href !== item.href);
      const next = [item, ...withoutDup].slice(0, MAX_RECENTS);
      saveRecentSearches(next);
      return next;
    });
  };

  useEffect(() => {
    // load on mount
    const initial = loadRecentSearches();
    setRecentSearches(initial);
  }, []);

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

  useEffect(() => {
    const currentCity = citiesWithProvinces
      .map((item) => item?.city)
      .find((city) => pathname.includes(city.toLowerCase()));
    currentCity && setLocalCityName(currentCity);
  }, [pathname]);

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
    // Clear the city name placeholder when user focuses to type
    if (localCityName) {
      setLocalCityName("");
    }
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
    setTimeout(() => {
      setIsFocused(false);
      setSearchTerm("");
      setSearchResults({
        cities: [],
        projects: [],
        resaleCities: [],
        properties: [],
      });
      setLocalCityName(""); // Hide city name after clearing
      inputRef.current?.blur();
    }, 100);
  };

  // Update handleLinkClick function
  const handleLinkClick = async (e, href, meta) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // store recent before navigation
      if (meta?.label) {
        addRecentSearch({
          label: meta.label,
          href,
          type: meta.type || "link",
          icon: meta.icon || "link",
        });
      }
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
  const handleTouchStart = (e, href, meta) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate and reset state
    if (meta?.label) {
      addRecentSearch({
        label: meta.label,
        href,
        type: meta.type || "link",
        icon: meta.icon || "link",
      });
    }
    router.push(href);

    // Clear states to close dropdown
    setIsFocused(false);
    setSearchTerm("");
    setSearchResults({
      cities: [],
      projects: [],
      resaleCities: [],
      properties: [],
    });
  };

  const handlePlaceholderClick = () => {
    window.location.href = "/";
  };

  // Apply different classes based on whether this is the homepage or not
  const inputClasses = isHomepage
    ? `w-full px-8 text-sm rounded-r-full border-0 shadow-md focus:outline-none hover:bg-teal-50 focus:ring-1 focus:ring-teal-500 ${customInputClasses}`
    : `w-full md:py-3 py-4 px-10 text-black text-xs bg-white border ${
        !searchTypeOption ? "rounded-full" : "border-l-0 rounded-r-full "
      } border-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-teal-500 hover:bg-teal-50`;

  const placeholderText = localCityName
    ? localCityName
    : isHomepage
      ? "Enter location, neighborhood, or property"
      : "Search for a city or project...";

  return (
    <div className={`relative ${isHomepage ? "w-full" : "w-[380px]"}`}>
      <div className="relative flex text-xs ">
        <div className="relative ">
          {searchTypeOption && (
            <button
              className={`h-full px-3 py-3 text-white font-medium rounded-l-full flex items-center gap-2 cursor-default`}
              style={{
                backdropFilter: "blur(4px)",
                background:
                  "linear-gradient(90.37deg, #0c4f47, #1e7167 99.68%)",
              }}
            >
              Pre Construction
            </button>
          )}
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            className={inputClasses}
            id="searchInput"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
          />
          {/* <X className="fa-solid fa-magnifying-glass absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg" /> */}
          {/* {searchTerm && (
            <div className="">
              <button
                className="flex-1 text-center text-lg font-bold text-black w-fit"
                onClick={handlePlaceholderClick}
              >
                {placeholderText}
              </button>
            </div>
          )} */}
          {!searchTerm && localCityName && (
            <div className="absolute inset-y-0 left-2 h-[80%] top-1 flex items-center px-2 text-gray-500 transition-colors w-fit text-base">
              {placeholderText}
              <button
                type="button"
                className="text-gray-500 ml-1"
                onClick={clearSearch}
                tabIndex={0}
              >
                <X className="w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isFocused && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-30"
        >
          {/* Show default cities when no search term and on homepage */}
          {isHomepage && !searchTerm && defaultCities.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-sm font-medium text-gray-700 text-left">
                Popular Cities
              </div>
              <div className="grid grid-cols-2 gap-1">
                {defaultCities.map((city, index) => {
                  // Always use preconstruction URL
                  const cityUrl = `/${city.slug}`;

                  return (
                    <Link
                      href={cityUrl}
                      key={index}
                      onClick={(e) =>
                        handleLinkClick(e, cityUrl, {
                          label: city.name,
                          type: "city",
                          icon: "location",
                        })
                      }
                      onTouchStart={(e) =>
                        handleTouchStart(e, cityUrl, {
                          label: city.name,
                          type: "city",
                          icon: "location",
                        })
                      }
                      className="flex items-center px-4 py-3 hover:bg-teal-50"
                    >
                      <i className="fa-solid fa-location-dot text-gray-400 text-base w-6"></i>
                      <span className="text-base text-gray-700">
                        {city.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent searches when typing */}
          {searchTerm && recentSearches.length > 0 && (
            <div className="py-2 border-b border-gray-100">
              <div className="px-4 py-1 text-sm font-medium text-gray-700 text-left">
                Recent Searches
              </div>
              {recentSearches
                .filter((r) =>
                  r.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5)
                .map((r, idx) => (
                  <Link
                    href={r.href}
                    key={`${r.href}-${idx}`}
                    onClick={(e) =>
                      handleLinkClick(e, r.href, {
                        label: r.label,
                        type: r.type,
                        icon: r.icon,
                      })
                    }
                    onTouchStart={(e) =>
                      handleTouchStart(e, r.href, {
                        label: r.label,
                        type: r.type,
                        icon: r.icon,
                      })
                    }
                    className="flex items-start px-4 py-2 hover:bg-teal-50 border-b border-gray-100 last:border-0"
                  >
                    <i className="fa-regular fa-clock text-gray-400 text-sm w-6"></i>
                    <span className="text-sm text-gray-700 truncate">
                      {r.label}
                    </span>
                  </Link>
                ))}
            </div>
          )}

          {/* Show search results when there's a search term */}
          {searchTerm && (
            <div
              className={`${
                isHomepage ? "max-h-[450px]" : "max-h-[400px]"
              } overflow-y-auto`}
            >
              {/* Pre-Construction Cities */}
              {searchResults.cities?.length > 0 && (
                <div className="py-2 border-t border-gray-100">
                  <div className="px-4 py-1 text-sm font-medium text-gray-700 text-left">
                    Cities
                  </div>
                  {searchResults.cities.map((city, index) => (
                    <Link
                      href={`/${city.slug}`}
                      key={index}
                      onClick={(e) =>
                        handleLinkClick(e, `/${city.slug}`, {
                          label: city.name,
                          type: "city",
                          icon: "location",
                        })
                      }
                      onTouchStart={(e) =>
                        handleTouchStart(e, `/${city.slug}`, {
                          label: city.name,
                          type: "city",
                          icon: "location",
                        })
                      }
                      className="flex items-start px-4 py-2 hover:bg-teal-50 border-b border-gray-100 last:border-0"
                    >
                      <i className="fa-solid fa-location-dot text-gray-400 text-sm w-6"></i>
                      <span className="text-sm text-gray-700">{city.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {/* Pre-Construction Projects */}
              {searchResults.projects?.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1 text-sm font-medium text-gray-700 text-left">
                    Projects
                  </div>
                  {searchResults.projects.map((project, index) => (
                    <Link
                      href={`/${project.city.slug}/${project.slug}`}
                      key={index}
                      onClick={(e) =>
                        handleLinkClick(
                          e,
                          `/${project.city.slug}/${project.slug}`,
                          {
                            label: project.project_name,
                            type: "project",
                            icon: "building",
                          }
                        )
                      }
                      onTouchStart={(e) =>
                        handleTouchStart(
                          e,
                          `/${project.city.slug}/${project.slug}`,
                          {
                            label: project.project_name,
                            type: "project",
                            icon: "building",
                          }
                        )
                      }
                      className="flex items-start px-4 py-2 hover:bg-teal-50 border-b border-gray-100 last:border-0"
                    >
                      <i className="fa-solid fa-building text-gray-400 text-sm w-6"></i>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-gray-700 truncate">
                          {project.project_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          • {capitalizeWords(project.city.slug)}
                          <span className="pl-2">- {project.project_type}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No results message */}
          {searchTerm &&
            !isLoading &&
            !searchResults.cities.length &&
            !searchResults.projects.length && (
              <div className="py-8 text-center">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <i
                      className={`fas fa-search ${
                        isHomepage ? "text-4xl" : "text-3xl"
                      } text-gray-300`}
                    ></i>
                  </div>
                  <div>
                    <div
                      className={`${
                        isHomepage ? "text-lg" : "text-base"
                      } font-medium text-gray-600`}
                    >
                      No matches found
                    </div>
                    <div
                      className={`${
                        isHomepage ? "text-base" : "text-sm"
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
