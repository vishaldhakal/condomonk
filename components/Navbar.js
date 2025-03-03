"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectSearch from "./ProjectSearch";
import { usePathname } from "next/navigation";

const Navbar = ({ cities, transparent }) => {
  const [cityname, setCityname] = useState("");
  const [navbar, setNavbar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resaleDropdownOpen, setResaleDropdownOpen] = useState(false);
  const pathname = usePathname();

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

  // Helper function to determine if we're on a resale page
  const isResalePage = pathname.includes("/resale/");

  // Helper function to extract city name from path
  const getCurrentCity = () => {
    if (isResalePage) {
      // Extract city from resale path pattern /resale/ontario/city-name/...
      const matches = pathname.match(/\/resale\/ontario\/([^\/]+)/);
      return matches ? matches[1].split("-")[0] : null;
    } else {
      // Extract city from preconstruction path pattern /city-name/...
      const city = pathname.split("/")[1];
      return city && city !== "resale" ? city : null;
    }
  };

  const currentCity = getCurrentCity();
  const cityName = currentCity
    ? currentCity.charAt(0).toUpperCase() + currentCity.slice(1)
    : "";

  return (
    <div
      className={navbar ? "navbar-transparent active" : "navbar-transparent"}
      style={{ zIndex: 50 }}
    >
      <nav className="navbar navbar-expand-lg py-lg-3">
        <div className="container justify-content-start">
          <div className="d-flex">
            <Link
              href="/"
              className="logo d-flex justify-content-center align-items-center pe-1 font-family2 text-xs"
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
                  {isResalePage ? "Pre Construction" : "Homes for Sale & Lease"}
                </Link>
                <div
                  className={`absolute z-3 bg-white shadow-lg py-2 mt-0 rounded-xl border border-gray-200 ${
                    resaleDropdownOpen ? "block" : "hidden"
                  }`}
                  style={{
                    minWidth: isResalePage ? "300px" : "520px",
                    transform: "translateX(-50%)",
                    left: "50%",
                    marginTop: "0.5rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    className={`grid ${
                      isResalePage ? "grid-cols-1" : "md:grid-cols-2"
                    } grid-cols-1 min-w-[250px] mt-2`}
                  >
                    {isResalePage ? (
                      // Show preconstruction options when on resale pages
                      <div className="col px-4">
                        <div className="text-sm font-bold text-black mb-3 border-b border-gray-200">
                          PRE CONSTRUCTION HOMES
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link
                            className="text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap"
                            href={`/${currentCity}`}
                          >
                            All Pre Construction Homes{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            className="text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap"
                            href={`/${currentCity}/condos`}
                          >
                            Pre Construction Condos{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            className="text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap"
                            href={`/${currentCity}/townhomes`}
                          >
                            Pre Construction Townhomes{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            className="text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap"
                            href={`/${currentCity}/detached`}
                          >
                            Pre Construction Detached Homes{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            className="text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap"
                            href={`/${currentCity}/upcoming`}
                          >
                            Upcoming Pre Construction{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                        </div>
                      </div>
                    ) : (
                      // Show resale options when on preconstruction pages
                      <>
                        <div className="col px-4">
                          <div className="text-sm font-bold text-black mb-3 border-b border-gray-200">
                            HOMES FOR SALE
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/homes-for-sale`}
                            >
                              All Homes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/semi-detached-homes-for-sale`}
                            >
                              Semi Detached Homes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/detached-homes-for-sale`}
                            >
                              Detached Homes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/townhomes-for-sale`}
                            >
                              Townhomes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/condos-for-sale`}
                            >
                              Condos {cityName && `in ${cityName}`}
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
                              href={`/resale/ontario/${currentCity}/semi-detached-homes-for-lease`}
                            >
                              Semi Detached Homes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/detached-homes-for-lease`}
                            >
                              Detached Homes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/townhomes-for-lease`}
                            >
                              Townhomes {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              className="text-gray-600 hover:text-gray-900 text-sm"
                              href={`/resale/ontario/${currentCity}/condos-for-lease`}
                            >
                              Condos {cityName && `in ${cityName}`}
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
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
