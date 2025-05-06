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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

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

  return (
    <nav className="w-full bg-white">
      <div className="max-w-[1370px] mx-auto px-4">
        <div className="flex md:justify-between justify-center md:items-center items-between h-16">
          {/* Left section - Logo and Search */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Condomonk
            </Link>
            <div className="hidden md:block md:w-[400px] ">
              <ProjectSearch />
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
                Cities
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
                  minWidth: isResalePage ? "300px" : "520px",
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
                        <div className="text-sm font-bold text-black pb-2 border-b border-gray-200">
                          HOMES FOR SALE
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link
                            href={getResaleLink("homes-for-sale")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            All Homes For Sale {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("semi-detached-homes-for-sale")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Semi Detached Homes For Sale{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("detached-homes-for-sale")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Detached Homes For Sale{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("townhomes-for-sale")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Townhomes For Sale {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("condos-for-sale")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Condos For Sale {cityName && `in ${cityName}`}
                          </Link>
                        </div>
                      </div>
                      <div className="space-y-4 border-l border-gray-200 pl-4">
                        <div className="text-sm font-bold text-black pb-2 border-b border-gray-200">
                          HOMES FOR LEASE
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link
                            href={getResaleLink(
                              "semi-detached-homes-for-lease"
                            )}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Semi Detached Homes For Lease{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("detached-homes-for-lease")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Detached Homes For Lease{" "}
                            {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("townhomes-for-lease")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Townhomes For Lease {cityName && `in ${cityName}`}
                          </Link>
                          <Link
                            href={getResaleLink("condos-for-lease")}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                          >
                            Condos For Lease {cityName && `in ${cityName}`}
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
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
        <div className="md:hidden block md:w-[400px] mb-2">
          <ProjectSearch />
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              {cities &&
                cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/${city.slug}`}
                    className="block px-4 py-2 text-gray-600 hover:text-blue-600"
                  >
                    {city.name}
                  </Link>
                ))}
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
      </div>
    </nav>
  );
};

export default Navbar;
