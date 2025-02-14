import { getPropertiesAnalytics } from "./properties";

export async function getCityAnalytics({ city, transactionType = "For Sale" }) {
  try {
    // Use getPropertiesAnalytics to fetch the data
    const { properties, total } = await getPropertiesAnalytics({
      city,
      transactionType,
    });

    if (!properties || properties.length === 0) {
      console.error("No properties found for city analytics");
      return null;
    }

    // Calculate statistics from the properties
    const stats = {
      overview: {
        totalListings: total,
        avgPrice: calculateAverage(properties, "ListPrice"),
        avgDaysOnMarket: calculateAverage(properties, "DaysOnMarket") || 0,
        medianPrice: calculateMedian(properties.map((p) => p.ListPrice)),
      },
      byBedrooms: {
        1: calculateBedroomStats(properties, 1),
        2: calculateBedroomStats(properties, 2),
        3: calculateBedroomStats(properties, 3),
        4: calculateBedroomStats(properties, 4),
        "5+": calculateBedroomStats(properties, 5, true),
      },
      byPropertyType: {
        Detached: calculatePropertyTypeStats(properties, "Detached"),
        "Semi-Detached": calculatePropertyTypeStats(
          properties,
          "Semi-Detached"
        ),
        Townhouse: calculatePropertyTypeStats(properties, "Att/Row/Townhouse"),
        "Condo Apartment": calculatePropertyTypeStats(
          properties,
          "Condo Apartment"
        ),
      },
      trends: {
        priceHistory: [], // This would need historical data
        inventoryHistory: [], // This would need historical data
        domHistory: [], // This would need historical data
      },
    };

    console.log(stats);

    return stats;
  } catch (error) {
    console.error("Error in getCityAnalytics:", error);
    return null;
  }
}

// Helper functions for calculations
function calculateAverage(properties, field) {
  if (!properties.length) return 0;
  const sum = properties.reduce((acc, prop) => acc + (prop[field] || 0), 0);
  return Math.round(sum / properties.length);
}

function calculateMedian(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[middle - 1] + sorted[middle]) / 2);
  }
  return sorted[middle];
}

function calculateBedroomStats(properties, bedCount, isPlus = false) {
  const filtered = properties.filter((p) => {
    if (isPlus) {
      return (p.BedroomsTotal || 0) >= bedCount;
    }
    return p.BedroomsTotal === bedCount;
  });

  return {
    count: filtered.length,
    avgPrice: calculateAverage(filtered, "ListPrice"),
    avgDaysOnMarket: calculateAverage(filtered, "DaysOnMarket") || 0,
  };
}

function calculatePropertyTypeStats(properties, propertyType) {
  const filtered = properties.filter((p) => p.PropertySubType === propertyType);

  return {
    count: filtered.length,
    avgPrice: calculateAverage(filtered, "ListPrice"),
    avgDaysOnMarket: calculateAverage(filtered, "DaysOnMarket") || 0,
  };
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
