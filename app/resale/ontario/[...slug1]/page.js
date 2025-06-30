import { getProperties } from "@/lib/properties";
import FilterBar from "@/components/FilterBar";
import PropertyList from "@/components/PropertyList";
import { notFound } from "next/navigation";
import { formatPrice } from "@/utils/formatting";
import BottomContactForm from "@/components/BottomContactForm";
import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import Script from "next/script";
import { createSearchResultsSchema } from "@/helper/createSchema";
import RealEstateLinks from "@/components/RealEstateLinks";

// Helper to determine the type of page and parse filters
function parseSlug(slug) {
  const filters = {};
  const parts = Array.isArray(slug) ? slug : [slug];
  const path = parts.join("/");

  // Set default transaction type
  filters.transactionType = "For Sale";

  // Define property types mapping
  const propertyTypes = {
    "detached-homes": { label: "Detached Home", subtypes: ["Detached"] },
    "semi-detached-homes": {
      label: "Semi-Detached Homes",
      subtypes: ["Semi-Detached"],
    },
    townhomes: { label: "Townhomes", subtypes: ["Att/Row/Townhouse"] },
    "condo-townhomes": {
      label: "Condo Townhome",
      subtypes: ["Condo Townhouse"],
    },
    condos: { label: "Condo Apartment", subtypes: ["Condo Apartment"] },
  };

  // Check for price reduced listings
  if (path.includes("price-reduced-homes")) {
    filters.mlsStatus = "Price Change";

    // Look for property type before "price-reduced-homes"
    for (const [urlPath, propertyType] of Object.entries(propertyTypes)) {
      if (
        path.includes(`${urlPath}-price-reduced`) ||
        path.includes(`${urlPath.replace("-homes", "")}-price-reduced`)
      ) {
        filters.propertyType = propertyType.label;
        filters.propertySubTypes = propertyType.subtypes;
        break;
      }
    }
  } else {
    // Regular property type parsing for non-price-reduced listings
    for (const [urlPath, propertyType] of Object.entries(propertyTypes)) {
      if (path.includes(urlPath)) {
        filters.propertyType = propertyType.label;
        filters.propertySubTypes = propertyType.subtypes;
        break;
      }
    }
  }

  // Check if first part is a city
  const firstPart = parts[0] || "";
  const isTransactionPath =
    firstPart.includes("for-sale") || firstPart.includes("for-lease");

  if (!isTransactionPath && parts[0] && !parts[0].includes("price-reduced")) {
    const cityName = parts[0]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    filters.city = cityName;
  }

  // Parse price ranges
  const relevantPart =
    parts.find(
      (part) =>
        part.includes("-under-") ||
        part.includes("-over-") ||
        part.includes("-between-")
    ) || "";

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
  if (filters.mlsStatus === "Price Change") {
    const propertyTypeText = filters.propertyType
      ? `${filters.propertyType} `
      : "";
    const locationText = filters.city ? `in ${filters.city}` : "in Ontario";
    return `${propertyTypeText}Homes with Recent Price Drops ${locationText}`;
  }

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
  const transactionText =
    filters.transactionType === "For Lease" ? "for lease" : "for sale";
  const transactionTextCapitalized =
    filters.transactionType === "For Lease" ? "for Lease" : "for Sale";

  if (filters.mlsStatus === "Price Change") {
    const propertyTypeText = filters.propertyType
      ? `${filters.propertyType} `
      : "";
    const locationText = filters.city || "Ontario";
    const propertySpecificText = filters.propertyType
      ? ` | Find Price Reduced ${filters.propertyType}s`
      : " | Find Recently Reduced Properties";
    return `${total.toLocaleString()} ${propertyTypeText}Homes with Price Reductions in ${locationText}${propertySpecificText} & Great Deals`;
  }

  const location = filters.city || "Ontario";

  // Handle bedroom-specific condo listings
  if (filters.propertyType === "Condo Apartment" && filters.minBeds) {
    return `${total.toLocaleString()} ${
      filters.minBeds
    }-Bedroom Condos ${transactionText} in ${location} | Affordable ${
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
    // Don't add 's' if the property type already ends in 's'
    const pluralType = filters.propertyType.endsWith("s")
      ? filters.propertyType
      : `${filters.propertyType}s`;

    return `${total.toLocaleString()} ${location} ${pluralType} ${transactionText} | Affordable ${
      filters.minBeds
        ? `${filters.minBeds}-${filters.minBeds + 3} Bedroom `
        : ""
    }${pluralType} in ${location} ${
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
    return `${total.toLocaleString()} ${location} homes ${transactionText} | Affordable homes in ${location} ${
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
  return `${total.toLocaleString()}+ homes ${transactionText} in ${location} | Affordable 1 - 4 bedroom homes in ${location} from $1 to $5M | Open Houses & New Listings Available`;
}

// Update the getSimilarProperties function
async function getSimilarProperties(filters) {
  // For price reduced pages, get latest price reduced properties from Brampton and Mississauga
  if (filters.mlsStatus === "Price Change") {
    const featuredCities = ["Brampton", "Mississauga"];
    const priceReducedProperties = await Promise.all(
      featuredCities.map(async (city) => {
        const { properties } = await getProperties({
          city,
          mlsStatus: "Price Change",
          limit: 4,
          sortBy: "ListDate",
          sortOrder: "DESC",
        });
        return {
          city,
          properties: properties
            .filter(
              (p) => p.PreviousListPrice && p.ListPrice < p.PreviousListPrice
            )
            .slice(0, 4),
        };
      })
    );
    return { priceReducedProperties, type: "priceReduced" };
  }

  // Original logic for non-price-reduced pages
  const popularCities = [
    "Ajax",
    "Brampton",
    "Mississauga",
    "Barrie",
    "Toronto",
    "Ottawa",
    "Milton",
    "Pickering",
    "Hamilton",
  ];

  const citiesToShow = filters.city
    ? popularCities.filter(
        (city) => city.toLowerCase() !== filters.city.toLowerCase()
      )
    : popularCities;

  const properties = await Promise.all(
    citiesToShow.slice(0, 8).map(async (city) => {
      const { properties } = await getProperties({
        city,
        propertyType: filters.propertyType,
        propertySubTypes: filters.propertySubTypes,
        transactionType: filters.transactionType,
        limit: 1,
      });
      return properties[0];
    })
  );

  return { properties: properties.filter(Boolean), type: "regular" };
}

export default async function DynamicPage({ params }) {
  try {
    const filters = parseSlug(params.slug1);

    const searchParams = {
      ...filters,
      page: filters.page || 1,
    };

    if (!filters) {
      notFound();
    }

    const {
      properties: allProperties,
      total,
      currentPage,
      totalPages,
    } = await getProperties({
      ...searchParams,
    });

    // If this is a price drop page, filter out properties without a price drop
    const properties =
      filters.mlsStatus === "Price Change"
        ? allProperties.filter(
            (property) =>
              property.PreviousListPrice &&
              property.ListPrice < property.PreviousListPrice
          )
        : allProperties;

    const actualTotal =
      filters.mlsStatus === "Price Change" ? properties.length : total;

    const title =
      filters.mlsStatus === "Price Change"
        ? `${actualTotal} ${
            filters.city || "Ontario"
          } Homes for Sale | Price Dropped`
        : generateTitle(filters);

    const subtitle =
      filters.mlsStatus === "Price Change"
        ? `${actualTotal}+ Recently Price Reduced Homes in ${
            filters.city || "Ontario"
          } | Find Price Drop on Detached, Semi-detached, Townhomes & Condos in ${
            filters.city || "Ontario"
          }`
        : generateSubtitle(filters, actualTotal);

    // Fetch similar properties
    const similarProperties = await getSimilarProperties(filters);

    // Create schema with error handling
    let schemaScript = null;
    try {
      const schemas = createSearchResultsSchema({
        properties,
        title,
        subtitle,
        actualTotal,
        filters,
        slug: params.slug1,
      });

      schemaScript = (
        <Script
          id="search-results-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas, null, 2),
          }}
          strategy="afterInteractive"
        />
      );
    } catch (schemaError) {
      console.error("Error creating search results schema:", schemaError);
    }

    return (
      <>
        {schemaScript}
        <div className="max-w-[1370px] mx-auto px-2 md:px-4 py-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-3xl font-extrabold leading-tight">
                {title}
              </h1>
              <h2 className="text-gray-600 text-sm leading-tight">
                {subtitle}
              </h2>
            </div>
          </div>
          <div className="sticky top-0 bg-white py-1 flex justify-between items-center mb-2 z-2 overflow-x-auto hide-scrollbar ps-0">
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
            total={actualTotal}
            currentPage={currentPage}
            totalPages={Math.ceil(actualTotal / 30)}
          />

          {/* Similar Homes Section */}
          {similarProperties && (
            <div className="mt-16 border-t pt-12">
              {filters.mlsStatus === "Price Change" ? (
                <>
                  <h4 className="md:text-4xl text-2xl font-bold mb-8">
                    Price Reduced Homes by City
                  </h4>

                  {/* Featured cities with price reduced properties */}
                  {similarProperties.priceReducedProperties.map(
                    ({ city, properties }) => (
                      <div key={city} className="mb-8">
                        <h5 className="md:text-2xl text-xl font-semibold mb-2">
                          Price Reduced Homes in {city}
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          {properties.map((property, index) => (
                            <PropertyCard
                              key={property.ListingKey || index}
                              property={property}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* List of other cities */}
                  <div className="mt-10">
                    <h5 className="text-2xl font-semibold mb-4">
                      Find Price Reduced Homes in Other Cities
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                      {[
                        "Toronto",
                        "Ottawa",
                        "Hamilton",
                        "London",
                        "Kitchener",
                        "Windsor",
                        "Burlington",
                        "Oakville",
                        "Milton",
                        "Vaughan",
                        "Richmond Hill",
                        "Markham",
                      ].map((city) => (
                        <a
                          key={city}
                          href={`/resale/ontario/${city.toLowerCase()}/price-reduced-homes`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Price Reduced Homes in {city}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-6">
                    Check out {filters.propertyType || "Homes"} for sale near{" "}
                    {filters.city || "Ontario"} | 1000+{" "}
                    {filters.propertyType || "Homes"} listed on MLS
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {similarProperties.properties.map((property, index) => (
                      <PropertyCard
                        key={property.ListingKey || index}
                        property={property}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Real Estate Links Section - NEW */}
          <RealEstateLinks city={filters.city || "Ontario"} />

          {/* Contact Section */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <Image
              src="/contact-bottom-2.png"
              alt="Contact bottom"
              width={300}
              height={250}
              className="mx-auto mb-6"
            />
            <h3 className="text-3xl font-bold mb-6">
              Looking to buy a home in {filters.city || "Ontario"}?
            </h3>
            <BottomContactForm
              proj_name={filters.city || "Ontario"}
              city={filters.city || "Ontario"}
            />
            <p className="text-sm text-gray-500 mt-4">
              I agree to receive marketing and customer service communications
              from Homebaba Technologies. Consent is not a condition of
              purchase. Msg/data rates may apply. Msg frequency varies. Reply
              STOP to unsubscribe.
            </p>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in DynamicPage:", error);
    notFound();
  }
}

export async function generateMetadata({ params, searchParams }, parent) {
  const filters = parseSlug(params.slug1);
  const { properties, total } = await getProperties({
    ...filters,
    ...searchParams,
  });

  // Filter properties to get actual count of price reduced properties
  const priceReducedProperties =
    filters.mlsStatus === "Price Change"
      ? properties.filter(
          (p) => p.PreviousListPrice && p.ListPrice < p.PreviousListPrice
        )
      : properties;

  const actualTotal =
    filters.mlsStatus === "Price Change"
      ? priceReducedProperties.length
      : total;

  const location = filters.city || "Ontario";

  // Generate title and description for price reduced listings
  const title =
    filters.mlsStatus === "Price Change"
      ? `${actualTotal} ${location} Homes for Sale | Price Dropped`
      : `${total.toLocaleString()} ${generateTitle(filters)}`;

  const description =
    filters.mlsStatus === "Price Change"
      ? `${actualTotal}+ price-dropped homes in ${location}. Find price reduced homes - detached, semi-detached, townhomes & condos on Condomonk. Don't miss out.`
      : generateSubtitle(filters, total);

  // Define all possible property type paths mapping
  const propertyTypePaths = {
    "homes-for-sale": "homes-for-sale",
    "homes-for-lease": "homes-for-lease",
    "detached-homes-for-sale": "detached-homes-for-sale",
    "detached-homes-for-lease": "detached-homes-for-lease",
    "semi-detached-homes-for-sale": "semi-detached-homes-for-sale",
    "semi-detached-homes-for-lease": "semi-detached-homes-for-lease",
    "condo-townhomes-for-sale": "condo-townhomes-for-sale",
    "condo-townhomes-for-lease": "condo-townhomes-for-lease",
    "townhomes-for-sale": "townhomes-for-sale",
    "townhomes-for-lease": "townhomes-for-lease",
    "condos-for-sale": "condos-for-sale",
    "condos-for-lease": "condos-for-lease",
    "price-reduced-homes-for-sale": "price-reduced-homes-for-sale",
    "price-reduced-homes-for-lease": "price-reduced-homes-for-lease",
  };

  // Build the canonical path based on the URL structure
  let canonicalPath;
  if (filters.city) {
    // For city-specific pages
    const citySlug = filters.city.toLowerCase().replace(/\s+/g, "-");
    if (filters.mlsStatus === "Price Change") {
      canonicalPath = `/resale/ontario/${citySlug}/price-reduced-homes-for-sale`;
    } else {
      const propertyType =
        filters.propertyType?.toLowerCase().replace(/\s+/g, "-") || "homes";
      const transactionType =
        filters.transactionType === "For Lease" ? "for-lease" : "for-sale";
      canonicalPath = `/resale/ontario/${citySlug}/${propertyType}-${transactionType}`;
    }
  } else {
    // For province-wide pages
    if (filters.mlsStatus === "Price Change") {
      canonicalPath = `/resale/ontario/price-reduced-homes-for-sale`;
    } else {
      const propertyType =
        filters.propertyType?.toLowerCase().replace(/\s+/g, "-") || "homes";
      const transactionType =
        filters.transactionType === "For Lease" ? "for-lease" : "for-sale";
      canonicalPath = `/resale/ontario/${propertyType}-${transactionType}`;
    }
  }

  return {
    metadataBase: new URL("https://condomonk.ca"),
    title: `${title} | Real Estate Listings | MLS Homes`,
    description: description,
    alternates: {
      canonical: `https://condomonk.ca${canonicalPath}`,
    },
    openGraph: {
      title: `${title} | Real Estate Listings | MLS Homes`,
      description: description,
      url: `https://condomonk.ca${canonicalPath}`,
      siteName: "Condomonk",
      type: "website",
      images: [
        {
          url: "https://condomonk.ca/cities/brampton.jpg",
          width: 1200,
          height: 630,
          alt: `Real Estate Listings in ${location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Real Estate Listings | MLS Homes`,
      description: description,
      images: ["https://condomonk.ca/cities/brampton.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "og:locale": "en_CA",
      "og:type": "website",
    },
  };
}
