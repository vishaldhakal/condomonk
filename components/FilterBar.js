import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { allCities } from "@/data/ontarioCities";

const priceRanges = [
  { label: "Under $500k", path: "homes-under-500k", maxPrice: 500000 },
  {
    label: "$500k - $750k",
    path: "homes-between-500k-750k",
    minPrice: 500000,
    maxPrice: 750000,
  },
  {
    label: "$750k - $1M",
    path: "homes-between-750k-1000k",
    minPrice: 750000,
    maxPrice: 1000000,
  },
  {
    label: "$1M - $1.5M",
    path: "homes-between-1000k-1500k",
    minPrice: 1000000,
    maxPrice: 1500000,
  },
  { label: "Over $1.5M", path: "homes-over-1500k", minPrice: 1500000 },
];

const propertyTypes = [
  { label: "Detached", path: "detached-homes", subtypes: ["Detached"] },
  {
    label: "Semi-Detached",
    path: "semi-detached-homes",
    subtypes: ["Semi-Detached"],
  },
  { label: "Townhouse", path: "townhouses", subtypes: ["Att/Row/Townhouse"] },
  {
    label: "Condo Townhouse",
    path: "condo-townhouses",
    subtypes: ["Condo Townhouse"],
  },
  { label: "Condos", path: "condos", subtypes: ["Condo Apartment"] },
];

const bedOptions = [
  { label: "1+ Bed", value: 1 },
  { label: "2+ Beds", value: 2 },
  { label: "3+ Beds", value: 3 },
  { label: "4+ Beds", value: 4 },
  { label: "5+ Beds", value: 5 },
];

const bathOptions = [
  { label: "1+ Bath", value: 1 },
  { label: "2+ Baths", value: 2 },
  { label: "3+ Baths", value: 3 },
  { label: "4+ Baths", value: 4 },
];

