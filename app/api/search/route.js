import { NextResponse } from "next/server";
import { allCities } from "@/data/ontarioCities";
import { cityRegions } from "@/data/postalCodeCities";
import { getProperties } from "@/lib/properties";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("term") || "";
  const type = searchParams.get("type") || "all";

  try {
    if (type === "preconstruction") {
      // Fetch pre-construction data
      const preconResponse = await axios.get(
        `https://api.condomonk.ca/api/all-precons-search/?search=${encodeURIComponent(
          searchTerm.toLowerCase()
        )}`
      );

      return NextResponse.json({
        cities: preconResponse.data.cities || [],
        projects: preconResponse.data.projects || [],
      });
    } else {
      // Filter cities (limit to 5 matches)
      const matchingCities = allCities
        .filter((city) => {
          // Handle both string and object city formats
          const cityName = typeof city === "string" ? city : city.city;
          return cityName.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .slice(0, 5)
        .map((city) => {
          // Return consistent object format
          return typeof city === "string" ? { city } : city;
        });

      // Get properties that match the search term
      const propertiesResponse = await getProperties(searchParams);

      // Map properties to include proper address format
      const mappedProperties = propertiesResponse.properties.map((property) => {
        // Ensure all required fields exist and are properly formatted
        const streetNumber = property.StreetNumber || "";
        const streetName = property.StreetName || "";
        const streetSuffix = property.StreetSuffix || "";
        const fullAddress = [streetNumber, streetName, streetSuffix]
          .filter(Boolean)
          .join(" ");

        return {
          id: property.ListingKey,
          listingId: property.ListingKey,
          streetNumber: streetNumber,
          streetName: streetName,
          streetSuffix: streetSuffix,
          address: fullAddress,
          city: property.City || "",
          price: property.ListPrice || 0,
          bedrooms: property.BedroomsTotal || 0,
          bathrooms:
            (property.WashroomsType1Pcs || 0) +
            (property.WashroomsType2Pcs || 0),
          propertyType: property.PropertyType || "",
          propertySubType: property.PropertySubType || "",
        };
      });

      return NextResponse.json({
        cities: matchingCities,
        properties: mappedProperties,
      });
    }
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.error();
  }
}
