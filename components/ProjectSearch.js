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
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState({
    cities: [],
    projects: [],
    resaleCities: allCities, // Initialize with resale cities
  });
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.condomonk.ca/api/all-precons-search/?search=" +
            searchTerm.toLowerCase()
        );
        // Merge API data with local resale cities
        setData({
          cities: response.data.cities,
          projects: response.data.projects,
          resaleCities: allCities, // Keep resale cities in data
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);

    if (term.trim() === "") {
      setSearchResults({ cities: [], projects: [], resaleCities: [] });
      return;
    }

    // Filter preconstruction cities from API
    const filteredCities = data.cities
      .filter((city) => city.name.toLowerCase().includes(term))
      .slice(0, 3);

    // Filter projects from API
    const filteredProjects = data.projects
      .filter((project) => project.project_name.toLowerCase().includes(term))
      .slice(0, 3);

    // Filter resale cities from allCities
    const filteredResaleCities = data.resaleCities
      .filter((cityObj) => cityObj.city.toLowerCase().includes(term))
      .slice(0, 3);

    setSearchResults({
      cities: filteredCities,
      projects: filteredProjects,
      resaleCities: filteredResaleCities,
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
    setSearchResults({ cities: [], projects: [], resaleCities: [] });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className="position-relative">
      <div>
        <input
          type="text"
          className="form-control py-2 w-mine5"
          id="searchInput"
          placeholder="Search for a city or project"
          autoComplete="off"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </div>

      {isFocused && searchTerm && (
        <div className="autocomplete-results position-absolute bg-white shadow rounded zzz">
          {searchResults.resaleCities.length > 0 && (
            <div>
              <h3 className="h4 bg-light fs-small p-3 fw-bold">
                Resale Cities
              </h3>
              <ul className="list-unstyled px-3">
                {searchResults.resaleCities.map((city, index) => (
                  <Link
                    href={`/resale/ontario/${city.city
                      .toLowerCase()
                      .replace(/ /g, "-")}/homes-for-sale`}
                    key={index}
                  >
                    <li
                      className="mb-2 cursor-pointer fs-vvsmall text-black"
                      onClick={() => handleOptionSelect(city)}
                    >
                      {city.city}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}

          {searchResults.cities.length > 0 && (
            <div>
              <h3 className="h4 bg-light fs-small p-3 fw-bold">
                Pre Construction Cities
              </h3>
              <ul className="list-unstyled px-3">
                {searchResults.cities.map((city, index) => (
                  <Link href={"/" + city.slug} key={index}>
                    <li
                      className="mb-2 cursor-pointer fs-vvsmall text-black"
                      onClick={() => handleOptionSelect(city)}
                    >
                      {city.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}

          {searchResults.projects.length > 0 && (
            <div>
              <h3 className="h4 bg-light fs-small p-3 fw-bold">
                {" "}
                Pre construction Projects
              </h3>
              <ul className="list-unstyled px-3">
                {searchResults.projects.map((project, index) => (
                  <Link
                    href={"/" + project.city.slug + "/" + project.slug}
                    key={index}
                  >
                    <li
                      className="mb-2 cursor-pointer fs-vvsmall text-black"
                      onClick={() => handleOptionSelect(project)}
                    >
                      {project.project_name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithAutocomplete;
