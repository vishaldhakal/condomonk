"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectSearch from "./ProjectSearch";

const Navbar = ({ cities, transparent }) => {
  const [cityname, setCityname] = useState("");
  const [navbar, setNavbar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resaleDropdownOpen, setResaleDropdownOpen] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", changeBackground);
    }
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-fullwidth")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Import Bootstrap JavaScript
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setButtonClicked(!buttonClicked);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Force close any open Bootstrap dropdowns
    const dropdowns = document.querySelectorAll(".dropdown-menu.show");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });

    setIsDropdownOpen((prev) => !prev);
  };

  const handleCityClick = (e) => {
    setIsDropdownOpen(false);
    setIsCollapsed(false);
  };

  // Add hover handlers for resale dropdown
  const handleResaleMouseEnter = () => {
    setResaleDropdownOpen(true);
  };

  const handleResaleMouseLeave = () => {
    setResaleDropdownOpen(false);
  };

  return (
    <div
      className={navbar ? "navbar-transparent active" : "navbar-transparent"}
    >
      <nav className="navbar navbar-expand-lg py-lg-3">
        <div className="container justify-content-start">
          <div className="d-flex">
            <Link
              href="/"
              className="logo d-flex justify-content-center align-items-center pe-1 font-family2"
            >
              <span>Condomonk</span>
            </Link>
            <div
              className="input-group input-group-search
             me-md-0"
            >
              <ProjectSearch />
              {/* <SearchSuggest cities={cities} /> */}
            </div>
            <button
              className={`navbar-toggler ${buttonClicked ? "bg-white" : ""}`}
              type="button"
              onClick={toggleCollapse}
              aria-controls="collapsibleNavId"
              aria-expanded={isCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={`collapse navbar-collapse ${isCollapsed ? "show" : ""} ${
              isCollapsed ? "bg-white" : ""
            }`}
            id="collapsibleNavId"
          >
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown dropdown-fullwidth mx-1">
                <Link
                  className={`nav-link dropdown-toggle active fw-medium rounded-2 ${
                    isDropdownOpen ? "show" : ""
                  }`}
                  href="#"
                  role="button"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                >
                  Cities
                </Link>
                <div
                  className={`dropdown-menu mt-1 ${
                    isDropdownOpen ? "show" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="container">
                    <div className="row row-cols-md-4 row-cols-2">
                      {cities &&
                        cities.map((city) => (
                          <div className="col" key={city.id}>
                            <Link
                              className="dropdown-item"
                              href={`/${city.slug}`}
                              onClick={handleCityClick}
                            >
                              {city.name}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" href="/pre-construction-homes">
                  Pre Construction Homes
                </Link>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={handleResaleMouseEnter}
                onMouseLeave={handleResaleMouseLeave}
              >
                <Link
                  className={`nav-link dropdown-toggle ${
                    resaleDropdownOpen ? "show" : ""
                  }`}
                  href=""
                  role="button"
                  aria-expanded={resaleDropdownOpen}
                >
                  Homes for Sale & Lease
                </Link>
                <div
                  className={`absolute z-50 bg-white shadow-lg py-2 mt-0 rounded-xl ${
                    resaleDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="grid md:grid-cols-2 grid-cols-1 md:min-w-[520px] min-w-[250px] mt-2">
                    <div className="col px-4 ">
                      <div className="text-sm font-bold text-black mb-3 border-b border-gray-200">
                        HOMES FOR SALE
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          className="text-gray-600  hover:text-gray-900 text-sm"
                          href="/resale/ontario/homes-for-sale"
                        >
                          All Homes
                        </Link>
                        <Link
                          className="text-gray-600  hover:text-gray-900 text-sm"
                          href="/resale/ontario/semi-detached-homes-for-sale"
                        >
                          Semi Detached Homes for Sale
                        </Link>
                        <Link
                          className="text-gray-600  hover:text-gray-900 text-sm"
                          href="/resale/ontario/detached-homes-for-sale"
                        >
                          Detached Homes for Sale
                        </Link>
                        <Link
                          className="text-gray-600  hover:text-gray-900 text-sm"
                          href="/resale/ontario/townhomes-for-sale"
                        >
                          Townhomes for Sale
                        </Link>
                        <Link
                          className="text-gray-600  hover:text-gray-900 text-sm"
                          href="/resale/ontario/condos-for-sale"
                        >
                          Condos for Sale
                        </Link>
                      </div>
                    </div>

                    <div className="col px-4 border-l border-gray-200 mt-md-0 mt-5">
                      <div className="text-sm font-bold text-black mb-3 border-b border-gray-200">
                        HOMES FOR LEASE
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          className="text-gray-600 hover:text-gray-900 text-sm"
                          href="/resale/ontario/semi-detached-homes-for-lease"
                        >
                          Semi Detached Homes for Lease
                        </Link>
                        <Link
                          className="text-gray-600 hover:text-gray-900 text-sm"
                          href="/resale/ontario/detached-homes-for-lease"
                        >
                          Detached Homes for Lease
                        </Link>
                        <Link
                          className="text-gray-600 hover:text-gray-900 text-sm"
                          href="/resale/ontario/townhomes-for-lease"
                        >
                          Townhomes for Lease
                        </Link>
                        <Link
                          className="text-gray-600 hover:text-gray-900 text-sm"
                          href="/resale/ontario/condos-for-lease"
                        >
                          Condos for Lease
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item rounded-2  mx-1">
                <Link className="nav-link" href="/top-10-gta-projects">
                  Top 10 <span className="fw-medium">GTA</span> Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/blogs">
                  Blogs
                </Link>
              </li>
            </ul>
            <button
              className="btn bg-warning btn-warning my-2 my-sm-0 rounded ms-md-4 py-2 px-3 fs-6"
              type="submit"
            >
              <Link className="nav-link text-black " href="#contact">
                Contact Now
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
