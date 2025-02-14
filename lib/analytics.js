import { getPropertiesAnalytics } from "./properties";

export async function getCityAnalytics({
  city,
  propertyType,
  propertySubTypes,
  filters,
}) {
  const allProperties = await getPropertiesAnalytics({
    city,
    propertyType,
    propertySubTypes,
    ...filters,
  });

  return calculateCityStats(allProperties.properties);
}

export async function getListingAnalytics({ listing, city }) {
  if (!listing || !city) {
    console.error("Missing required parameters for analytics");
    return null;
  }

  try {
    const similar = await getPropertiesAnalytics({
      city,
      propertySubType: listing.PropertySubType,
      minBeds: listing.BedroomsTotal,
      minBaths: listing.BathroomsTotalInteger,
      transactionType: listing.TransactionType,
    });

    if (!similar || !similar.properties) {
      console.error("No properties returned from analytics query");
      return null;
    }

    return {
      ...calculateSimilarListingsStats(similar.properties, listing),
      city,
      listing,
    };
  } catch (error) {
    console.error("Error in getListingAnalytics:", error);
    return null;
  }
}

export async function getCommercialAnalytics({ listing, city }) {
  if (!listing || !city) {
    console.error("Missing required parameters for commercial analytics");
    return null;
  }

  try {
    const similar = await getPropertiesAnalytics({
      city,
      propertyType: "Commercial",
      propertySubType: listing.PropertySubType,
      transactionType: listing.TransactionType,
    });

    if (!similar || !similar.properties) {
      console.error("No properties returned from commercial analytics query");
      return null;
    }

    // Calculate price per sqft for current property
    const currentPricePerSqft = listing.ListPrice / listing.BuildingAreaTotal;

    // Calculate averages and stats
    const stats = calculateCommercialStats(similar.properties, listing);

    return {
      ...stats,
      currentProperty: {
        ...listing,
        pricePerSqft: currentPricePerSqft,
      },
      city,
    };
  } catch (error) {
    console.error("Error in getCommercialAnalytics:", error);
    return null;
  }
}

export async function getLeaseAnalytics({ listing, city }) {
  if (!listing || !city) {
    console.error("Missing required parameters for lease analytics");
    return null;
  }

  try {
    const similar = await getPropertiesAnalytics({
      city,
      propertySubType: listing.PropertySubType,
      transactionType: "Lease",
    });

    if (!similar || !similar.properties) {
      console.error("No properties returned from lease analytics query");
      return null;
    }

    const stats = calculateLeaseStats(similar.properties, listing);

    return {
      ...stats,
      currentProperty: listing,
      city,
    };
  } catch (error) {
    console.error("Error in getLeaseAnalytics:", error);
    return null;
  }
}

function calculateCityStats(properties) {
  const stats = {
    propertyTypeCounts: {},
    averagePrices: {},
    bedroomAverages: {},
    totalListings: properties.length,
  };

  properties.forEach((property) => {
    // Count by property type
    const type = property.PropertyType;
    stats.propertyTypeCounts[type] = (stats.propertyTypeCounts[type] || 0) + 1;

    // Average price by property type
    if (!stats.averagePrices[type]) {
      stats.averagePrices[type] = { sum: 0, count: 0 };
    }
    stats.averagePrices[type].sum += property.ListPrice;
    stats.averagePrices[type].count++;

    // Average by bedrooms
    const beds = property.BedroomsTotal;
    if (beds) {
      if (!stats.bedroomAverages[beds]) {
        stats.bedroomAverages[beds] = { sum: 0, count: 0 };
      }
      stats.bedroomAverages[beds].sum += property.ListPrice;
      stats.bedroomAverages[beds].count++;
    }
  });

  // Calculate final averages
  Object.keys(stats.averagePrices).forEach((type) => {
    stats.averagePrices[type] = Math.round(
      stats.averagePrices[type].sum / stats.averagePrices[type].count
    );
  });

  Object.keys(stats.bedroomAverages).forEach((beds) => {
    stats.bedroomAverages[beds] = {
      avg: Math.round(
        stats.bedroomAverages[beds].sum / stats.bedroomAverages[beds].count
      ),
      count: stats.bedroomAverages[beds].count,
    };
  });

  return stats;
}

