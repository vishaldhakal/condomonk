import { getProperties } from "@/lib/properties";
import FilterBar from "@/components/FilterBar";
import PropertyList from "@/components/PropertyList";
import { notFound } from "next/navigation";

// Helper to determine the type of page and parse filters
function parseSlug(slug) {
  const filters = {};
  const parts = Array.isArray(slug) ? slug : [slug];
  const path = parts.join("/");

  // Set default transaction type
  filters.transactionType = "For Sale";

  // Check if first part contains for-sale or for-lease
  const firstPart = parts[0] || "";
  const isTransactionPath =
    firstPart.includes("for-sale") || firstPart.includes("for-lease");

  // If first part doesn't contain transaction type, it's a city
  if (!isTransactionPath && parts[0]) {
    const cityName = parts[0]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    filters.city = cityName;
  }

  // Parse property types and price ranges together
  const propertyTypes = {
    "detached-homes": { label: "Detached", subtypes: ["Detached"] },
    "semi-detached-homes": {
      label: "Semi-Detached",
      subtypes: ["Semi-Detached"],
    },
    townhouses: { label: "Townhouse", subtypes: ["Att/Row/Townhouse"] },
    "condo-townhouses": {
      label: "Condo Townhouse",
      subtypes: ["Condo Townhouse"],
    },
    condos: { label: "Condo Apartment", subtypes: ["Condo Apartment"] },
  };

  // Find the part that contains property type and/or price range
  const relevantPart =
    parts.find(
      (part) =>
        part.includes("homes") ||
        Object.keys(propertyTypes).some((type) => part.includes(type))
    ) || "";

  // Check for property type
  for (const [urlPath, propertyType] of Object.entries(propertyTypes)) {
    if (relevantPart.includes(urlPath)) {
      filters.propertyType = propertyType.label;
      filters.propertySubTypes = propertyType.subtypes;
      break;
    }
  }

  // Parse price ranges from the relevant part
  if (relevantPart.includes("-under-")) {
    const match = relevantPart.match(/under-(\d+)k/);
    if (match) {
      filters.maxPrice = parseInt(match[1]) * 1000;
    }
  } else if (relevantPart.includes("-over-")) {
    const match = relevantPart.match(/over-(\d+)k/);
    if (match) {
      filters.minPrice = parseInt(match[1]) * 1000;
    }
  } else if (relevantPart.includes("-between-")) {
    const match = relevantPart.match(/between-(\d+)k-(\d+)k/);
    if (match) {
      filters.minPrice = parseInt(match[1]) * 1000;
      filters.maxPrice = parseInt(match[2]) * 1000;
    }
  }

  // Parse transaction type
  if (path.includes("-for-lease")) {
    filters.transactionType = "For Lease";
  }

  // Parse beds and baths
  parts.forEach((part) => {
    const bedMatch = part.match(/(\d+)-plus-bed/);
    if (bedMatch) {
      filters.minBeds = parseInt(bedMatch[1]);
    }

    const bathMatch = part.match(/(\d+)-plus-bath/);
    if (bathMatch) {
      filters.minBaths = parseInt(bathMatch[1]);
    }
  });

  return filters;
}

function generateTitle(filters) {
  const parts = [];

  // Add property type
  if (filters.propertyType) {
    parts.push(filters.propertyType);
  } else {
    parts.push("Homes");
  }

  // Add beds/baths first
  const specs = [];
  if (filters.minBeds) {
    specs.push(`${filters.minBeds}+ Bedroom`);
  }
  if (filters.minBaths) {
    specs.push(`${filters.minBaths}+ Bathroom`);
  }
  if (specs.length > 0) {
    // If we had a property type, replace "Homes" with specs
    if (filters.propertyType) {
      parts[0] = `${parts[0]} with ${specs.join(", ")}`;
    } else {
      parts[0] = `${specs.join(", ")} Homes`;
    }
  }

  // Add price range
  if (filters.maxPrice && !filters.minPrice) {
    parts.splice(1, 0, `under $${(filters.maxPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.splice(1, 0, `over $${(filters.minPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.splice(
      1,
      0,
      `between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`
    );
  }

  // Add transaction type
  parts.push(
    filters.transactionType === "For Lease" ? "for Lease" : "for Sale"
  );

  // Add location
  if (filters.city) {
    parts.push(`in ${filters.city}`);
  } else {
    parts.push("in Ontario");
  }

  return parts.join(" ");
}

function generateSubtitle(filters) {
  const parts = [];

  // Base description
  parts.push("Browse the latest listings");

  // Add property type with beds/baths specifics
  if (filters.propertyType || filters.minBeds || filters.minBaths) {
    const specs = [];
    if (filters.propertyType) {
      specs.push(filters.propertyType.toLowerCase());
    }
    if (filters.minBeds) {
      specs.push(`${filters.minBeds}+ bedrooms`);
    }
    if (filters.minBaths) {
      specs.push(`${filters.minBaths}+ bathrooms`);
    }
    if (specs.length > 0) {
      parts.push(`for ${specs.join(" with ")}`);
    }
  }

  // Add location
  if (filters.city) {
    parts.push(`in ${filters.city}`);
  } else {
    parts.push("across Ontario");
  }

  // Add price context
  if (filters.maxPrice && !filters.minPrice) {
    parts.push(`priced under $${filters.maxPrice.toLocaleString()}`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.push(`priced above $${filters.minPrice.toLocaleString()}`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.push(
      `with prices from $${filters.minPrice.toLocaleString()} to $${filters.maxPrice.toLocaleString()}`
    );
  }

  return parts.join(" ");
}

export default async function DynamicPage({ params, searchParams }) {
  console.log("Received params:", params);

  const filters = parseSlug(params.slug1);
  console.log("Parsed filters:", filters);

  if (!filters) {
    notFound();
  }

  const { properties, total, currentPage, totalPages } = await getProperties({
    ...filters,
    ...searchParams,
  });

  const title = generateTitle(filters);
  const subtitle = generateSubtitle(filters);

  return (
    <div className="max-w-[1370px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center pt-1">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight">
            {total.toLocaleString()} {title}
          </h1>
          <h2 className="text-gray-600 text-sm leading-tight">{subtitle}</h2>
        </div>
      </div>
      <div className="sticky top-0 z-10 bg-white py-2 flex justify-between items-center mb-3">
        <FilterBar currentFilters={filters} />
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button className="px-3 py-1 rounded-md bg-white shadow-sm">
            List
          </button>
          <button className="px-3 py-1 rounded-md">Map</button>
        </div>
      </div>
      <PropertyList
        properties={properties}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
