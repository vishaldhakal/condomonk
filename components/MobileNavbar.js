"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MobileNavbar = ({ cities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Reuse the same helper functions from Navbar
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

  const getCurrentCity = () => {
    if (isMainResalePage || isSpecialPage) {
      return null;
    }

    if (isCityResalePage) {
      const matches = pathname.match(/\/resale\/ontario\/([^\/]+)/);
      if (matches) {
        return matches[1].split("/")[0];
      }
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

  const getResaleLink = (type) => {
    if (currentCity && !isSpecialPage) {
      return `/resale/ontario/${currentCity}/${type}`;
    }
    return `/resale/ontario/${type}`;
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Menu className="h-6 w-6 text-black" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[350px] p-0 animate-in slide-in-from-left duration-300 ease-in-out"
        >
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b transition-all duration-200">
              <Link
                href="/"
                onClick={handleLinkClick}
                className="font-bold text-2xl text-black transition-colors hover:text-gray-700"
              >
                Condomonk
              </Link>
            </div>

            <div className="flex-1 px-6 py-4 overflow-y-auto">
              <Accordion
                type="single"
                collapsible
                className="w-full transition-all duration-200"
              >
                <AccordionItem
                  value="cities"
                  className="border-none py-2 transition-all duration-200"
                >
                  <AccordionTrigger className="text-sm font-normal text-black hover:no-underline p-0 transition-all duration-200">
                    Cities
                  </AccordionTrigger>
                  <AccordionContent className="transition-all duration-300 ease-in-out">
                    <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {cities?.map((city) => (
                        <Link
                          key={city.id}
                          href={`/${city.slug}`}
                          onClick={handleLinkClick}
                          className="text-black hover:text-gray-600 transition-colors"
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="homes"
                  className="border-none transition-all duration-200"
                >
                  <AccordionTrigger className="text-sm font-normal text-black hover:no-underline p-0 transition-all duration-200">
                    {isResalePage
                      ? "Pre Construction"
                      : "Homes for Sale & Lease"}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 transition-all duration-300 ease-in-out">
                    {isResalePage ? (
                      <div className="flex flex-col space-y-3">
                        <div className="font-semibold text-black">
                          PRE CONSTRUCTION HOMES
                        </div>
                        {isMainResalePage || pathname === "/resale/ontario/" ? (
                          <>
                            <Link
                              href="/pre-construction-homes"
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              All Pre Construction Homes
                            </Link>
                            <Link
                              href="/top-10-gta-projects"
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Top 10 GTA Projects
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/${currentCity}`}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              All Pre Construction Homes{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/condos`}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Pre Construction Condos{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/townhomes`}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Pre Construction Townhomes{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/detached`}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Pre Construction Detached Homes{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={`/${currentCity}/upcoming`}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Upcoming Pre Construction{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-4">
                        <div>
                          <div className="font-semibold text-black mb-2">
                            HOMES FOR SALE
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Link
                              href={getResaleLink("homes-for-sale")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              All Homes For Sale {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink(
                                "semi-detached-homes-for-sale"
                              )}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Semi Detached Homes For Sale{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink("detached-homes-for-sale")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Detached Homes For Sale{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink("townhomes-for-sale")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Townhomes For Sale {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink("condos-for-sale")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Condos For Sale {cityName && `in ${cityName}`}
                            </Link>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-black mb-2">
                            HOMES FOR LEASE
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Link
                              href={getResaleLink(
                                "semi-detached-homes-for-lease"
                              )}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Semi Detached Homes For Lease{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink("detached-homes-for-lease")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Detached Homes For Lease{" "}
                              {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink("townhomes-for-lease")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Townhomes For Lease {cityName && `in ${cityName}`}
                            </Link>
                            <Link
                              href={getResaleLink("condos-for-lease")}
                              onClick={handleLinkClick}
                              className="text-black hover:text-gray-600 transition-colors"
                            >
                              Condos For Lease {cityName && `in ${cityName}`}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex flex-col space-y-5 mt-4">
                <Link
                  href="/top-10-gta-projects"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 transition-all duration-200 text-sm transform hover:translate-x-1"
                >
                  Top 10 <span className="font-medium">GTA</span> Projects
                </Link>
                <Link
                  href="/assignment-sale"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 transition-all duration-200 text-sm transform hover:translate-x-1"
                >
                  Assignment
                </Link>
                <Link
                  href="/blogs"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 transition-all duration-200 text-sm transform hover:translate-x-1"
                >
                  Blogs
                </Link>
                <Link
                  href="#contact"
                  onClick={handleLinkClick}
                  className="text-black hover:text-gray-600 transition-all duration-200 text-sm transform hover:translate-x-1"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
