export function createListingSchema(property) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `https://condomonk.ca/resale/listing/${property.ListingKey}`,
    name: `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}`,
    description: property.PublicRemarks,
    datePosted: property.OriginalEntryTimestamp,
    price: {
      "@type": "PriceSpecification",
      price: property.ListPrice,
      priceCurrency: "CAD",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}`,
      addressLocality: property.City,
      addressRegion: property.StateOrProvince,
      postalCode: property.PostalCode,
      addressCountry: "CA",
    },
    numberOfRooms: property.BedroomsTotal,
    numberOfBathroomsTotal:
      (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0),
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.LivingArea || 0,
      unitCode: "FTK",
    },
    image: property.images?.[0] ? property.images : [],
    url: `https://condomonk.ca/resale/listing/${property.ListingKey}`,
    broker: {
      "@type": "RealEstateAgent",
      name: property.ListOfficeName,
    },
  };
}

export function createSearchResultsSchema({
  properties,
  title,
  subtitle,
  actualTotal,
  filters,
  slug,
}) {
  const searchResultSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: title,
    description: subtitle,
    url: `https://condomonk.ca/resale/ontario/${slug.join("/")}`,
    about: {
      "@type": "RealEstateAgent",
      name: "Condomonk",
      url: "https://condomonk.ca",
    },
    significantLinks: properties.map((property) => ({
      "@type": "RealEstateListing",
      "@id": `https://condomonk.ca/resale/listing/${property.ListingKey}`,
      name: `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}`,
      price: {
        "@type": "PriceSpecification",
        price: property.ListPrice,
        priceCurrency: "CAD",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}`,
        addressLocality: property.City,
        addressRegion: property.StateOrProvince,
        addressCountry: "CA",
      },
    })),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: actualTotal,
      itemListElement: properties.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "RealEstateListing",
          name: `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}`,
          url: `https://condomonk.ca/resale/listing/${property.ListingKey}`,
          price: property.ListPrice,
          numberOfRooms: property.BedroomsTotal,
          numberOfBathroomsTotal:
            (property.WashroomsType1Pcs || 0) +
            (property.WashroomsType2Pcs || 0),
          image: property.images?.[0],
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://condomonk.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ontario",
        item: "https://condomonk.ca/resale/ontario",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: filters.city || "All Cities",
        item: `https://condomonk.ca/resale/ontario/${slug.join("/")}`,
      },
    ],
  };

  return [searchResultSchema, breadcrumbSchema];
}
