export async function getImageUrl(listingKey) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");
    const imageLink = `${baseUrl}Media?$filter=ResourceRecordKey eq '${listingKey}' and MediaType eq 'image/jpeg' and MediaStatus eq 'Active' and ImageSizeDescription eq 'Medium' and PreferredPhotoYN eq true&$top=1`;

    const response = await fetch(imageLink, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN_FOR_API,
      },
      cache: "no-store",
    });

    const jsonResponse = await response.json();
    const images = jsonResponse.value;

    const preferredMedium = images.find(
      (img) => img.ImageSizeDescription === "Medium" && img.PreferredPhotoYN
    );
    const preferredThumb = images.find(
      (img) => img.ImageSizeDescription === "Thumbnail" && img.PreferredPhotoYN
    );

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

export async function getProperties(searchParams) {
  const pageSize = 60;
  const page = Number(searchParams.page) || 1;
  const skip = (page - 1) * pageSize;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/;$/, "");
  const filters = buildFilters(searchParams);

  const queryString = [
    `$top=${pageSize}`,
    `$skip=${skip}`,
    `$orderby=OriginalEntryTimestamp desc,ListingKey desc`,
    `$filter=${filters.join(" and ")}`,
    `$select=ListingKey,StreetNumber,StreetName,StreetSuffix,City,StateOrProvince,ListPrice,PropertyType,PropertySubType,MlsStatus,TransactionType,ModificationTimestamp,OriginalEntryTimestamp,BedroomsTotal,BathroomsTotalInteger,WashroomsType1Pcs,WashroomsType2Pcs,GarageType,ParkingSpaces,ArchitecturalStyle`,
    `$count=true`,
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
      total: data["@odata.count"],
      currentPage: page,
      totalPages: Math.ceil(data["@odata.count"] / pageSize),
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

function buildFilters(searchParams) {
  const filters = [];

  // Base filters
  filters.push("ContractStatus eq 'Available'");
  filters.push(
    `TransactionType eq '${searchParams.transactionType || "For Sale"}'`
  );

  // Price Range
  if (searchParams.minPrice) {
    filters.push(`ListPrice ge ${searchParams.minPrice}`);
  }
  if (searchParams.maxPrice) {
    filters.push(`ListPrice le ${searchParams.maxPrice}`);
  }

  // Property Type
  if (searchParams.propertySubType) {
    filters.push(`PropertySubType eq '${searchParams.propertySubType}'`);
  }

  // Bedrooms
  if (searchParams.bedrooms) {
    filters.push(`BedroomsTotal ge ${searchParams.bedrooms}`);
  }

  // Bathrooms
  if (searchParams.bathrooms) {
    filters.push(`BathroomsTotalInteger ge ${searchParams.bathrooms}`);
  }

  return filters;
}
