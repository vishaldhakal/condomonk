"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectSearch from "./ProjectSearch";
import { usePathname } from "next/navigation";
// import MobileNavbar from "./MobileNavbar";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";

const Navbar = ({ cities, transparent }) => {
  const [cityname, setCityname] = useState("");
  const [navbar, setNavbar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resaleDropdownOpen, setResaleDropdownOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [showCities, setShowCities] = useState(false);
  const [showHomesForSale, setShowHomesForSale] = useState(false);

  // Top 5 cities for quick access
  const topCities = [
    { name: "Toronto", slug: "toronto" },
    { name: "Mississauga", slug: "mississauga" },
    { name: "Brampton", slug: "brampton" },
    { name: "Markham", slug: "markham" },
    { name: "Vaughan", slug: "vaughan" },
    { name: "Oakville", slug: "oakville" },
  ];

  // Resale cities array
  const resaleCities = [
    { name: "Toronto", slug: "toronto" },
    { name: "Mississauga", slug: "mississauga" },
    { name: "Brampton", slug: "brampton" },
    { name: "Vaughan", slug: "vaughan" },
    { name: "Markham", slug: "markham" },
    { name: "Richmond Hill", slug: "richmond-hill" },
    { name: "Oakville", slug: "oakville" },
    { name: "Burlington", slug: "burlington" },
    { name: "Milton", slug: "milton" },
    { name: "Barrie", slug: "barrie" },
    { name: "Ajax", slug: "ajax" },
    { name: "Pickering", slug: "pickering" },
    { name: "Whitby", slug: "whitby" },
    { name: "Oshawa", slug: "oshawa" },
    { name: "Hamilton", slug: "hamilton" },
    { name: "Kitchener", slug: "kitchener" },
    { name: "Waterloo", slug: "waterloo" },
    { name: "Cambridge", slug: "cambridge" },
    { name: "Guelph", slug: "guelph" },
    { name: "London", slug: "london" },
    { name: "Niagara", slug: "niagara" },
    { name: "St Catharines", slug: "st-catharines" },
    { name: "Kingston", slug: "kingston" },
    { name: "Ottawa", slug: "ottawa" },
    { name: "Aurora", slug: "aurora" },
    { name: "Newmarket", slug: "newmarket" },
    { name: "Scarborough", slug: "scarborough" },
    { name: "North York", slug: "north-york" },
    { name: "Etobicoke", slug: "etobicoke" },
  ];

  // Determine if we're on a preconstruction page
  const isPreconstructionPage =
    pathname.split("/").length >= 2 && !pathname.includes("resale");

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
      setIsScrolled(true);
    } else {
      setNavbar(false);
      setIsScrolled(false);
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
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setButtonClicked(!buttonClicked);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCityClick = (e) => {
    setIsDropdownOpen(false);
    setIsCollapsed(false);
  };

  const handleResaleMouseEnter = () => {
    setResaleDropdownOpen(true);
  };

  const handleResaleMouseLeave = () => {
    setResaleDropdownOpen(false);
  };

  // Helper functions for page type detection
  const isResalePage =
    pathname.includes("/resale/") && !pathname.includes("/resale/listing/");
  const isMainResalePage =
    pathname === "/resale/ontario/homes-for-sale" ||
    pathname === "/resale/ontario/" ||
    pathname === "/resale/ontario";
  const isCityResalePage =
    isResalePage && !isMainResalePage && pathname.includes("/resale/ontario/");
  const isSpecialPage =
    pathname.startsWith("/blogs") ||
    pathname.startsWith("/top-10-gta-projects") ||
    pathname.startsWith("/assignment-sale") ||
    pathname.startsWith("/pre-construction-homes");

  // Get current city from URL
  const getCurrentCity = () => {
    if (isMainResalePage || isSpecialPage) return null;

    if (isCityResalePage) {
      const matches = pathname.match(/\/resale\/ontario\/([^\/]+)/);
      if (matches) return matches[1].split("/")[0];
    } else {
      const city = pathname.split("/")[1];
      return city && city !== "resale" ? city : null;
    }
    return null;
  };

  const currentCity = getCurrentCity();
  const cityName = currentCity
    ? currentCity.charAt(0).toUpperCase() + currentCity.slice(1)
    : "";

  // Helper function for resale links
  const getResaleLink = (type) => {
    if (currentCity && !isSpecialPage) {
      return `/resale/ontario/${currentCity}/${type}`;
    }
    return `/resale/ontario/${type}`;
  };

  const isPreconCityPage = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      // Remove leading/trailing slashes and split
      const parts = path.replace(/^\/+|\/+$/g, "").split("/");
      console.log(parts);
      return parts.length === 1 && parts[0] !== "";
    }
    return false;
  };

  return (
    <nav className="w-full bg-white z-[9999]">
      <div className={`max-w-[85.625rem] mx-auto px-4`}>
        <div className="flex md:justify-between justify-center md:items-center items-between h-12 md:h-16">
          {/* Left section - Logo and Search */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Condomonk
            </Link>
            <div className="hidden md:block md:w-[400px] ">
              <ProjectSearch
                searchType={isPreconstructionPage ? "preconstruction" : "sale"}
                cityName={cityName}
              />
            </div>
          </div>

          {/* Right section - Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cities Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => {
                if (closeTimeout) {
                  clearTimeout(closeTimeout);
                  setCloseTimeout(null);
                }
                setCitiesDropdownOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setCitiesDropdownOpen(false);
                }, 300);
                setCloseTimeout(timeout);
              }}
            >
              <button className="flex items-center gap-1 px-1 py-2 text-sm">
                Pre Construction Cities
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`absolute top-full left-0 w-[500px] bg-white shadow-lg rounded-lg transition-all duration-300 z-50 ${
                  citiesDropdownOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                }`}
              >
                <div className="grid grid-cols-4 gap-4 p-4">
                  {cities &&
                    cities.map((city) => (
                      <Link
                        key={city.id}
                        href={`/${city.slug}`}
                        className="text-gray-600 hover:text-blue-600 text-sm"
                      >
                        {city.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Homes for Sale & Lease Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setResaleDropdownOpen(true)}
              onMouseLeave={() => setResaleDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-1 py-2 text-sm">
                {isResalePage ? "Pre Construction" : "Homes for Sale & Lease"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl border border-gray-200 transition-all duration-300 z-50 ${
                  resaleDropdownOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                }`}
                style={{
                  minWidth: isResalePage ? "300px" : "600px",
                  maxWidth: "90vw",
                }}
              >
                <div
                  className={`grid ${
                    isResalePage ? "grid-cols-1" : "grid-cols-2"
                  } gap-4 p-4`}
                >
                  {isResalePage ? (
                    // Pre Construction Links
                    <div className="space-y-4">
                      <div className="text-sm font-bold text-black pb-2 border-b border-gray-200">
                        PRE CONSTRUCTION HOMES
                      </div>
                      <div className="flex flex-col space-y-2">
                        {isMainResalePage || pathname === "/resale/ontario/" ? (
                          <>
                            <Link
                              href="/pre-construction-homes"
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              All Pre Construction Homes
                            </Link>
                            <Link
                              href="/top-10-gta-projects"
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              Top 10 GTA Projects
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/${currentCity}`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              All Pre Construction Homes{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/condos`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              Pre Construction Condos{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/townhomes`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              Pre Construction Townhomes{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/detached`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              Pre Construction Detached Homes{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/upcoming`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              Upcoming Pre Construction{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Homes for Sale & Lease Links
                    <>
                      <div className="space-y-4">
                        <div className="text-sm font-bold text-black pb-2 border-b border-gray-200 text-center">
                          HOMES FOR SALE
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {resaleCities.map((city) => (
                            <Link
                              key={city.slug}
                              href={`/resale/ontario/${city.slug}/homes-for-sale`}
                              className="text-gray-600 hover:text-gray-900 text-xs hover:underline"
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 border-l border-gray-200 pl-4">
                        <div className="text-sm font-bold text-black pb-2 border-b border-gray-200 text-center">
                          HOMES FOR LEASE
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {resaleCities.map((city) => (
                            <Link
                              key={city.slug}
                              href={`/resale/ontario/${city.slug}/homes-for-lease`}
                              className="text-gray-600 hover:text-gray-900 text-xs hover:underline"
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* Top Cities Row */}
                {/* <div className="pt-3 border-t border-gray-100 p-4">
                  <div className="text-xs font-medium text-gray-500 mb-2">
                    TOP CITIES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/resale/ontario/${city.slug}/homes-for-sale`}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full border border-gray-200 transition-colors duration-200"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            <Link href="/assignment-sale" className="px-1 py-2 text-sm">
              Assignment
            </Link>
            <Link href="/blogs" className="px-1 py-2 text-sm">
              Blogs
            </Link>
            <Link href="#contact" className="px-1 py-2 text-sm">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile sticky search bar */}
      <div className="md:hidden">
        <div
          className={`${
            isScrolled && !pathname.includes("/listings")
              ? "fixed top-0 left-0 right-0 z-50"
              : "sticky top-0 z-50"
          } bg-white `}
        >
          <div className="mx-auto px-4 md:py-2">
            <ProjectSearch
              searchType={isPreconstructionPage ? "preconstruction" : "sale"}
              cityName={cityName}
            />
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden py-4">
          <div className="flex flex-col gap-4">
            {cities && (
              <div className="relative">
                <button
                  onClick={() => setShowCities(!showCities)}
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-600 hover:text-blue-600"
                >
                  Cities
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showCities ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showCities && (
                  <div className="grid grid-cols-3 gap-4 px-4 py-2 bg-white">
                    {cities.map((city) => (
                      <Link
                        key={city.id}
                        href={`/${city.slug}`}
                        className="block py-2 text-gray-600 hover:text-blue-600"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Homes for Sale Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowHomesForSale(!showHomesForSale)}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-600 hover:text-blue-600"
              >
                {isResalePage ? "Pre Construction" : "Homes for Sale & Lease"}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showHomesForSale ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showHomesForSale && (
                <div className="px-4 py-2 bg-white">
                  {isResalePage ? (
                    // Pre Construction Links
                    <div className="space-y-2">
                      <div className="text-sm font-bold text-black pb-2">
                        PRE CONSTRUCTION HOMES
                      </div>
                      {isMainResalePage || pathname === "/resale/ontario/" ? (
                        <>
                          <Link
                            href="/pre-construction-homes"
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            All Pre Construction Homes
                          </Link>
                          <Link
                            href="/top-10-gta-projects"
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            Top 10 GTA Projects
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/${currentCity}`}
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            All Pre Construction Homes{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={`/${currentCity}/condos`}
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            Pre Construction Condos{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={`/${currentCity}/townhomes`}
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            Pre Construction Townhomes{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={`/${currentCity}/detached`}
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            Pre Construction Detached Homes{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={`/${currentCity}/upcoming`}
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            Upcoming Pre Construction{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                        </>
                      )}
                    </div>
                  ) : (
                    // Homes for Sale & Lease Links
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-bold text-black pb-2">
                          HOMES FOR SALE
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {resaleCities.map((city) => (
                            <Link
                              key={city.slug}
                              href={`/resale/ontario/${city.slug}/homes-for-sale`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>

                        {/* Top Cities Row for Mobile */}
                        {/* <div className="pt-3 border-t border-gray-100 mt-3">
                          <div className="text-xs font-medium text-gray-500 mb-2">
                            TOP CITIES
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {topCities.map((city) => (
                              <Link
                                key={city.slug}
                                href={`/resale/ontario/${city.slug}/homes-for-sale`}
                                className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full border border-gray-200 transition-colors duration-200"
                              >
                                {city.name}
                              </Link>
                            ))}
                          </div>
                        </div> */}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-black pb-2">
                          HOMES FOR LEASE
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {resaleCities.map((city) => (
                            <Link
                              key={city.slug}
                              href={`/resale/ontario/${city.slug}/homes-for-lease`}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/assignment-sale" className="block px-4 py-2">
              Assignment
            </Link>
            <Link href="/blogs" className="block px-4 py-2">
              Blogs
            </Link>
            <Link href="#contact" className="block px-4 py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
