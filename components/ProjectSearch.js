"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SearchWithAutocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    cities: [],
    projects: [],
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState({ cities: [], projects: [] });
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.condomonk.ca/api/all-precons-search/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults({ cities: [], projects: [] });
      return;
    }

    // Filter the search results based on the search term
    const filteredCities = data.cities
      .filter(
        (city) =>
          city.name.toLowerCase().includes(term.toLowerCase()) ||
          city.slug.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 3);

    const filteredProjects = data.projects
      .filter(
        (project) =>
          project.project_name.toLowerCase().includes(term.toLowerCase()) ||
          project.slug.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 3);

    setSearchResults({ cities: filteredCities, projects: filteredProjects });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.name || option.project_name);
    setSearchResults({ cities: [], projects: [] });
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
          className="form-control py-2 w-mine5 "
          id="searchInput"
          placeholder="Search city or project"
          autoComplete="off"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </div>

      {isFocused &&
        (searchResults.cities.length > 0 ||
          searchResults.projects.length > 0) && (
          <div className="autocomplete-results position-absolute bg-white shadow rounded">
            {searchResults.cities.length > 0 && (
              <div>
                <h3 className="h5 bg-light text-sm px-3 py-2">Cities</h3>
                <ul className="list-unstyled px-3 text-xs">
                  {searchResults.cities.map((city, index) => (
                    <Link href={"/" + city.slug}>
                      <li
                        key={index}
                        className="mb-2 cursor-pointer fs-vsmall text-black"
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
                <h3 className="h5 bg-light text-sm px-3 pt-3 pb-2">Projects</h3>
                <ul className="list-unstyled  text-xs px-3">
                  {searchResults.projects.map((project, index) => (
                    <Link href={"/" + project.city.slug + "/" + project.slug}>
                      <li
                        key={index}
                        className="mb-2 cursor-pointer fs-vsmall text-black"
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
