import { getProperties } from "@/lib/properties";
import FilterBar from "@/components/FilterBar";
import PropertyList from "@/components/PropertyList";
import { notFound } from "next/navigation";

// Helper to determine the type of page and parse filters
function parseSlug(slug) {
  // Convert array to string if needed
  const parts = Array.isArray(slug) ? slug : [slug];
  const filters = {};

  // Check if first part is a city
  if (parts.length > 1) {
    // First part is likely a city
    const cityName = parts[0]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    filters.city = cityName;

    // Use the second part for filters
    const filterPart = parts[1];

    // Parse transaction type
    if (filterPart.endsWith("-for-sale")) {
      filters.transactionType = "For Sale";
    } else if (filterPart.endsWith("-for-lease")) {
      filters.transactionType = "For Lease";
    }

    // Parse property types
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

    // Check for property type
    for (const [urlPath, propertyType] of Object.entries(propertyTypes)) {
      if (filterPart.startsWith(urlPath)) {
        filters.propertyType = propertyType.label;
        filters.propertySubTypes = propertyType.subtypes;
        break;
      }
    }

    // Parse price ranges
    if (filterPart.includes("homes-under-")) {
      const match = filterPart.match(/homes-under-(\d+)k/);
      if (match) {
        filters.maxPrice = parseInt(match[1]) * 1000;
      }
    } else if (filterPart.includes("homes-over-")) {
      const match = filterPart.match(/homes-over-(\d+)k/);
      if (match) {
        filters.minPrice = parseInt(match[1]) * 1000;
      }
    } else if (filterPart.includes("homes-between-")) {
      const match = filterPart.match(/homes-between-(\d+)k-(\d+)k/);
      if (match) {
        filters.minPrice = parseInt(match[1]) * 1000;
        filters.maxPrice = parseInt(match[2]) * 1000;
      }
    }

    // Parse beds and baths from remaining parts
    if (parts.length > 2) {
      parts.slice(2).forEach((segment) => {
        if (segment.includes("-plus-bed")) {
          filters.minBeds = parseInt(segment.match(/(\d+)-plus-bed/)[1]);
        }
        if (segment.includes("-plus-bath")) {
          filters.minBaths = parseInt(segment.match(/(\d+)-plus-bath/)[1]);
        }
      });
    }
  } else {
    // Handle single part URLs (non-city based)
    // ... rest of the single part handling remains the same ...
  }

  // Set default transaction type if not set
  if (!filters.transactionType) {
    filters.transactionType = "For Sale";
  }

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

function parseFiltersFromSlug(slug) {
  const filters = {};

  // Parse transaction type from slug
  if (slug.includes("homes-for-lease")) {
    filters.transactionType = "For Lease";
  } else if (slug.includes("homes-for-sale")) {
    filters.transactionType = "For Sale";
  }

  // Add any other filter parsing logic here

  return filters;
}

export default async function DynamicPage({ params, searchParams }) {
  console.log("Received params:", params);

  const filters = parseFiltersFromSlug(params.slug1);
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
      <div className="sticky top-0 z-10 bg-white">
        <FilterBar currentFilters={filters} />
      </div>
      <div className="flex justify-between items-center mb-8 pt-3">
        <div>
          <h1 className="text-3xl font-extrabold">
            {total.toLocaleString()} {title}
          </h1>
          <h2 className="text-gray-600 text-sm">{subtitle}</h2>
        </div>
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
