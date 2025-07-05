import {
  getListingDetail,
  getSimilarListings,
  getRoomInformation,
} from "@/lib/properties";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import PropertyGallery from "@/components/PropertyGallery";
import Link from "next/link";
import Image from "next/image";
import HomeOverview from "@/components/HomeOverview";
import CompactMortgageCalculator from "@/components/CompactMortgageCalculator";
import FloatingResaleButton from "@/components/FloatingResaleButton";
import {
  getListingAnalytics,
  getCommercialAnalytics,
  getLeaseAnalytics,
} from "@/lib/analytics";
import MarketComparisonChart from "@/components/MarketComparisonChart";
import { formatPrice } from "@/utils/formatting";
import TimeAgo from "@/helper/timeAgo";
import WalkScore from "@/components/WalkScore";
import SimilarHomes from "@/components/SimilarHomes";
import PriceHistory from "@/components/PriceHistory";
import ResaleFAQ from "@/components/ResaleFAQ";
import GoogleMap from "@/components/GoogleMap";
import RoomInformation from "@/components/RoomInformation";
import Script from "next/script";
import { createListingSchema } from "@/helper/createSchema";

import {
  Bed,
  Bath,
  Home,
  Car,
  House,
  Languages,
  Building2,
  Scan,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const revalidate = 60; // 1 minute

export async function generateMetadata({ params }) {
  try {
    const property = await getListingDetail(params.listingID);
    if (!property) {
      return {
        title: "Property Not Found",
        description: "The requested property listing could not be found.",
      };
    }

    const title = `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix} in ${property.City} MLS # ${property.ListingKey} - Condomonk`;

    const description = `Book a showing for ${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix} with MLS # ${property.ListingKey} in ${property.City} with us - Condomonk`;

    const canonical = `https://condomonk.ca/resale/listing/${params.listingID}`;

    return {
      metadataBase: new URL("https://condomonk.ca"),
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        images: property.images?.[0] ? [property.images[0]] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: property.images?.[0] ? [property.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: "Property Not Found",
      description: "The requested property listing could not be found.",
    };
  }
}

export default async function PropertyDetailPage({ params }) {
  try {
    const property = await getListingDetail(params.listingID);
    if (!property) {
      notFound();
    }

    // Fetch room info with error handling and logging
    let roomInfo = [];
    try {
      roomInfo = await getRoomInformation(property.ListingKey);
    } catch (error) {
      console.error("Error fetching room information:");
    }

    // Fetch similar properties
    const similarProperties = await getSimilarListings({ property });

    // Determine which analytics to fetch based on property type and transaction type
    let analyticsData = null;

    if (property.PropertyType === "Commercial") {
      analyticsData = await getCommercialAnalytics({
        listing: property,
        city: property.City,
      });
    } else if (property.TransactionType === "For Lease") {
      analyticsData = await getLeaseAnalytics({
        listing: property,
        city: property.City,
      });
    } else {
      analyticsData = await getListingAnalytics({
        listing: property,
        city: property.City,
      });
    }

    const totalBathrooms =
      (property.WashroomsType1Pcs || 0) + (property.WashroomsType2Pcs || 0);

    // Helper function to get available virtual tour URLs
    const getVirtualTourUrls = (property) => {
      const tours = [];
      if (property.VirtualTourURLBranded) {
        tours.push({ url: property.VirtualTourURLBranded, type: "branded" });
      }
      if (property.VirtualTourURLBranded2) {
        tours.push({ url: property.VirtualTourURLBranded2, type: "branded" });
      }
      if (property.VirtualTourURLUnbranded) {
        tours.push({
          url: property.VirtualTourURLUnbranded,
          type: "unbranded",
        });
      }
      if (property.VirtualTourURLUnbranded2) {
        tours.push({
          url: property.VirtualTourURLUnbranded2,
          type: "unbranded",
        });
      }
      return tours;
    };

    const virtualTours = getVirtualTourUrls(property);

    const priceHistory = [
      {
        price: property.ListPrice,
        date: property.ModificationTimestamp || property.OriginalEntryTimestamp,
      },
    ];

    if (
      property.OriginalListPrice &&
      property.OriginalListPrice !== property.ListPrice
    ) {
      priceHistory.push({
        price: property.OriginalListPrice,
        date: property.OriginalEntryTimestamp,
      });
    }

    // Create schema with error handling
    let schemaScript = null;
    try {
      const schema = createListingSchema(property);
      schemaScript = (
        <Script
          id="listing-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
          strategy="afterInteractive"
        />
      );
    } catch (schemaError) {
      console.error("Error creating listing schema:", schemaError);
    }

    return (
      <>
        {schemaScript}
        <div className="max-w-[1370px] mx-auto px-4 md:pt-6">
          {/* Header with Breadcrumb and Share/Save */}
          <div className="flex justify-between items-center mb-0 sticky top-0 bg-white z-1">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 md:text-sm text-[13px] z-0 pe-2">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2 hidden md:flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-500"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <span className="hidden md:block">Home</span>
              </Link>
              <span className="text-gray-400 hidden md:block">/</span>
              <Link
                href={`/resale/ontario/homes-${property.TransactionType.toLowerCase().replace(
                  / /g,
                  "-"
                )}`}
                className="text-gray-500 hover:text-gray-700"
              >
                Ontario
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href={`/resale/ontario/${property.City.toLowerCase().replace(
                  / /g,
                  "-"
                )}/homes-${property.TransactionType.toLowerCase().replace(
                  / /g,
                  "-"
                )}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {property.City}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 truncate max-w-[150px] md:max-w-none">
                {property.StreetNumber} {property.StreetName}{" "}
                {property.StreetSuffix}
              </span>
            </nav>

            {/* Share/Save Buttons */}
            <div className="flex md:gap-2 gap-0 flex-shrink-0">
              <button className="inline-flex md:items-center items-start gap-2 md:px-4 px-2 py-2 text-gray-600 hover:text-gray-900 md:text-xs text-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                <span className="hidden md:block">Share</span>
              </button>
              <button className="inline-flex items-center gap-2 md:px-4 px-2 py-2 text-gray-600 hover:text-gray-900 md:text-xs text-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span className="hidden md:block">Save</span>
              </button>
            </div>
          </div>

          {/* Property Gallery */}
          <PropertyGallery
            images={property.images}
            propertyAddress={`${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}, ${property.City}, ${property.StateOrProvince}`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8  md:pe-4">
              {/* Price */}
              <div className="mb-0">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-1">
                    ${property.ListPrice.toLocaleString()}
                  </h2>
                  {property.PreviousListPrice &&
                    property.ListPrice < property.PreviousListPrice && (
                      <div className="flex items-center gap-3">
                        <span className="text-xl md:text-3xl font-bold text-gray-600 line-through decoration-red-600 decoration-3">
                          ${property.PreviousListPrice.toLocaleString()}
                        </span>
                        <div className="inline-flex items-center text-sm font-bold text-green-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {(
                            ((property.PreviousListPrice - property.ListPrice) /
                              property.PreviousListPrice) *
                            100
                          ).toFixed(1)}
                          % dropped
                        </div>
                      </div>
                    )}
                </div>

                {property.PriceChangeTimestamp && (
                  <div>
                    <p className="text-sm text-gray-500 my-1">
                      Last price change{" "}
                      <TimeAgo timestamp={property.PriceChangeTimestamp} />
                    </p>
                    <PriceHistory
                      priceHistory={[
                        // Current price
                        {
                          price: property.ListPrice,
                          date:
                            property.PriceChangeTimestamp ||
                            property.ModificationTimestamp,
                        },
                        // Previous price if it exists
                        ...(property.PreviousListPrice
                          ? [
                              {
                                price: property.PreviousListPrice,
                                date: property.OriginalEntryTimestamp,
                              },
                            ]
                          : []),
                        // Original price if different from previous prices
                        ...(property.OriginalListPrice &&
                        property.OriginalListPrice !==
                          property.PreviousListPrice &&
                        property.OriginalListPrice !== property.ListPrice
                          ? [
                              {
                                price: property.OriginalListPrice,
                                date: property.OriginalEntryTimestamp,
                              },
                            ]
                          : []),
                      ].filter((record) => record.price && record.date)} // Filter out any invalid records
                    />
                  </div>
                )}
              </div>
              <div className="mt-2">
                {/* Status and Type */}
                <div className="flex items-center gap-2 mb-2 text-gray-700">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-sm">
                      <span className="inline-flex items-center gap-1 text-green-500">
                        <svg
                          className="w-3 h-3 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <circle cx="10" cy="10" r="10" />
                        </svg>
                      </span>
                      {property.PropertySubType} {property.TransactionType}
                    </span>
                    <Separator className="h-4 mx-2 w-[1.5px] bg-black" />
                    <span className="text-sm">
                      MLS - #{property.ListingKey}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  {property.OriginalEntryTimestamp && (
                    <span className="inline-flex items-center  text-sm  ">
                      <TimeAgo timestamp={property.ModificationTimestamp} />
                    </span>
                  )}
                  <span className="inline-flex items-center text-xs">
                    - By {property?.ListOfficeName}
                  </span>
                </div>

                {/* Address */}
                <h1 className="text-base md:text-xl mb-4">
                  {property.StreetNumber} {property.StreetName}{" "}
                  {property.StreetSuffix}, {property.City},{" "}
                  {property.StateOrProvince} {property.PostalCode}
                </h1>
                {/* Key Details */}
                <div className="flex space-x-6 items-center justify-start mt-2">
                  <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                    <Bed className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                    {property.BedroomsTotal} Bed
                  </div>
                  <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                    <Bath className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                    {property.BathroomsTotalInteger} Bath
                  </div>
                  {(property.BuildingAreaTotal || property.LivingAreaRange) && (
                    <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col">
                      <Scan
                        className="w-6 h-6 text-gray-700"
                        strokeWidth={1.5}
                      />
                      {property.BuildingAreaTotal || property.LivingAreaRange}{" "}
                      Sqft.
                    </div>
                  )}
                  {property.GarageType && (
                    <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                      <Car
                        className="w-6 h-6 text-gray-700"
                        strokeWidth={1.5}
                      />
                      {property.GarageType} Garage
                    </div>
                  )}
                </div>
              </div>

              {/* Property Description Section */}
              <div className="pt-4 mt-8 ">
                <div className="rounded-md">
                  <h1 className="text-[32px] font-semibold">
                    Property Description
                  </h1>

                  {/* Basic Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2">
                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-900 mb-1">
                        Property type
                      </p>
                    </div>
                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-500 mb-1">
                        {property.PropertySubType || "N/A"}
                      </p>
                    </div>

                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-900 mb-1">Lot size</p>
                    </div>
                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-500 mb-1">
                        {property.LotSizeRangeAcres || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2">
                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-900 mb-1">Style</p>
                    </div>
                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-500 mb-1">
                        {property.ArchitecturalStyle || "N/A"}
                      </p>
                    </div>

                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-900 mb-1">
                        Approx. Area
                      </p>
                    </div>
                    <div className="col-span-1 py-1 border-b border-gray-100">
                      <p className="text-[14px] text-gray-500 mb-1">
                        {property.BuildingAreaTotal ||
                          property.LivingAreaRange ||
                          "N/A"}{" "}
                        Sqft
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add RoomInformation component before Additional Details */}
              <RoomInformation rooms={roomInfo} />

              {/* Description */}
              <div className="pt-10">
                <h2 className="text-3xl font-bold mb-2">
                  About {property.StreetNumber} {property.StreetName}{" "}
                  {property.StreetSuffix}
                </h2>
                <p className="text-gray-500 tracking-normal whitespace-pre-wrap leading-7">
                  {property.PublicRemarks}
                </p>
              </div>

              <HomeOverview property={property} />

              {/* Additional Details */}
              <div className="pt-8">
                <h2 className="text-3xl font-bold ">Additional Details</h2>
                <div className="grid grid-cols-1 gap-y-3 text-sm">
                  {/* Basement */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Basement:</span>
                      <span className="font-semibold">
                        {property.Basement?.length > 0
                          ? property.Basement.join(", ")
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Cooling */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Cooling:</span>
                      <span className="font-semibold">
                        {property.Cooling?.length > 0
                          ? property.Cooling.join(", ")
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Heating */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Heating:</span>
                      <span className="font-semibold">
                        {property.HeatType || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Parking Features */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Parking Features:</span>
                      <span className="font-semibold">
                        {property.ParkingFeatures?.length > 0
                          ? property.ParkingFeatures.join(", ")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Market Analytics */}
              {property?.TransactionType !== "For Lease" && (
                <div className="bg-white rounded-lg py-6 space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-gray-100 rounded-xl">
                      <div className="text-2xl font-bold black mt-1">
                        {analyticsData?.totalSimilar || 0}
                      </div>
                      <div className="text-sm text-black font-medium">
                        Similar Homes Found
                      </div>
                    </div>

                    <div className="p-6 bg-gray-100 rounded-xl">
                      <div className="text-2xl font-bold text-black mt-1">
                        ${formatPrice(analyticsData?.avgPrice || 0)}
                      </div>
                      <div className="text-sm text-black font-medium">
                        Average Price
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <div
                        className={`text-2xl font-bold mt-1 ${
                          property.ListPrice > (analyticsData?.avgPrice || 0)
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {(
                          ((property.ListPrice -
                            (analyticsData?.avgPrice || 0)) /
                            (analyticsData?.avgPrice || 1)) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <div className="text-sm text-gray-800 font-medium">
                        {property.ListPrice > (analyticsData?.avgPrice || 0)
                          ? "Higher than average"
                          : "Lower than average"}
                      </div>
                    </div>
                  </div>

                  {/* Market Comparison Chart */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Price Comparison
                    </h3>
                    <div className="bg-white rounded-lg ">
                      <MarketComparisonChart
                        currentPrice={property.ListPrice}
                        comparisons={[
                          {
                            name: `Similar Homes in ${property.City}`,
                            description: `${
                              analyticsData?.totalSimilar
                            } homes with ${property.BedroomsTotal} beds, ${
                              (property.WashroomsType1Pcs || 0) +
                              (property.WashroomsType2Pcs || 0)
                            } baths`,
                            price: analyticsData?.avgPrice || 0,
                          },
                          {
                            name: `${property.BedroomsTotal} Bed Homes`,
                            description: `Average of ${
                              analyticsData?.bedroomCount || 0
                            } homes`,
                            price: analyticsData?.avgPriceBedrooms || 0,
                          },
                          {
                            name: property.PropertySubType,
                            description: `Average of ${
                              analyticsData?.propertyTypeCount || 0
                            } ${property.PropertySubType} homes in ${
                              property.City
                            }`,
                            price: analyticsData?.avgPriceType || 0,
                          },
                        ]}
                      />
                      <div className="text-sm text-gray-600">
                        Note <span className="text-red-500">*</span> Price
                        comparison is based on the similar properties listed in
                        the area and may not be accurate. Consult licensed real
                        estate agent for accurate comparison.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Map Section */}
              <div className="pt-12 z-0">
                <h2 className="text-3xl font-bold mb-2">Location</h2>
                <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200 z-1">
                  <GoogleMap
                    width={600}
                    height={400}
                    location={`${property.StreetNumber} ${
                      property.StreetName
                    } ${property.StreetSuffix}, ${
                      property.City.split(" ")[0]
                    }, ${property.StateOrProvince}`}
                    zoom={17}
                  />
                </div>
              </div>

              {/* Walk Score Section */}
              <div className="pt-16">
                {/* Title with walking icon */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <img
                      src="/walking.svg"
                      alt="Walking Icon"
                      className="w-8 h-8 mr-2"
                    />
                    <h2 className="text-2xl font-bold">
                      Walk Score for {property.StreetNumber}{" "}
                      {property.StreetName} {property.StreetSuffix}
                    </h2>
                  </div>
                </div>

                {/* Walk Score iframe */}
                <div className="walkscore-container rounded-lg overflow-hidden">
                  <WalkScore
                    address={`${property.StreetNumber} ${property.StreetName} ${
                      property.StreetSuffix
                    }, ${property.City.split(" ")[0]}, ${
                      property.StateOrProvince
                    }`}
                  />
                </div>

                {/* View map link */}
                <div className="mt-4">
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    View map of nearby restaurants, grocery stores, and more.
                  </a>
                </div>
              </div>

              <div className="col-12 mt-6">
                <div className="bg-white rounded-xl border p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <Image
                        src="/angelablob.png"
                        alt="Sales Representative"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div>
                          <h3 className="text-xl font-semibold leading-0">
                            Angela Yang
                          </h3>
                          <p className="text-gray-600 leading-0">
                            Sales Representative, ANCHOR NEW HOMES INC.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700 mb-4">
                        <Languages className="w-5 h-5" />
                        <span className="text-sm leading-0">
                          English, Mandarin
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                          <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                            <Home className="w-4 h-4" />
                            Residential Resale
                          </span>
                          <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                            <Building2 className="w-4 h-4" />
                            Property Management
                          </span>
                          <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                            <Building2 className="w-4 h-4" />
                            Pre Construction
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mortgage Calculator Section */}
              {property.TransactionType !== "For Lease" && (
                <div className="pt-6 col-12 md:pt-20 md:col-12">
                  <CompactMortgageCalculator
                    price={property?.ListPrice}
                    showDetails={false}
                    align="left"
                  />
                </div>
              )}

              <div className="mt-6 ">
                <ResaleFAQ property={property} />
              </div>
            </div>

            {/* Floating Resale Button */}
            <FloatingResaleButton />

            {/* Sidebar */}
            <div className="space-y-6  top-6">
              {/* Booking Form */}
              <div className="bg-white p-1 rounded-lg sticky top-6 mt-16 mt-md-0 z-2">
                <BookingForm
                  propertyId={property.ListingKey}
                  address={`${property.StreetNumber} ${property.StreetName}`}
                  price={property.ListPrice}
                  transactionType={property.TransactionType}
                />
              </div>
            </div>
          </div>

          {/* Floating Resale Button */}
          <FloatingResaleButton />
        </div>

        {/* <div className="py-5 my-md-5 my-0" id="contact">
          <div className="max-w-2xl mx-auto px-4 pt-6">
            <div className="row justify-content-center">
              <Image
                src="/contact-bottom-2.png"
                alt="Contact bottom"
                width={300}
                height={250}
                className="img-fluid w-25 w-smm-50 mb-3"
              />
            </div>
            <h2 className="fw-bolder fw-boldie text-center fs-3 ">
              Looking to buy a preconstruction home ?
            </h2>

            <div>
              <BottomContactForm
                proj_name="All"
                city="Home Page"
              ></BottomContactForm>
              <div className="d-flex">
                <p className="small-text2 mb-3 text-center">
                  I agree to receive marketing and customer service calls and
                  text messages from Homebaba Technologies. Consent is not a
                  condition of purchase. Msg/data rates may apply. Msg frequency
                  varies. Reply STOP to unsubscribe. Privacy Policy & Terms of
                  Service.
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="max-w-6xl mx-auto md:px-4 px-4">
          <SimilarHomes properties={similarProperties} />
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}
