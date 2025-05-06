"use client";
import { useState } from "react";
import ProjectSearch from "./ProjectSearch";

const defaultCities = [
  { name: "Toronto", slug: "toronto" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Brampton", slug: "brampton" },
  { name: "Hamilton", slug: "hamilton" },
  { name: "Ottawa", slug: "ottawa" },
];

const HomeSearch = () => {
  const [activeSearchType, setActiveSearchType] = useState("sale");
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSearchTypeChange = (type) => {
    setActiveSearchType(type);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
  };

  const handleNavigationStart = () => {
    setIsNavigating(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Search Type Buttons - Styled like the navigation */}
      {/* <div className="w-full md:max-w-sm max-w-xs mx-auto">
        <div className="flex  mb-6 bg-white  rounded-xl">
          <button
            onClick={() => handleSearchTypeChange("sale")}
            className={`md:px-6 px-3 py-3 rounded-xl md:text-sm text-xs font-medium transition-colors ${
              activeSearchType === "sale"
                ? "bg-[#eef7f0] text-[#32a953]"
                : "text-black hover:bg-gray-100"
            }`}
          >
            For sale
          </button>
          <button
            onClick={() => handleSearchTypeChange("lease")}
            className={`px-6 py-3 rounded-xl md:text-sm text-xs font-medium transition-colors ${
              activeSearchType === "lease"
                ? "bg-[#eef7f0] text-[#32a953]"
                : "text-black hover:bg-gray-100"
            }`}
          >
            For lease
          </button>
          <button
            onClick={() => handleSearchTypeChange("preconstruction")}
            className={`px-6 py-3 rounded-xl md:text-sm text-xs font-medium transition-colors ${
              activeSearchType === "preconstruction"
                ? "bg-[#eef7f0] text-[#32a953]"
                : "text-black hover:bg-gray-100"
            }`}
          >
            Pre-construction
          </button>
        </div>
      </div> */}

      {/* Search Bar with increased height */}
      <div className="relative w-full">
        <ProjectSearch
          isHomepage={true}
          searchType={activeSearchType}
          setSearchType={setActiveSearchType}
          onSearchStart={handleSearchStart}
          onNavigationStart={handleNavigationStart}
          defaultCities={defaultCities}
          showOnlyPreconstruction={activeSearchType === "preconstruction"}
          customInputClasses="h-[60px] text-base"
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center md:hidden">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#32a953]"></div>
        </div>
      )}

      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#32a953] border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
