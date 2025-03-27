"use client";
import { useState } from "react";
import ProjectSearch from "./ProjectSearch";

const HomeSearch = () => {
  const [activeSearchType, setActiveSearchType] = useState("sale");

  const handleSearchTypeChange = (type) => {
    setActiveSearchType(type);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Type Buttons - Styled like the navigation */}
      <div className="w-full md:max-w-sm max-w-xs mx-auto">
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
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <ProjectSearch
          isHomepage={true}
          searchType={activeSearchType}
          generateCityUrl={(cityPath) => {
            switch (activeSearchType) {
              case "sale":
                return `/resale/ontario/${cityPath}/homes-for-sale`;
              case "lease":
                return `/resale/ontario/${cityPath}/homes-for-lease`;
              case "preconstruction":
                return `/${cityPath}`;
              default:
                return `/resale/ontario/${cityPath}/homes-for-sale`;
            }
          }}
        />
      </div>
    </div>
  );
};

export default HomeSearch;