function calculateSimilarListingsStats(properties, currentListing) {
  const stats = {
    avgPrice: 0,
    avgPriceBedrooms: 0,
    avgPriceType: 0,
    totalSimilar: 0,
    bedroomCount: 0,
    propertyTypeCount: 0,
  };

  let similarSum = 0,
    bedroomSum = 0,
    typeSum = 0;
  let similarCount = 0,
    bedroomCount = 0,
    typeCount = 0;

  properties.forEach((property) => {
    if (property.ListingKey !== currentListing.ListingKey) {
      // Similar properties (same beds, baths, type)
      if (
        property.BedroomsTotal === currentListing.BedroomsTotal &&
        property.BathroomsTotalInteger ===
          currentListing.BathroomsTotalInteger &&
        property.PropertySubType === currentListing.PropertySubType
      ) {
        similarSum += property.ListPrice;
        similarCount++;
      }

      // Same number of bedrooms
      if (property.BedroomsTotal === currentListing.BedroomsTotal) {
        bedroomSum += property.ListPrice;
        bedroomCount++;
      }

      // Same property type
      if (property.PropertySubType === currentListing.PropertySubType) {
        typeSum += property.ListPrice;
        typeCount++;
      }
    }
  });

  stats.avgPrice = similarCount > 0 ? Math.round(similarSum / similarCount) : 0;
  stats.avgPriceBedrooms =
    bedroomCount > 0 ? Math.round(bedroomSum / bedroomCount) : 0;
  stats.avgPriceType = typeCount > 0 ? Math.round(typeSum / typeCount) : 0;
  stats.totalSimilar = similarCount;
  stats.bedroomCount = bedroomCount;
  stats.propertyTypeCount = typeCount;

  return stats;
}

function calculateCommercialStats(properties, currentListing) {
  let totalPricePerSqft = 0;
  let count = 0;
  const propertySubTypeStats = {};
  const similarProperties = [];

  properties.forEach((property) => {
    if (
      property.ListingKey !== currentListing.ListingKey &&
      property.BuildingAreaTotal
    ) {
      const pricePerSqft = property.ListPrice / property.BuildingAreaTotal;

      totalPricePerSqft += pricePerSqft;
      count++;

      // Track stats by property subtype
      if (!propertySubTypeStats[property.PropertySubType]) {
        propertySubTypeStats[property.PropertySubType] = {
          count: 0,
          totalPrice: 0,
          avgPrice: 0,
        };
      }
      propertySubTypeStats[property.PropertySubType].count++;
      propertySubTypeStats[property.PropertySubType].totalPrice +=
        property.ListPrice;

      // Collect similar properties
      if (property.PropertySubType === currentListing.PropertySubType) {
        similarProperties.push({
          ...property,
          pricePerSqft,
        });
      }
    }
  });

  // Calculate averages
  const avgPricePerSqft = count > 0 ? totalPricePerSqft / count : 0;

  // Calculate averages for each property subtype
  Object.keys(propertySubTypeStats).forEach((subType) => {
    propertySubTypeStats[subType].avgPrice =
      propertySubTypeStats[subType].totalPrice /
      propertySubTypeStats[subType].count;
  });

  return {
    avgPricePerSqft,
    propertySubTypeStats,
    similarProperties: similarProperties
      .sort((a, b) => a.ListPrice - b.ListPrice)
      .slice(0, 5),
  };
}

function calculateLeaseStats(properties, currentListing) {
  let totalLeaseRate = 0;
  let count = 0;
  const leaseTermStats = {};
  const similarLeases = [];

  properties.forEach((property) => {
    if (
      property.ListingKey !== currentListing.ListingKey &&
      property.LeaseRate
    ) {
      totalLeaseRate += property.LeaseRate;
      count++;

      // Track stats by lease term
      const term = property.LeaseTerm || "Not specified";
      if (!leaseTermStats[term]) {
        leaseTermStats[term] = {
          count: 0,
          totalRate: 0,
          avgRate: 0,
        };
      }
      leaseTermStats[term].count++;
      leaseTermStats[term].totalRate += property.LeaseRate;

      // Collect similar leases
      if (
        property.BuildingAreaTotal >= currentListing.BuildingAreaTotal * 0.8 &&
        property.BuildingAreaTotal <= currentListing.BuildingAreaTotal * 1.2
      ) {
        similarLeases.push(property);
      }
    }
  });

  // Calculate averages
  const avgLeaseRate = count > 0 ? totalLeaseRate / count : 0;

  // Calculate averages for each lease term
  Object.keys(leaseTermStats).forEach((term) => {
    leaseTermStats[term].avgRate =
      leaseTermStats[term].totalRate / leaseTermStats[term].count;
  });

  return {
    avgLeaseRate,
    leaseTermStats,
    similarLeases: similarLeases
      .sort((a, b) => a.LeaseRate - b.LeaseRate)
      .slice(0, 5),
  };
}