export default function FilterBar({ currentFilters }) {
  const baseUrl = "/resale/ontario";
  const cityPath = currentFilters.city
    ? `/${currentFilters.city.toLowerCase().replace(/ /g, "-")}`
    : "";

  const getFilterUrl = (newFilter) => {
    const base = `${baseUrl}${cityPath}`;
    let filters = { ...currentFilters };

    // Apply new filters while maintaining others
    Object.entries(newFilter).forEach(([key, value]) => {
      if (value === null) {
        delete filters[key];
      } else {
        filters[key] = value;
      }
    });

    // Ensure city is maintained from the current URL
    if (cityPath) {
      filters.city = currentFilters.city;
    }

    // Build URL parts in a specific order
    let urlPath = "";

    // 1. Start with base path (homes or property type)
    if (filters.propertyType) {
      // Find the property type path
      const propertyPath = propertyTypes.find(
        (p) => p.label === filters.propertyType
      )?.path;
      // Only use the property path if it exists
      urlPath = propertyPath || "homes";
    } else if (currentFilters.propertyType && !newFilter.propertyType) {
      // If we're not explicitly clearing property type, maintain the current one
      const propertyPath = propertyTypes.find(
        (p) => p.label === currentFilters.propertyType
      )?.path;
      urlPath = propertyPath || "homes";
      filters.propertyType = currentFilters.propertyType;
    } else {
      urlPath = "homes";
    }

    // 2. Add price range if present
    if (filters.maxPrice && !filters.minPrice) {
      urlPath += `-under-${(filters.maxPrice / 1000).toFixed(0)}k`;
    } else if (filters.minPrice && !filters.maxPrice) {
      urlPath += `-over-${(filters.minPrice / 1000).toFixed(0)}k`;
    } else if (filters.minPrice && filters.maxPrice) {
      urlPath += `-between-${(filters.minPrice / 1000).toFixed(0)}k-${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`;
    }

    // 3. Add transaction type
    urlPath += `-for-${
      filters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // 4. Add beds and baths as additional path segments
    const specParts = [];
    if (filters.minBeds) {
      specParts.push(`${filters.minBeds}-plus-bed`);
    }
    if (filters.minBaths) {
      specParts.push(`${filters.minBaths}-plus-bath`);
    }

    // Combine all parts
    let finalUrl = `${base}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  const getBaseUrl = () => {
    return `${baseUrl}${cityPath}/homes-for-${
      currentFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;
  };

  // Update the "All" selection handlers
  const handleAllProperties = () => {
    // When selecting "All Properties", ensure we use "homes" as base
    const { propertyType, ...restFilters } = currentFilters;

    // Build URL parts in a specific order
    let urlPath = "homes";

    // Add price range if present
    if (restFilters.maxPrice && !restFilters.minPrice) {
      urlPath += `-under-${(restFilters.maxPrice / 1000).toFixed(0)}k`;
    } else if (restFilters.minPrice && !restFilters.maxPrice) {
      urlPath += `-over-${(restFilters.minPrice / 1000).toFixed(0)}k`;
    } else if (restFilters.minPrice && restFilters.maxPrice) {
      urlPath += `-between-${(restFilters.minPrice / 1000).toFixed(0)}k-${(
        restFilters.maxPrice / 1000
      ).toFixed(0)}k`;
    }

    // Add transaction type
    urlPath += `-for-${
      restFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // Build base URL with main filters
    let finalUrl = `${baseUrl}${cityPath}/${urlPath}`;

    // Add beds and baths as additional segments if present
    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  const handleAnyBeds = () => {
    const { minBeds, ...restFilters } = currentFilters;
    return getFilterUrl(restFilters);
  };

  const handleAnyBaths = () => {
    const { minBaths, ...restFilters } = currentFilters;
    return getFilterUrl(restFilters);
  };

  const handleAnyPrice = () => {
    // Remove both minPrice and maxPrice while keeping all other filters
    const { minPrice, maxPrice, ...restFilters } = currentFilters;

    // Build URL parts in a specific order
    let urlPath = "";

    // 1. Start with base path (homes or property type)
    if (restFilters.propertyType) {
      const propertyPath = propertyTypes.find(
        (p) => p.label === restFilters.propertyType
      )?.path;
      urlPath = propertyPath || "homes";
    } else {
      urlPath = "homes";
    }

    // 2. Add transaction type
    urlPath += `-for-${
      restFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // 3. Add beds and baths as additional path segments
    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    // Combine all parts
    let finalUrl = `${baseUrl}${cityPath}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  return (
    <div className="space-y-4 pt-2 pb-1">
      <div className="flex items-center gap-4">
        {/* City Search */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[200px] justify-between"
                size="sm"
              >
                <span className="truncate">
                  {currentFilters.city || "Search Cities"}
                </span>
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 w-[300px] z-20" align="start">
              <Command>
                <CommandInput
                  placeholder="Search cities..."
                  className="h-9 flex-1"
                />
                <CommandList className="max-h-[300px] overflow-y-auto">
                  <CommandEmpty>No cities found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className="px-2">
                      <Link
                        href={`${baseUrl}/homes-for-sale`}
                        className="flex w-full px-2 py-1.5"
                      >
                        All Ontario
                      </Link>
                    </CommandItem>
                    {allCities.map((city) => (
                      <CommandItem key={city.city} className="px-2">
                        <Link
                          href={`${baseUrl}/${city.city
                            .toLowerCase()
                            .replace(/ /g, "-")}/homes-for-${
                            currentFilters.transactionType === "For Lease"
                              ? "lease"
                              : "sale"
                          }`}
                          className="flex w-full px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm"
                        >
                          <span>
                            {city.city}, {city.province}
                          </span>
                        </Link>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Transaction Type Toggle */}
        <div className="flex gap-2">
          <Link
            href={getFilterUrl({
              ...currentFilters,
              transactionType: "For Sale",
            })}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full px-4 text-sm font-normal ${
                currentFilters.transactionType !== "For Lease"
                  ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
                  : "bg-[#f8f9fa] hover:bg-[#f8f9fa] hover:text-gray-900"
              }`}
            >
              For Sale
            </Button>
          </Link>
          <Link
            href={getFilterUrl({
              ...currentFilters,
              transactionType: "For Lease",
            })}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full px-4 text-sm font-normal ${
                currentFilters.transactionType === "For Lease"
                  ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
                  : "bg-[#f8f9fa] hover:bg-[#f8f9fa] hover:text-gray-900"
              }`}
            >
              For Lease
            </Button>
          </Link>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex gap-2">
          {/* Property Types Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                Property Type
                {currentFilters.propertyType &&
                  `: ${currentFilters.propertyType}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="p-0">
                <Link href={handleAllProperties()} className="px-3 py-2 w-full">
                  All Properties
                </Link>
              </DropdownMenuItem>
              {propertyTypes.map((type) => (
                <DropdownMenuItem key={type.path} className="p-0">
                  <Link
                    href={getFilterUrl({ propertyType: type.label })}
                    className="px-3 py-2 w-full"
                  >
                    {type.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Beds Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                Beds
                {currentFilters.minBeds && `: ${currentFilters.minBeds}+`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-0">
                <Link href={handleAnyBeds()} className="px-3 py-2 w-full">
                  Any Beds
                </Link>
              </DropdownMenuItem>
              {bedOptions.map((option) => (
                <DropdownMenuItem key={option.value} className="p-0">
                  <Link
                    href={getFilterUrl({ minBeds: option.value })}
                    className="px-3 py-2 w-full"
                  >
                    {option.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Baths Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                Baths
                {currentFilters.minBaths && `: ${currentFilters.minBaths}+`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-0">
                <Link href={handleAnyBaths()} className="px-3 py-2 w-full">
                  Any Baths
                </Link>
              </DropdownMenuItem>
              {bathOptions.map((option) => (
                <DropdownMenuItem key={option.value} className="p-0">
                  <Link
                    href={getFilterUrl({ minBaths: option.value })}
                    className="px-3 py-2 w-full"
                  >
                    {option.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Ranges Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                Price Range
                {(currentFilters.minPrice || currentFilters.maxPrice) &&
                  `: ${
                    currentFilters.minPrice && currentFilters.maxPrice
                      ? `$${(currentFilters.minPrice / 1000).toFixed(0)}k-$${(
                          currentFilters.maxPrice / 1000
                        ).toFixed(0)}k`
                      : currentFilters.maxPrice
                      ? `Under $${(currentFilters.maxPrice / 1000).toFixed(0)}k`
                      : `Over $${(currentFilters.minPrice / 1000).toFixed(0)}k`
                  }`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-0">
                <Link href={handleAnyPrice()} className="px-3 py-2 w-full">
                  Any Price
                </Link>
              </DropdownMenuItem>
              {priceRanges.map((range) => (
                <DropdownMenuItem key={range.path} className="p-0">
                  <Link
                    href={getFilterUrl({
                      minPrice: range.minPrice,
                      maxPrice: range.maxPrice,
                    })}
                    className="px-3 py-2 w-full"
                  >
                    {range.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
