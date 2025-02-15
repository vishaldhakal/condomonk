export async function getProperties({
  city,
  propertyType,
  propertySubTypes,
  minBeds,
  minBaths,
  minPrice,
  maxPrice,
  transactionType,
  ...searchParams
}) {
  const pageSize = 30;
  const page = Number(searchParams.page) || 1;
  const skip = (page - 1) * pageSize;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");

  // Build filter string
  const filterClauses = [];

  // Base filters
  filterClauses.push("ContractStatus eq 'Available'");

  // Transaction Type
  if (transactionType) {
    filterClauses.push(`TransactionType eq '${transactionType}'`);
  }

  // City
  if (city) {
    filterClauses.push(`contains(City, '${city}')`);
  }

  // Property Type
  if (propertySubTypes && propertySubTypes.length > 0) {
    filterClauses.push(`PropertySubType eq '${propertySubTypes[0]}'`);
  } else if (propertyType) {
    filterClauses.push(`PropertyType eq '${propertyType}'`);
  }

  // Add other filters as needed...
  if (minPrice) {
    filterClauses.push(`ListPrice ge ${minPrice}`);
  }

  if (maxPrice) {
    filterClauses.push(`ListPrice le ${maxPrice}`);
  }

  // Add bed and bath filters
  if (minBeds) {
    filterClauses.push(`BedroomsTotal ge ${minBeds}`);
  }

  if (minBaths) {
    filterClauses.push(`BathroomsTotalInteger ge ${minBaths}`);
  }

  const queryString = [
    `$top=${pageSize}`,
    `$skip=${skip}`,
    `$orderby=ModificationTimestamp desc,ListingKey desc`,
    `$filter=${filterClauses.join(" and ")}`,
    `$select=ListingKey,StreetNumber,StreetName,City,StateOrProvince,ListPrice,PropertyType,PropertySubType,TransactionType,BedroomsTotal,BathroomsTotalInteger,WashroomsType1Pcs,WashroomsType2Pcs,LotWidth,LotDepth,ListOfficeName,ModificationTimestamp,OriginalEntryTimestamp`,
    `$count=true`,
  ].join("&");

  const url = `${baseUrl}Property?${queryString}`;

  console.log(url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      next: {
        revalidate: 60, // 1 minute
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Fetch images for all properties in parallel
    const propertiesWithImages = await Promise.all(
      data.value.map(async (property) => {
        const imageUrl = await getImageUrl(property.ListingKey);
        return {
          ...property,
          imageUrl,
        };
      })
    );

    return {
      properties: propertiesWithImages,
      total: data["@odata.count"],
      currentPage: page,
      totalPages: Math.ceil(data["@odata.count"] / pageSize),
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

async function getImageUrl(listingKey) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");
    // Fetch multiple image sizes at once
    const imageLink = `${baseUrl}Media?$filter=ResourceRecordKey eq '${listingKey}' and MediaType eq 'image/jpeg' and MediaStatus eq 'Active' and ImageSizeDescription eq 'Medium' and PreferredPhotoYN eq true&$top=1`;

    const response = await fetch(imageLink, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      next: {
        revalidate: 60, // 1 minute
      },
    });

    const jsonResponse = await response.json();
    const images = jsonResponse.value;

    // Find preferred images first
    const preferredMedium = images.find(
      (img) => img.ImageSizeDescription === "Medium" && img.PreferredPhotoYN
    );
    const preferredThumb = images.find(
      (img) => img.ImageSizeDescription === "Thumbnail" && img.PreferredPhotoYN
    );

    // Fallback to any images if no preferred ones
    const anyMedium = images.find(
      (img) => img.ImageSizeDescription === "Medium"
    );
    const anyThumb = images.find(
      (img) => img.ImageSizeDescription === "Thumbnail"
    );

    return {
      medium: preferredMedium?.MediaURL || anyMedium?.MediaURL || null,
      thumbnail: preferredThumb?.MediaURL || anyThumb?.MediaURL || null,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return { medium: null, thumbnail: null };
  }
}

export async function getListingDetail(listingID) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");

  const listingKey = listingID.split("-").pop();

  try {
    // Fetch property details
    const propertyUrl = `${baseUrl}Property('${listingKey}')`;

    console.log(propertyUrl);

    const propertyResponse = await fetch(propertyUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      next: {
        revalidate: 60, // 1 minute
      },
    });

    if (!propertyResponse.ok) {
      throw new Error(`HTTP error! status: ${propertyResponse.status}`);
    }

    const propertyData = await propertyResponse.json();
    const property = propertyData;

    if (!property) {
      throw new Error("Property not found");
    }

    // Fetch all images for the listing
    const imagesUrl = `${baseUrl}Media?$filter=ResourceRecordKey eq '${listingKey}' and MediaStatus eq 'Active' and ImageSizeDescription eq 'Medium' and MediaType eq 'image/jpeg'&$top=6&$select=MediaURL,ShortDescription,PreferredPhotoYN,Order,MediaType,ImageSizeDescription`;

    const imagesResponse = await fetch(imagesUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      next: {
        revalidate: 60, // 1 minute
      },
    });

    const imagesData = await imagesResponse.json();
    const images = imagesData.value.map((img) => ({
      url: img.MediaURL,
      description: img.ShortDescription,
      isPreferred: img.PreferredPhotoYN,
      order: img.Order,
    }));

    // Return combined data
    return {
      ...property,
      images,
      fullAddress: `${property.StreetNumber} ${property.StreetName}`,
      location: {
        city: property.City,
        province: property.StateOrProvince,
        postalCode: property.PostalCode,
        county: property.CountyOrParish,
      },
      specs: {
        bedrooms: property.BedroomsTotal,
        bathrooms: property.BathroomsTotalInteger,
        sqft: property.BuildingAreaTotal,
        lotSize: {
          width: property.LotWidth,
          depth: property.LotDepth,
        },
        parking: {
          spaces: property.ParkingSpaceTotal,
          type: property.ParkingType,
        },
        yearBuilt: property.YearBuilt,
      },
      features: {
        appliances: property.Appliances,
        cooling: property.CoolingType,
        heating: property.HeatingType,
        basement: {
          type: property.BasementType,
          finish: property.BasementFinishType,
        },
        exterior: property.ExteriorFeatures,
        interior: property.InteriorFeatures,
        community: property.CommunityFeatures,
        waterfront: property.WaterfrontFeatures,
      },
    };
  } catch (error) {
    console.error("Error fetching listing detail:", error);
    throw error;
  }
}

