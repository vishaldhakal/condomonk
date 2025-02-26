import { getProperties } from "@/lib/properties";
import FilterBar from "@/components/FilterBar";
import PropertyList from "@/components/PropertyList";
import { notFound } from "next/navigation";
import { formatPrice } from "@/utils/formatting";
/* import { getCityAnalytics } from "@/lib/analytics"; */
import BottomContactForm from "@/components/BottomContactForm";
import Image from "next/image";
/* import CityAnalyticsCharts from "@/components/CityAnalyticsCharts"; */

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

function generateSubtitle(filters, total) {
  const location = filters.city || "Ontario";

  // Handle bedroom-specific condo listings
  if (filters.propertyType === "Condo Apartment" && filters.minBeds) {
    return `${total.toLocaleString()} ${
      filters.minBeds
    }-Bedroom Condos for Sale in ${location} | Affordable ${
      filters.minBeds
    }-Bedroom Condos ${
      filters.maxPrice
        ? `under $${formatPrice(filters.maxPrice)}`
        : filters.minPrice
        ? `from $${formatPrice(filters.minPrice)}`
        : "from $300K to $1M"
    } | Open Houses Available`;
  }

  // Handle property type specific pages
  if (filters.propertyType) {
    return `${total.toLocaleString()} ${location} ${
      filters.propertyType
    }s for Sale | Affordable ${
      filters.minBeds
        ? `${filters.minBeds}-${filters.minBeds + 3} Bedroom `
        : ""
    }${filters.propertyType}s in ${location} ${
      filters.maxPrice
        ? `under $${formatPrice(filters.maxPrice)}`
        : filters.minPrice && filters.maxPrice
        ? `from $${formatPrice(filters.minPrice)} to $${formatPrice(
            filters.maxPrice
          )}`
        : "from $1 to $5M"
    } | Open Houses Available`;
  }

  // Handle price range specific pages
  if (filters.maxPrice || filters.minPrice) {
    return `${total.toLocaleString()} ${location} homes for sale | Affordable homes in ${location} ${
      filters.maxPrice
        ? `under $${formatPrice(filters.maxPrice)}`
        : filters.minPrice
        ? `over $${formatPrice(filters.minPrice)}`
        : filters.minPrice && filters.maxPrice
        ? `between $${formatPrice(filters.minPrice)} - $${formatPrice(
            filters.maxPrice
          )}`
        : ""
    } | Open Houses & New Listings Available`;
  }

  // Default subtitle for general listings
  return `${total.toLocaleString()} ${location} homes for sale | Affordable 1 - 4 bedroom homes in ${location} from $1 to $5M | Open Houses & New Listings Available`;
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
  const subtitle = generateSubtitle(filters, total);

  // Prepare analytics parameters with defaults
  const analyticsParams = {
    listing: {
      ListPrice: filters.maxPrice || filters.minPrice || 0,
      PropertyType: filters.propertyType || "Residential",
      PropertySubType: filters.propertySubTypes?.[0] || "All",
      BedroomsTotal: filters.minBeds || 0,
      BathroomsTotalInteger: filters.minBaths || 0,
      City: filters.city || "Ontario",
      TransactionType: filters.transactionType || "For Sale",
      Status: "Active",
    },
    filters: {
      city: filters.city || "Ontario",
      propertyType: filters.propertyType || "All",
      propertySubTypes: filters.propertySubTypes || ["All"],
      transactionType: filters.transactionType || "For Sale",
      minBeds: filters.minBeds || null,
      maxBeds: filters.maxBeds || null,
      minBaths: filters.minBaths || null,
      maxBaths: filters.maxBaths || null,
      minPrice: filters.minPrice || null,
      maxPrice: filters.maxPrice || null,
      status: "Active",
      province: "Ontario",
      country: "Canada",
    },
    timeframe: {
      start: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      end: new Date(),
    },
    comparison: {
      type: "historical",
      periods: [
        { months: 0, label: "Current" },
        { months: 3, label: "3 Months Ago" },
        { months: 6, label: "6 Months Ago" },
      ],
    },
    options: {
      includeHistory: true,
      includeTrends: true,
      includeNearby: true,
      includeSchools: false,
      includeDemographics: false,
    },
  };

  // Fetch appropriate analytics based on whether it's a city page
  /* const analyticsData = await getCityAnalytics({
    city: filters.city,
    transactionType: filters.transactionType,
  }); */

  // Add city-specific analytics section
  const CityAnalytics = ({ data }) => {
    if (!data) return null;

    return (
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${formatPrice(data.overview.avgPrice)}
            </div>
            <div className="text-sm text-gray-600">Average Price</div>
          </div>
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.overview.totalListings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </div>
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${formatPrice(data.overview.medianPrice)}
            </div>
            <div className="text-sm text-gray-600">Median Price</div>
          </div>
          <div className="bg-white p-6 rounded-xl border">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.overview.avgDaysOnMarket || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Average Days on Market</div>
          </div>
        </div>

        {/* Price by Bedrooms Section */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-xl font-semibold mb-6">
            Prices by Bedroom Count
          </h3>
          <CityAnalyticsCharts data={data} />

          {/* Detailed Stats Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bedrooms
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(data.byBedrooms).map(([beds, stats]) => (
                  <tr key={beds}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {beds} Bed{beds === "1" ? "" : "s"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      ${formatPrice(stats.avgPrice)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {stats.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price by Property Type Section */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="text-xl font-semibold mb-6">
            Prices by Property Type
          </h3>

          {/* Detailed Stats Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(data.byPropertyType)
                  .filter(([_, stats]) => stats.count > 0)
                  .map(([type, stats]) => (
                    <tr key={type}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${formatPrice(stats.avgPrice)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {stats.count}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1370px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center pt-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
            {total.toLocaleString()} {title}
          </h1>
          <h2 className="text-gray-600 text-sm leading-tight">{subtitle}</h2>
        </div>
      </div>
      <div className="sticky top-0 bg-white py-2 flex justify-between items-center  mb-3 z-0 overflow-x-auto hide-scrollbar ps-0">
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

      {/* Market Insights Section */}
      {/* <div className="mt-12 border-t pt-12">
        <h2 className="text-3xl font-bold mb-6">Market Insights</h2>
        <CityAnalytics data={analyticsData} />
      </div> */}

      {/* Contact Section */}
      <div className="mt-16 max-w-2xl mx-auto text-center">
        <Image
          src="/contact-bottom-2.png"
          alt="Contact bottom"
          width={300}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold mb-6">
          Looking to buy a home in {filters.city || "Ontario"}?
        </h2>
        <BottomContactForm
          proj_name={filters.city || "Ontario"}
          city={filters.city || "Ontario"}
        />
        <p className="text-sm text-gray-500 mt-4">
          I agree to receive marketing and customer service communications from
          Homebaba Technologies. Consent is not a condition of purchase.
          Msg/data rates may apply. Msg frequency varies. Reply STOP to
          unsubscribe.
        </p>
      </div>
    </div>
  );
}

// Helper function to generate market title
function generateMarketTitle(filters) {
  const parts = [];

  if (filters.propertyType) {
    parts.push(filters.propertyType);
  }

  if (filters.minBeds) {
    parts.push(`${filters.minBeds}+ Bedroom`);
  }

  parts.push("Homes");

  if (filters.city) {
    parts.push(`in ${filters.city}`);
  } else {
    parts.push("in Ontario");
  }

  if (filters.maxPrice && !filters.minPrice) {
    parts.push(`Under $${(filters.maxPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.push(`Over $${(filters.minPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.push(
      `Between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`
    );
  }

  return parts.join(" ");
}

// Update the market description function to use the new analytics structure
function generateMarketDescription(filters, insights) {
  const location = filters.city || "Ontario";
  const paragraphs = [];

  // Market Overview with better null checks
  paragraphs.push(`
    The real estate market for ${generateMarketTitle(
      filters
    )} currently shows an average price of $${formatPrice(insights.avgPrice)}.
    With ${insights.totalListings.toLocaleString()} active listings, buyers have a good selection of properties to choose from.
    Properties in this category typically spend ${
      insights.avgDaysOnMarket
    } days on the market before selling.
  `);

  // Price Trends with better null checks
  if (insights.priceChange) {
    const threeMonthChange = insights.priceChange.threeMonth;
    paragraphs.push(`
      Over the past 3 months, prices have ${
        threeMonthChange > 0 ? "increased" : "decreased"
      } by ${Math.abs(threeMonthChange).toFixed(1)}%.
      This trend indicates a ${
        threeMonthChange > 0 ? "strengthening" : "softening"
      } market for this property type.
    `);
  }

  // Property Type Specific
  if (filters.propertyType) {
    paragraphs.push(`
      ${
        filters.propertyType
      } properties in ${location} are particularly popular among ${
      filters.propertyType === "Condo"
        ? "first-time homebuyers and investors"
        : filters.propertyType === "Detached"
        ? "families looking for more space"
        : filters.propertyType === "Townhouse"
        ? "those seeking a balance between space and affordability"
        : "buyers"
    }.
    `);
  }

  // Bedroom Specific
  if (filters.minBeds) {
    paragraphs.push(`
      ${filters.minBeds}+ bedroom homes offer ${
      filters.minBeds >= 4
        ? "generous space for larger families or those needing extra rooms for home offices"
        : filters.minBeds >= 3
        ? "comfortable space for growing families"
        : "ideal space for small families or professionals"
    }.
    `);
  }

  return paragraphs.map((p) => p.trim()).join("\n\n");
}