export async function getPropertiesAnalytics({
  city,
  propertySubType,
  minBeds,
  minBaths,
  minPrice,
  maxPrice,
  transactionType,
  ...searchParams
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");

  // Build filter string
  const filterClauses = [];

  // Base filters
  filterClauses.push("ContractStatus eq 'Available'");

  // Transaction Type
  if (transactionType) {
    filterClauses.push(`TransactionType eq '${transactionType}'`);
  }

  // City
  if (city) {
    filterClauses.push(`contains(City, '${city}')`);
  }

  if (propertySubType) {
    filterClauses.push(`PropertySubType eq '${propertySubType}'`);
  }

  // Add price filters
  if (minPrice) {
    filterClauses.push(`ListPrice ge ${minPrice}`);
  }
  if (maxPrice) {
    filterClauses.push(`ListPrice le ${maxPrice}`);
  }

  // Add bed and bath filters
  if (minBeds) {
    filterClauses.push(`BedroomsTotal ge ${minBeds}`);
  }
  if (minBaths) {
    filterClauses.push(`BathroomsTotalInteger ge ${minBaths}`);
  }

  // Only select the fields we need for analytics
  const queryString = [
    `$filter=${filterClauses.join(" and ")}`,
    `$select=ListingKey,ListPrice,PropertySubType,BedroomsTotal,BathroomsTotalInteger,OriginalEntryTimestamp`, // Minimal fields
    `$count=true`,
    `$top=50000`,
    `$skip=0`,
  ].join("&");

  const url = `${baseUrl}Property?${queryString}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      properties: data.value,
      total: data["@odata.count"] || 0,
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      properties: [],
      total: 0,
    };
  }
}

export async function getSimilarListings({ property, limit = 5 }) {
  const minPrice = Math.max(0, property.ListPrice - 500000);
  const maxPrice = property.ListPrice + 500000;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");

  try {
    // Build filters for similar properties
    const filters = [
      "ContractStatus eq 'Available'",
      `PropertySubType eq '${property.PropertySubType}'`,
      `BedroomsTotal eq ${property.BedroomsTotal}`,
      `ListPrice ge ${minPrice}`,
      `ListPrice le ${maxPrice}`,
      `ListingKey ne '${property.ListingKey}'`, // Exclude current property
    ];

    const queryString = [
      `$top=${limit}`,
      `$orderby=ModificationTimestamp desc`,
      `$filter=${filters.join(" and ")}`,
      `$select=ListingKey,StreetNumber,StreetName,StreetSuffix,City,StateOrProvince,ListPrice,BedroomsTotal,WashroomsType1Pcs,WashroomsType2Pcs,ModificationTimestamp,PropertySubType`,
    ].join("&");

    const url = `${baseUrl}Property?${queryString}`;

    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Fetch images for each property
    const propertiesWithImages = await Promise.all(
      data.value.map(async (property) => {
        const imageUrl = await getImageUrl(property.ListingKey);
        return {
          ...property,
          images: imageUrl.medium ? [imageUrl.medium] : [],
        };
      })
    );

    return propertiesWithImages;
  } catch (error) {
    console.error("Error fetching similar listings:", error);
    return [];
  }
}
